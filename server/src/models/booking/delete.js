import prisma from '../../prismaClient.js';

const deleteBooking = async (id) => {
  return prisma.booking.update({
    where: id,
    data: {
      DeletedAt: new Date(),
    }
  });
};

export default deleteBooking;
