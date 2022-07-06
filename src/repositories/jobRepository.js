const { Op } = require('sequelize');
const { sequelize } = require('../model');

const { Job, Contract } = require('../model');

// eslint-disable-next-line no-return-await
exports.getUnpaidJobsList = async (profileId) => await Job.findAll({
  where: {
    [Op.or]: [
      { paid: { [Op.is]: null } },
      { paid: { [Op.is]: false } },
    ],
  },
  include: {
    model: Contract,
    as: 'Contract',
    where: {
      [Op.or]: [
        { contractorId: profileId },
        { clientId: profileId },
      ],
      status: {
        // Contracts are considered active only when in status `in_progress`.
        [Op.eq]: 'in_progress',
      },
    },
  },
});

// eslint-disable-next-line no-return-await
exports.getJobItem = async (jobId) => await Job.findOne({
  where: { id: jobId },
  include: {
    model: Contract,
  },
});

// NOTE:
// - the sense of this requirement is not fully clear,
// - also, what is the "job to pay" exactly?
// - not enough details; it's not fully clear, whether we should check
// active contracts, or terminated...
// I assumed active (in_progress), as terminated should be paid (?)
// TODO: review.
exports.calculateTotalJobsToPayAmount = async (profileId) => {
  const jobsToPay = await Job.findAll({
    attributes: [
      'price',
      [sequelize.fn('sum', sequelize.col('price')), 'total'],
    ],
    where: {
      [Op.or]: [
        { paid: { [Op.is]: null } },
        { paid: { [Op.is]: false } },
      ],
    },
    include: {
      model: Contract,
      as: 'Contract',
      where: {
        status: {
          [Op.eq]: 'in_progress',
        },
        clientId: profileId,
      },
    },
  });

  return jobsToPay[0].dataValues.total ?? 0;
};
