import courtGroupModel from '../../models/courtGroup/index.js';

const getCourtGroup = async (req, res, next) => {
  try {
    const { id } = req.params;
    const group = await courtGroupModel.get(Number(id));
    if (!group) {
      return res.status(404).json({ message: 'Court group not found' });
    }
    res.json(group);
  } catch (err) {
    next(err);
  }
};

export default getCourtGroup;
