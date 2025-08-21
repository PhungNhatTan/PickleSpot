import prisma from '../../prismaClient.js';

const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: { court: true, payment: true },
    });
    res.json(bookings);
  } catch (err) {
    next(err);
  }
};

export default getAllBookings;
