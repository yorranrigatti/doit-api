import { Router } from "express";
import { expressYupMiddleware } from "express-yup-middleware";
import UserController from "../controllers/users.controller";
import userCreateSchema from "../validations/users/userCreate.validation";

const userRouter = Router();

userRouter.post(
  "/",
  expressYupMiddleware({ schemaValidator: userCreateSchema }),
  UserController.store
);

export default userRouter;
