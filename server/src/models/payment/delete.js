import prisma from '../../prismaClient.js';

const deletePayment = async (id) => {
  return prisma.payment.update({
    where: id,
    data: {
      DeletedAt: new Date(),
    }
  });
};

export default deletePayment;
