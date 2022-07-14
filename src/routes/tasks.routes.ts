import { Router } from "express";
import TaskController from "../controllers/tasks.controller";

const taskRouter = Router();

taskRouter.post("/", TaskController.store);
taskRouter.get("/", TaskController.index);
taskRouter.get("/task_id", TaskController.delete)

export default taskRouter;
