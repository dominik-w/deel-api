const { Op } = require('sequelize');

const {
  sequelize,
  Job,
  Contract,
  Profile,
} = require('../model');

// TODO: improve date/time calculations; validation.
exports.getBestProfession = async (start, end) => {
  const bestProfession = await Job.findAll({
    attributes: [
      'Contract.Contractor.profession',
      [sequelize.fn('sum', sequelize.col('price')),
        'earned',
      ],
    ],
    group: ['Contract.Contractor.profession'],
    order: sequelize.literal('earned DESC'),
    raw: true, // !
    where: {
      paid: true,
      paymentDate: {
        [Op.gte]: start,
        [Op.lte]: end,
      },
    },
    include: {
      model: Contract,
      as: 'Contract',
      include: {
        model: Profile,
        as: 'Contractor',
      },
    },
  });

  if (!bestProfession || bestProfession.length === 0) {
    return false;
  }

  return bestProfession[0];
};

exports.getBestClientsList = async (start, end, limit) => {
  const bestClients = await Profile.findAll({
    attributes: [
      'id',
      [sequelize.literal("firstName || ' ' || lastName"), 'fullName'],
      [sequelize.fn('SUM', sequelize.col('price')), 'paid'],
    ],
    include: [{
      model: Contract,
      as: 'Client',
      attributes: [],
      required: true,
      include: [{
        model: Job,
        required: true,
        attributes: [],
        where: {
          paid: true,
          paymentDate: {
            [Op.gte]: start,
            [Op.lte]: end,
          },
        },
      }],
    }],
    where: {
      type: 'client',
    },
    group: ['Profile.id'],
    order: [[sequelize.col('paid'), 'DESC']],
    limit,
    subQuery: false,
  });

  if (!bestClients || bestClients.length === 0) {
    return false;
  }

  return bestClients;
};
