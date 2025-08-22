import { Router } from 'express';
import { courtController } from '../controllers/court/index.js';

const router = Router();

router.get('/:id', courtController.getCourtDetails);
router.get('/', courtController.searchCourts);

export default router;
