const { StatusCodes } = require('http-status-codes');
const {BookingService} = require('../services');
const {ErrorResponse,SuccessResponse} = require("../utils/common");

async function createBooking(req,res){
    const {flightId,userId,noOfSeats} = req.body;
    try {
        const booking = await BookingService.createBooking({userId,flightId,noOfSeats});
        SuccessResponse.data = booking;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

module.exports = {
    createBooking
}