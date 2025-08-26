import { Router } from 'express';
import { createBookingController } from '../controllers/bookingController.js';
import { authRequired } from '../middlewares/authRequired.js';

const router = Router();

router.post('/', authRequired, createBookingController);

export default router;
