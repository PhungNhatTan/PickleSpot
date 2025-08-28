import prisma from '../../prismaClient.js';

const deleteCourtGroup = async (id) => {
  return prisma.courtGroup.update({
    where: id,
    data: {
      DeletedAt: new Date(),
    }
  });
};

export default deleteCourtGroup;
