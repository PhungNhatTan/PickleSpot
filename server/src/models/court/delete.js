import prisma from "../../prismaClient.js";

const deleteCourt = async (id) => {
  return prisma.court.update({
    where: id,
    data: {
      DeletedAt: new Date(),
    }
  });
};

export default deleteCourt;
