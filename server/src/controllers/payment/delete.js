import paymentModel from '../../models/payment/index.js';

const deletePayment = async (req, res, next) => {
  try {
    const { id } = req.params;
    await paymentModel.remove(Number(id));
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export default deletePayment;
