import prisma from '../../prismaClient.js';

const getBooking = async (id) => {
  return prisma.booking.findUnique({
    where: { id },
    include: { court: true, payment: true },
  });
};

export default getBooking;
