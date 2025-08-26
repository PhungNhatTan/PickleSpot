import prisma from '../../prismaClient.js';
import hasConflict from './checkConflict.js';

const createBooking = async ({ courtId, accountId, startTime, endTime }) => {
  const court = await prisma.court.findUnique({
    where: { Id: courtId, DisabledAt: null },
  });
  if (!court) {
    throw new Error('Court not found')
  }

  const conflict = await hasConflict(courtId, startTime, endTime);
  if (conflict) {
    throw new Error('Time slot already booked')
  }

  const bookedPrice = court.Price; // or compute based on duration
  const totalPrice = bookedPrice; // add service fees if needed

  const booking = await prisma.courtBooking.create({
    data: {
      CourtId: courtId,
      AccountId: accountId,
      BookStartTime: startTime,
      BookEndTime: endTime,
      BookedPrice: bookedPrice,
      TotalPrice: totalPrice,
      Status: 'Pending',
    },
  });

  return booking;
};

export default createBooking;
