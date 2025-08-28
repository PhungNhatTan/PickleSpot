import { Router } from 'express';
import booking from '../controllers/index.js';
import { authRequired } from '../middlewares/authRequired.js';

const router = Router();

router.post('/', authRequired, booking.create());

export default router;
