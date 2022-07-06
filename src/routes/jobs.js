const express = require('express');
const { getProfile } = require('../middleware/getProfile');

const {
  getJobsUnpaidController,
  postPayForJobController,
} = require('../controllers/jobController');

const getJobsUnpaid = '/jobs/unpaid';
const postPayForJob = '/jobs/:job_id/pay';

const app = express();

app.get(
  getJobsUnpaid,
  getProfile,
  getJobsUnpaidController,
);

app.post(
  postPayForJob,
  getProfile,
  postPayForJobController,
);

module.exports = app;
