import notificationModel from '../../models/notification/index.js';

const getNotification = async (req, res, next) => {
  try {
    const { id } = req.params;
    const notification = await notificationModel.getByUserId(Number(id));
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.json(notification);
  } catch (err) {
    next(err);
  }
};

export default getNotification;