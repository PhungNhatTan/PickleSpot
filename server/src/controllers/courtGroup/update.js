import courtGroupModel from '../../models/courtGroup/index.js';

const updateCourtGroup = async (req, res, next) => {
  try {
    const { id } = req.params;
    const group = await courtGroupModel.update(Number(id), req.body);
    res.json(group);
  } catch (err) {
    next(err);
  }
};

export default updateCourtGroup;
