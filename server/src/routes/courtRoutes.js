import { Router } from 'express';
import  court  from '../controllers/court/index.js';

const router = Router();


router.get('/featured', court.getFeatured);
router.get('/:id', court.get);
router.get('/', court.searchCourts);

export default router;
