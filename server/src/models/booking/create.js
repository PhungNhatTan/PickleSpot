import prisma from '../../prismaClient.js';

const createBooking = async (data) => {
  return prisma.booking.create({ data });
};

export default createBooking;
