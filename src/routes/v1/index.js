const express = require("express");
const {InfoController} = require('../../controller');
const infoRouter = require("./info-routes");

const v1Router = express.Router();

v1Router.use('/info',infoRouter);

module.exports = v1Router;

