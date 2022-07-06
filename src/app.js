const express = require('express');

const bodyParser = require('body-parser');
const routes = require('./routes');
const { sequelize } = require('./model');
const { getProfile } = require('./middleware/getProfile');

const app = express();
app.use(bodyParser.json());
app.use(routes);

app.set('sequelize', sequelize);
app.set('models', sequelize.models);

app.use(getProfile);

module.exports = app;
