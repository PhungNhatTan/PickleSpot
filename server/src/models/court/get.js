import prisma from "../../config/prismaClient.js";

const getCourtById = async (id) => {
  return prisma.court.findUnique({ where: { id } });
};

export default getCourtById;
