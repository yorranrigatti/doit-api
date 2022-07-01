import "express-async-errors";
import express from "express";
import { appRoutes } from "./routes";
import { Request, Response } from "express";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());

appRoutes(app);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Doit - API",
  });
});

app.use(errorMiddleware);

export default app;
