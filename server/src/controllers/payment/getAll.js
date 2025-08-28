import paymentModel from '../../models/payment/index.js';

const getAllPayments = async (req, res, next) => {
  try {
    const payments = await paymentModel.getAll();
    res.json(payments);
  } catch (err) {
    next(err);
  }
};

export default getAllPayments;
