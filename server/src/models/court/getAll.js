import prisma from "../../config/prismaClient.js";

const getAllCourts = async () => {
  return prisma.court.findMany();
};

export default getAllCourts;
