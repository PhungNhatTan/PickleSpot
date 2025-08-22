import courtModel from '../../models/court/index.js';

const deleteCourt = async (req, res, next) => {
  try {
    const { id } = req.params;
    await courtModel.remove(Number(id));
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export default deleteCourt;
