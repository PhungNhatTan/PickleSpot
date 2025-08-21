import prisma from '../../prismaClient.js';

const deleteCourtGroup = async (id) => {
  return prisma.courtGroup.delete({ where: { id } });
};

export default deleteCourtGroup;
