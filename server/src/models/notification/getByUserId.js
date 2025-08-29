import prisma from "../../generated/prisma/index.js";

const getByUserId = async (id) => {
    const notification = prisma.notification.findMany({
        where: {
            Account: {
                some: {
                    Id: id,
                },
            },
            DisabledAt: null
        },
        select: {
            Message: true,
            Value: true,
            CourtBooking: {
                select: {
                    Id: true,
                    BookStartTime: true,
                    include: {
                        Court: {
                            Id: true,
                            Name: true,
                        }
                    }
                }
            }

        }
    });
    return notification;
}

export default getByUserId;
