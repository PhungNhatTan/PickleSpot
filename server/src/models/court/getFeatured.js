import prisma from '../../prismaClient.js';

export default async function getFeaturedCourts() {
  return prisma.courtGroup.findMany({
    take: 6,
    include: {
      courts: {
        take: 1,
        select: {
          Id: true,
          Name: true,
          Price: true,
          OpenTime: true,
          CloseTime: true,
        },
      },
    },
  });
}
