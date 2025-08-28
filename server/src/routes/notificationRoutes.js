import { Router } from "express";
import notification from "../controllers/notification/index.js";
import { authRequired } from '../middlewares/authRequired.js';

const router = Router();

// router.get('/', authRequired, notification.get);
router.get('/id/:id', authRequired, notification.get);
router.get('/user/:id', authRequired, notification.getAll);
router.post('/', notification.create);
router.delete('/', authRequired, notification.deleteNotification);

export default router;
