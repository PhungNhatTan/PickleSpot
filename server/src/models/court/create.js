import prisma from "../../config/prismaClient.js";

const createCourt = async (data) => {
  return prisma.court.create({ data });
};

export default createCourt;
