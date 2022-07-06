const express = require('express');

const {
  getAdminBestProfessionController,
  getAdminBestClientsController,
} = require('../controllers/adminController');

const getAdminBestProfession = '/admin/best-profession'; // ?start=<date>&end=<date>
const getAdminBestClients = '/admin/best-clients'; // ?start=<date>&end=<date>&limit=<integer>

const app = express();

app.get(
  getAdminBestProfession,
  getAdminBestProfessionController,
);

app.get(
  getAdminBestClients,
  getAdminBestClientsController,
);

module.exports = app;
