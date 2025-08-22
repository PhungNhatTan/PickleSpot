import prisma from "../../config/prismaClient.js";

const createCourtGroup = async (data) => {
  return prisma.courtGroup.create({ data });
};

export default createCourtGroup;
