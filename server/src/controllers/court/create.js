import courtModel from '../../models/court/index.js';

const createCourt = async (req, res, next) => {
  try {
    const court = await courtModel.create(req.body);
    res.status(201).json(court);
  } catch (err) {
    next(err);
  }
};

export default createCourt;
