import { Router } from "express";
import notification from "../controllers/notification/index.js";
import { authRequired } from '../middlewares/authRequired.js';

const router = Router();

// router.get('/', authRequired, notification.get);
router.get('/id/:id', authRequired, notification.get);
router.get('/user/:id', authRequired, notification.getAll);

export default router;
