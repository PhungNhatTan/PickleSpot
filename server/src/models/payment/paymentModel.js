import prisma from "../../prismaClient.js";

export const paymentModel = {
    findById: (id) =>
        prisma.payment.findUnique({
            where: { id },
            include: {
                Booking: true,
                User: true,
            },
        }),

    findAll: () =>
        prisma.payment.findMany({
            include: {
                Booking: true,
                User: true,
            },
        }),

    create: (data) =>
        prisma.payment.create({
            data,
        }),

    update: (id, data) =>
        prisma.payment.update({
            where: { id },
            data,
        }),

    remove: (id) =>
        prisma.payment.delete({
            where: { id },
        }),
};
