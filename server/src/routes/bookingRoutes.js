import { Router } from 'express';
import booking from '../controllers/booking/index.js';
import authRequired from '../middleware/authRequired.js';

const router = Router();

router.post('/', authRequired, booking.create);

export default router;
