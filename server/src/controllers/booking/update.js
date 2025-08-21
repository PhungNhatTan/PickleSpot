import bookingModel from '../../models/booking/index.js';

const updateBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await bookingModel.update(Number(id), req.body);
    res.json(booking);
  } catch (err) {
    next(err);
  }
};

export default updateBooking;
