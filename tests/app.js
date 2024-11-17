const express = require('express');
const app = express();
const menuRouter = require('../routes/menus');

app.use(express.json());
app.use('/api/v1/eats/stores/:storeId/menus', menuRouter);

module.exports = app;