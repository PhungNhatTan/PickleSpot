import prisma from '../../prismaClient.js';

const getPayment = async (id) => {
  return prisma.payment.findUnique({
    where: { id },
    include: { booking: true },
  });
};

export default getPayment;
