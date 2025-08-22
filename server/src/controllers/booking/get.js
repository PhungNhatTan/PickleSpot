import bookingModel from '../../models/booking/index.js';

const getBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await bookingModel.get(Number(id));
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (err) {
    next(err);
  }
};

export default getBooking;
