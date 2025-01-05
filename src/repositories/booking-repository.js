const {Booking} = require('../models');
const CrudRepository = require('./crud-repository');

class BookingRepository extends CrudRepository{
    constructor(){
        super(Booking)
    }

    async createBooking(data, transaction) {
        // console.log('createBooking called with:', data, transaction);
        try {
          const response = await Booking.create(data,{transaction:transaction});
          console.log('response', response);
          return response;
        } catch (error) {
          console.error('Error in createBooking:', error);
          throw error;
        }
      }
      
}

module.exports = BookingRepository;
