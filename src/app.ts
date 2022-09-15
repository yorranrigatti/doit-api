import "express-async-errors";
import "reflect-metadata";

import cors from "cors";
import express from "express";
import { appRoutes } from "./routes";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

app.use(cors());

app.use(express.json());

appRoutes(app);

app.use(errorMiddleware);

export default app;
