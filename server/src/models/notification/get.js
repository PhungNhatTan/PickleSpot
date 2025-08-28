import prisma from "../../generated/prisma/index.js";

const get = async (id) => {
    const notification = prisma.notification.findUnique({
        where: { Id: id, DisabledAt: null },
        select: {
            Message: true,
            Value: true,
            include: {
                Account: {
                    select: {
                        Id: true,
                        DisplayName: true,
                    }
                },
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
        }
    });
    return notification;
}

export default get;
