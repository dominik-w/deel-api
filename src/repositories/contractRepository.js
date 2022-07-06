const { Op } = require('sequelize');
const { Contract } = require('../model');

// eslint-disable-next-line no-return-await
exports.getProfileContractById = async (contractId, profileId) => await Contract.findOne({
  where: {
    id: contractId,
    [Op.or]: [
      { contractorId: profileId },
      { clientId: profileId },
    ],
  },
});

// eslint-disable-next-line no-return-await
exports.getProfileContractsList = async (profileId) => await Contract.findAll({
  where: {
    status: {
      [Op.ne]: 'terminated',
    },
    [Op.or]: [
      { contractorId: profileId },
      { clientId: profileId },
    ],
  },
});
