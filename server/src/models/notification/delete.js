import prisma from '../../prismaClient.js';

const deleteNotification = async (id) => {
  return prisma.notification.update({
    where: id,
    data: {
      DeletedAt: new Date(),
    }
  });
};

export default deleteNotification;
