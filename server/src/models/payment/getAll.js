import prisma from '../../prismaClient.js';

const getPayment = async () => {
  return prisma.payment.findMany();
};

export default getPayment;
