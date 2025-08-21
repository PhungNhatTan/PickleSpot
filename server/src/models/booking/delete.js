import prisma from '../../prismaClient.js';

const deleteBooking = async (id) => {
  return prisma.booking.delete({ where: { id } });
};

export default deleteBooking;
