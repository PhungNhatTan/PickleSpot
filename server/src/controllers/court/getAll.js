import prisma from '../../prismaClient.js';

const getAllCourts = async (req, res, next) => {
  try {
    const courts = await prisma.court.findMany({
      include: {
        photo: true,
        type: true,
        courtRating: true,
      },
    });
    res.json(courts);
  } catch (err) {
    next(err);
  }
};

export default getAllCourts;
