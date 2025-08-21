import prisma from '../../prismaClient.js';

const getAllPayments = async (req, res, next) => {
  try {
    const payments = await prisma.payment.findMany({
      include: { booking: true },
    });
    res.json(payments);
  } catch (err) {
    next(err);
  }
};

export default getAllPayments;
