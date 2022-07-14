import { Express } from "express";
import taskRouter from "./tasks.routes";
import userRouter from "./users.routes";

export const appRoutes = (app: Express) => {
  app.use("/users", userRouter);
  app.use("/users/:id/tasks", taskRouter)
};
