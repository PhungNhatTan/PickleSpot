import bookingModel from '../../models/booking/index.js';

const deleteBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    await bookingModel.remove(Number(id));
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export default deleteBooking;
