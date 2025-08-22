import bookingModel from '../../models/booking/index.js';

const createBooking = async (req, res, next) => {
  try {
    const booking = await bookingModel.create(req.body);
    res.status(201).json(booking);
  } catch (err) {
    next(err);
  }
};

export default createBooking;
