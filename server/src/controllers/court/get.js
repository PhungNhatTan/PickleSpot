import courtModel from '../../models/court/index.js';

const getCourt = async (req, res, next) => {
  try {
    const { id } = req.params;
    const court = await courtModel.get(Number(id));
    if (!court) {
      return res.status(404).json({ message: 'Court not found' });
    }
    res.json(court);
  } catch (err) {
    next(err);
  }
};

export default getCourt;
