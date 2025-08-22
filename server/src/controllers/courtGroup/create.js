import courtGroupModel from '../../models/courtGroup/index.js';

const createCourtGroup = async (req, res, next) => {
  try {
    const group = await courtGroupModel.create(req.body);
    res.status(201).json(group);
  } catch (err) {
    next(err);
  }
};

export default createCourtGroup;
