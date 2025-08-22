import prisma from "../../config/prismaClient.js";

const updateCourt = async (id, data) => {
  return prisma.court.update({ where: { id }, data });
};

export default updateCourt;
