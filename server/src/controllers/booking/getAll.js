import bookingModel from '../../models/booking/index.js';

const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await bookingModel.getAll();
    res.json(bookings);
  } catch (err) {
    next(err);
  }
};

export default getAllBookings;
