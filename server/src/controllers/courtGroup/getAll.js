import prisma from '../../prismaClient.js';

const getAllCourtGroups = async (req, res, next) => {
  try {
    const groups = await prisma.courtGroup.findMany({
      include: { courts: true },
    });
    res.json(groups);
  } catch (err) {
    next(err);
  }
};

export default getAllCourtGroups;
