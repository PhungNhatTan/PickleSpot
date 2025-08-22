import { Router } from 'express';
import { courtGroupController } from '../controllers/courtGroup/index.js';

const router = Router();

// CRUD endpoints for CourtGroup
router.get('/', courtGroupController.getAllCourtGroups);
router.get('/:id', courtGroupController.getCourtGroup);
router.post('/', courtGroupController.createCourtGroup);
router.put('/:id', courtGroupController.updateCourtGroup);
router.delete('/:id', courtGroupController.deleteCourtGroup);

export default router;
