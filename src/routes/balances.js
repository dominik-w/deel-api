const express = require('express');
// const { getProfile } = require('../middleware/getProfile');

const {
  postBalancesDepositController,
} = require('../controllers/balanceController');

const postBalancesDeposit = '/balances/deposit/:userId';

const app = express();

app.post(
  postBalancesDeposit,
  // getProfile,
  postBalancesDepositController,
);

module.exports = app;
