import prisma from '../../prismaClient.js';

const search = async ({
  location,
  start,
  end,
  minPrice,
  maxPrice,
  minRating,
}) => {
  const courts = await prisma.court.findMany({
    where: {
      AND: [
        location
          ? {
              OR: [
                {
                  Group: {
                    Address: { contains: location, mode: 'insensitive' },
                  },
                },
                {
                  Group: {
                    Name: { contains: location, mode: 'insensitive' },
                  },
                },
              ],
            }
          : {},
        minPrice || maxPrice
          ? {
              Price: {
                gte: minPrice ?? undefined,
                lte: maxPrice ?? undefined,
              },
            }
          : {},
      ],
    },
    include: {
      Group: {
        include: {
          Court: {
            include: {
              Booking: true,
              CourtRating: true,
              Photo: true,
              Type: true,
            },
          },
        },
      },
    },
  });

  let availableCourts = courts;
  if (start && end) {
    const startDate = new Date(start);
    const endDate = new Date(end);

    availableCourts = courts.filter((court) => {
      const overlapping = court.Booking.some(
        (b) =>
          b.Status !== 'Cancelled'
          && !(endDate <= b.BookStartTime || startDate >= b.BookEndTime),
      );
      return !overlapping;
    });
  }

  const grouped = {};
  for (const court of availableCourts) {
    const group = court.Group;

    if (!group) {
      continue;
    }

    if (!grouped[group.Id]) {
      grouped[group.Id] = {
        id: group.Id,
        name: group.Name,
        address: group.Address,
        latitude: group.Latitude,
        longitude: group.Longitude,
        description: group.Description,
        courts: [],
      };
    }

    if (minRating) {
      if (court.CourtRating.length === 0) {
        continue;
      }

      const avg =
        court.CourtRating.reduce((sum, r) => sum + r.Score, 0)
        / court.CourtRating.length;

      if (avg < minRating) {
        continue;
      }
    }

    grouped[group.Id].courts.push(court);
  }

  return Object.values(grouped);
};

export default search;
