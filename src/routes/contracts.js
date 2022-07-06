const express = require('express');
const { getProfile } = require('../middleware/getProfile');

const {
  getProfileContractsController,
  getContractsController,
} = require('../controllers/contractController');

const getProfileContracts = '/contracts/:id';
const getContracts = '/contracts';

const app = express();

app.get(
  getProfileContracts,
  getProfile,
  getProfileContractsController,
);

app.get(
  getContracts,
  getProfile,
  getContractsController,
);

module.exports = app;
