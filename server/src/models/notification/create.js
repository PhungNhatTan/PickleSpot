import prisma from "../../prismaClient.js";

const createNotification = async (data) => {
  return prisma.court.create({ data });
};

export default createNotification;
