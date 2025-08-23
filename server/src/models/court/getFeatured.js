import prisma from '../../prismaClient.js';

export default async function getFeaturedCourts() {
  return prisma.courtGroup.findMany({
    take: 6,
    include: {
      Court: {
        take: 1,
        select: {
          Id: true,
          Name: true,
          Price: true,
          Covered: true,
          IsIndoor: true,
          DurationUnit: true,
          Capacity: true,
        },
      },
    },
  });
}
