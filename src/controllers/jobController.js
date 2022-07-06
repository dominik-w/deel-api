const { sequelize } = require('../model');

const {
  OK,
  BAD_REQUEST,
  NOT_FOUND,
  SERVER_ERROR,
} = require('../common/constants');

const {
  getUnpaidJobsList,
  getJobItem,
} = require('../repositories/jobRepository');

const {
  getProfileItem,
} = require('../repositories/profileRepository');

// GET `/jobs/unpaid`
// Get all unpaid jobs for a user (either a client or contractor), for active contracts only.
exports.getJobsUnpaidController = async (req, res) => {
  const profileId = req.profile.id;

  const unpaidJobs = await getUnpaidJobsList(profileId);
  if (!unpaidJobs || unpaidJobs.length === 0) {
    return res.status(NOT_FOUND).json({ error: 'No unpaid jobs found.' });
  }

  return res.status(OK).json(unpaidJobs);
};

// POST `/jobs/:job_id/pay`
// Pay for a job, a client can only pay if his balance >= the amount to pay.
// The amount should be moved from the client's balance to the contractor balance.
exports.postPayForJobController = async (req, res) => {
  const clientProfileId = req.profile.id;
  const jobId = req.params.job_id;

  // Job & contract.
  const job = await getJobItem(jobId);
  const contract = await job.getContract();
  const contractorId = contract.get('ContractorId');
  const jobPrice = job.price;
  const isJobPaid = job.paid;

  // Client's profile.
  const clientProfile = await getProfileItem(clientProfileId);
  const clientBalance = clientProfile.balance;

  // No use to process, if the job is already paid.
  if (isJobPaid) {
    return res.status(BAD_REQUEST).json(
      { error: 'The job has already been paid.' },
    );
  }

  // Client cannot pay if not enough funds.
  if (clientBalance < jobPrice) {
    return res.status(BAD_REQUEST).json(
      { error: 'Insufficient funds to make the transaction.' },
    );
  }

  // All good, let's do the transaction.
  const transaction = await sequelize.transaction();
  try {
    // 1. Decrease client balance.
    clientProfile.balance = clientBalance - jobPrice;
    await clientProfile.save({ transaction });

    // 2. Increase contractor balance.
    const contractorProfile = await getProfileItem(contractorId);
    const currentBalance = contractorProfile.balance;
    contractorProfile.balance = currentBalance + jobPrice;
    await contractorProfile.save({ transaction });

    // 3. Set job as paid.
    job.paid = true;
    job.paymentDate = new Date();
    await job.save({ transaction });

    await transaction.commit();
  } catch {
    await transaction.rollback();
    return res.status(SERVER_ERROR).json(
      { error: 'Transaction failed. Please try again.' },
    );
  }

  return res.status(OK).json({ message: 'Success.' });
};
