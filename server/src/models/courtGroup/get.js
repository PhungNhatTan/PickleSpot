import prisma from "../../config/prismaClient.js";

const getCourtGroupById = async (id) => {
  return prisma.courtGroup.findUnique({
    where: { id },
    include: { Courts: true },
  });
};

export default getCourtGroupById;
