import prisma from '../../prismaClient.js';

const deletePayment = async (id) => {
  return prisma.payment.delete({ where: { id } });
};

export default deletePayment;
