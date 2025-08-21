import prisma from '../../prismaClient.js';

const getBooking = async () => {
  return prisma.booking.findMany();
};

export default getBooking;
