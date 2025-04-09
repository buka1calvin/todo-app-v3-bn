import { Router } from "express";
import { createTask, getAllTasks } from "../../controllers/tasks.controllers.js";
import { protect } from "../../middleware/auth.js";


const routes=new Router();

routes.post("/create",protect,createTask)
routes.get("/",protect,getAllTasks)

export default routes;