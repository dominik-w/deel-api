const {
  OK,
  BAD_REQUEST,
  SERVER_ERROR,
} = require('../common/constants');

const { calculateTotalJobsToPayAmount } = require('../repositories/jobRepository');
const { getProfileItem } = require('../repositories/profileRepository');

// POST `/balances/deposit/:userId`
// Deposits money into the balance of a client.
// A client can't deposit more than 25% his total of jobs to pay (at the deposit moment).
exports.postBalancesDepositController = async (req, res) => {
  // const clientProfileId = req.profile.id;
  const { userId } = req.params;
  const { amount } = req.body;

  const factor = 0.25;

  const totalJobsToPayAmount = await calculateTotalJobsToPayAmount(userId);
  const maxAmountAllowed = factor * totalJobsToPayAmount;

  if (amount > maxAmountAllowed) {
    return res.status(BAD_REQUEST).json({ error: 'You can deposit only up to 25% of you total jobs to pay at once.' });
  }

  // Update balance.
  const userProfile = await getProfileItem(userId);
  const currentBalance = userProfile.balance;
  userProfile.balance = currentBalance + amount;
  return userProfile.save()
    .then(() => res.status(OK).json({ message: 'Balance successfully updated.' }))
    .catch(() => res.status(SERVER_ERROR).json({ message: 'An error occurred. Balance not updated. Please try again.' }));
};
