import bookingModel from '../../models/booking/index.js';

const createBooking = async (req, res, next) => {
  try {
    const { courtId, startTime, endTime } = req.body;
    const accountId = req.user?.id; // assume you have authentication middleware

    if (!courtId || !startTime || !endTime) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const start = new Date(startTime);
    const end = new Date(endTime);

    const booking = await bookingModel.createBooking({
      courtId,
      accountId,
      startTime: start,
      endTime: end,
    });

    res.status(201).json(booking);
  } catch (err) {
    next(err);
  }
};

export default createBooking;
