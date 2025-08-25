import { Router } from 'express';
import  court  from '../controllers/court/index.js';

const router = Router();


router.get('/featured', court.getFeatured);
router.get('/', court.searchCourts);
router.get('/:id(\\d+)', court.get);
router.post('/', court.create);
router.put('/:id(\\d+)', court.update);
router.delete('/:id(\\d+)', court.remove);

export default router;
