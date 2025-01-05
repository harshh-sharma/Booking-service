const express = require('express');

const {BookingController} = require('../../controller');

const bookingRouter = express.Router();

bookingRouter.route('/').post(BookingController.createBooking);

module.exports = bookingRouter;