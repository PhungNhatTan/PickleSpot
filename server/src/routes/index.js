import express from "express";

import healthRoutes from "./healthRoutes.js";
import authRoutes from "./authRoutes.js";
import courtRoutes from "./courtRoutes.js";

const router = express.Router();

// base health check + auth
router.use("/", healthRoutes);
router.use("/api/auth", authRoutes);

// domain routes
router.use("/api/courts", courtRoutes);

export default router;
