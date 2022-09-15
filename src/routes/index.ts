import { Express, Router } from "express";
import tasksRoutes from "./tasks.routes";
import usersRoutes from "./users.routes";

const routes = Router();

export const appRoutes = (app: Express) => {
  app.use("/api/users", usersRoutes);
  app.use("/api/users/:id/tasks", tasksRoutes);
};

export default routes;
