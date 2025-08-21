import prisma from '../../prismaClient.js';

const updateBooking = async (id, data) => {
  return prisma.booking.update({
    where: { id },
    data,
  });
};

export default updateBooking;
