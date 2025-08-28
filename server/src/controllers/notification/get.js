import notificationModel from '../../models/notification/index.js';

const getNotification = async (req, res, next) => {
  try {
    const { id } = req.params;
    const notification = await notificationModel.get(Number(id));
    if (!notification) {
      return res.status(404).json({ message: 'Court not found' });
    }
    res.json(notification);
  } catch (err) {
    next(err);
  }
};

export default getNotification;
