const express = require("express");
const {InfoController} = require('../../controller');
const infoRouter = require("./info-routes");
const bookingRouter = require("./booking-routes");

const v1Router = express.Router();

v1Router.use('/info',infoRouter);
v1Router.use('/bookings',bookingRouter);

module.exports = v1Router;

