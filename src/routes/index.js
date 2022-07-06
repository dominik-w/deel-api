const express = require('express');

const contractRoutes = require('./contracts');
const adminRoutes = require('./admins');
const balanceRoutes = require('./balances');
const jobRoutes = require('./jobs');

const app = express();

// Main.
app.get('/', async (req, res) => {
  res.json({
    status: 'OK',
    message: 'Welcome!',
  });
});

// API endpoints.
app.use(adminRoutes);
app.use(balanceRoutes);
app.use(contractRoutes);
app.use(jobRoutes);

module.exports = app;
