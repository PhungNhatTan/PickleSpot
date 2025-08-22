import paymentModel from '../../models/payment/index.js';

const createPayment = async (req, res, next) => {
  try {
    const payment = await paymentModel.create(req.body);
    res.status(201).json(payment);
  } catch (err) {
    next(err);
  }
};

export default createPayment;
