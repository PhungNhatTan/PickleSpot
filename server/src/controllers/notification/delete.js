import courtGroupModel from '../../models/courtGroup/index.js';

const deleteNotification = async (req, res, next) => {
  try {
    const { id } = req.params;
    await courtGroupModel.remove(Number(id));
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export default deleteNotification;
