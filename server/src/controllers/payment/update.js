import paymentModel from '../../models/payment/index.js';

const updatePayment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payment = await paymentModel.update(Number(id), req.body);
    res.json(payment);
  } catch (err) {
    next(err);
  }
};

export default updatePayment;
