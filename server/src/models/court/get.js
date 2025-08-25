import prisma from "../../generated/prisma/index.js";

export default async function getCourtById(id) {
  const [court, rating] = await Promise.all([
    prisma.court.findUnique({
      where: { Id: id },
      select: {
        Name: true,
        Price: true,
        Covered: true,
        IsIndoor: true,
        DurationUnit: true,
        Capacity: true,
        DisabledAt: true,

        Group: {
          select: {
            Name: true,
            Address: true,
            Latitude: true,
            Longitude: true,
            Description: true,
            CourtGroupService: {
              select: {
                Price: true,
                IsAvailable: true,
                Service: { select: { Name: true } },
              },
            },
          },
        },

        Photo: { select: { Url: true } },
        Type: { select: { Name: true } },
      },
    }),

    prisma.courtRating.aggregate({
      where: { CourtId: id },
      _avg: { Score: true },
      _count: { Score: true },
    }),
  ]);

  if (!court) { return null };

  const { DisabledAt, ...courtData } = court;
  const safeCourt = {
    ...courtData,
    ...(DisabledAt ? { DisabledAt } : {}), // only include when not null
    averageScore: rating._avg.Score || 0,
    totalRatings: rating._count.Score || 0,
  };

  return safeCourt;
}
