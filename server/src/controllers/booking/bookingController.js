import { bookingModel } from "../../models/booking/index.js";

export const bookingController = {
    async getBooking(req, res) {
        try {
            const booking = await bookingModel.findById(Number(req.params.id));
            if (!booking) {
                return res.status(404).json({ error: "Booking not found" })
            };
            res.json(booking);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async getAllBookings(req, res) {
        try {
            const bookings = await bookingModel.findAll();
            res.json(bookings);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async createBooking(req, res) {
        try {
            const newBooking = await bookingModel.create(req.body);
            res.status(201).json(newBooking);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async updateBooking(req, res) {
        try {
            const updated = await bookingModel.update(Number(req.params.id), req.body);
            res.json(updated);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async deleteBooking(req, res) {
        try {
            await bookingModel.remove(Number(req.params.id));
            res.json({ message: "Booking deleted successfully" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
};
