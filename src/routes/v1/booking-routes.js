const express = require('express');

const {BookingController} = require('../../controller');

const bookingRouter = express.Router();

bookingRouter.route('/').post(BookingController.createBooking);

bookingRouter.route('/:id').get(BookingController.getBooking);

module.exports = bookingRouter;