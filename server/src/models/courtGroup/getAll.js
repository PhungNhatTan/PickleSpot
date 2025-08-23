import prisma from "../../prismaClient.js";

const getAllCourtGroups = async () => {
  return prisma.courtGroup.findMany({ include: { Courts: true } });
};

export default getAllCourtGroups;
