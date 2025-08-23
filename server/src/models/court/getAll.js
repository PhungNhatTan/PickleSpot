import prisma from "../../prismaClient.js";

const getAllCourts = async () => {
  return prisma.court.findMany();
};

export default getAllCourts;
