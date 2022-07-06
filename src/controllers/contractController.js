const {
  OK,
  NOT_FOUND,
} = require('../common/constants');

const {
  getProfileContractById,
  getProfileContractsList,
} = require('../repositories/contractRepository');

// GET `/contracts/:id`
// It should return the contract only if it belongs to the profile calling (client or contractor).
exports.getProfileContractsController = async (req, res) => {
  const contractId = req.params.id;
  const profileId = req.profile.id;

  const contract = await getProfileContractById(contractId, profileId);
  if (!contract) {
    return res.status(NOT_FOUND).json({ error: 'No contracts found.' });
  }

  return res.status(OK).json(contract);
};

// GET `/contracts`
// Returns a list of contracts belonging to a user (client or contractor).
// The list should only contain non terminated contracts.
exports.getContractsController = async (req, res) => {
  const profileId = req.profile.id;

  const contract = await getProfileContractsList(profileId);
  if (!contract) {
    return res.status(NOT_FOUND).json({ error: 'No contracts found.' });
  }

  return res.status(OK).json(contract);
};
