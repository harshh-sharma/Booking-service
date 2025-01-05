const {BookingRepository} = require('../repositories');

const db = require("../models");
const { default: axios } = require('axios');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');

const bookingRepository = new BookingRepository();

async function createBooking(data){
    const transaction = await db.sequelize.transaction();
    
    try {
        const flight = await axios.get(`${process.env.FLIGHT_SERVICE}/${data?.flightId}`);

        const flightData = flight?.data?.data;

        // check the seats are available in flights or not
        if(flightData?.totalSeats < data.noOfSeats){
            throw new AppError('Seats are not avaiable in the flight',StatusCodes.BAD_REQUEST);
        }

        // if seats are available in flights then calculate biiling amount of the seat
        const billingAmountOfSeats = Number(data.noOfSeats) * flightData.price;

        console.log("goes well");
        const bookingPayload = {...data,totalCost:billingAmountOfSeats};
        const booking = await bookingRepository.createBooking(bookingPayload,transaction);

        console.log("hjh",booking);
        

        // now decrease the flights seats from db
          const updateFlightSeats = await fetch(`${process.env.FLIGHT_SERVICE}/${data?.flightId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ seats: data?.noOfSeats, dec: true })
          });

          await transaction.commit();
          return booking;
          
        
    } catch (error) {
        await  transaction.rollback();
        throw error
    }
}

module.exports = {
    createBooking
}