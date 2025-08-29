import prisma from '../../generated/prisma/index.js';

const hasConflict = async (courtId, startTime, endTime) => {
  const conflict = await prisma.courtBooking.findFirst({
    where: {
      CourtId: courtId,
      DisabledAt: null,
      AND: [
        { BookStartTime: { lt: endTime } },
        { BookEndTime: { gt: startTime } },
      ],
    },
  });
  return Boolean(conflict);
};

export default hasConflict;