import prisma from '../../prismaClient.js';

const updatePayment = async (id, data) => {
  return prisma.payment.update({
    where: { id },
    data,
  });
};

export default updatePayment;
