import paymentModel from '../../models/payment/index.js';

const getPayment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payment = await paymentModel.get(Number(id));
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json(payment);
  } catch (err) {
    next(err);
  }
};

export default getPayment;
