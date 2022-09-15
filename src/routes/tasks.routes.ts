import { Router } from "express";
import { expressYupMiddleware } from "express-yup-middleware";
import TaskController from "../controllers/tasks.controller";
import { taskCreateSchema } from "../validations/task.validation";

const tasksRoutes = Router();

tasksRoutes.post(
  "/",
  expressYupMiddleware({ schemaValidator: taskCreateSchema }),
  TaskController.store
);
tasksRoutes.get("/", TaskController.index);
tasksRoutes.delete("/:task_id", TaskController.delete);

export default tasksRoutes;
