import courtModel from '../../models/court/index.js';

const updateCourt = async (req, res, next) => {
  try {
    const { id } = req.params;
    const court = await courtModel.update(Number(id), req.body);
    res.json(court);
  } catch (err) {
    next(err);
  }
};

export default updateCourt;
