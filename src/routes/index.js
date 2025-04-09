import { Router } from 'express';
import authRoutes from './authroutes.js';
import tasks from "./tasks/task.routes.js"

const router = Router();

router.use('/auth', authRoutes);
router.use("/tasks",tasks)


export default router;
