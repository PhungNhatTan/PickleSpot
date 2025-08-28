import courtGroupModel from '../../models/courtGroup/index.js';

const getAllCourtGroups = async (req, res, next) => {
  try {
    const groups = await courtGroupModel.getAll();
    res.json(groups);
  } catch (err) {
    next(err);
  }
};

export default getAllCourtGroups;
