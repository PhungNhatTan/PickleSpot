import courtModel from '../../models/court/index.js';

const getAllCourts = async (req, res, next) => {
  try {
    const courts = await courtModel.getAll();
    res.json(courts);
  } catch (err) {
    next(err);
  }
};

export default getAllCourts;
