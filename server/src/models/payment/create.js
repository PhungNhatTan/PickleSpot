import prisma from '../../prismaClient.js';

const createPayment = async (data) => {
  return prisma.payment.create({ data });
};

export default createPayment;
