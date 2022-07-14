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
userRouter.post("/login", UserController.session)
userRouter.get("", UserController.index);
userRouter.get("/:id", UserController.show);
userRouter.patch("/:id", UserController.update);
userRouter.delete("/:id", UserController.delete);


export default userRouter;
