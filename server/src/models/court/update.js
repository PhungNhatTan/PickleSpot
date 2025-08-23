import prisma from "../../prismaClient.js";

const updateCourt = async (id, data) => {
  return prisma.court.update({ where: { id }, data });
};

export default updateCourt;
