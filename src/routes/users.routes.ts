import { Router } from "express";
import { expressYupMiddleware } from "express-yup-middleware";
import UsersController from "../controllers/users.controller";
import {
  userCreateSchema,
  userLoginSchema,
} from "../validations/user.validation";

const usersRoutes = Router();

usersRoutes.post(
  "/",
  expressYupMiddleware({ schemaValidator: userCreateSchema }),
  UsersController.store
);
usersRoutes.get("/", UsersController.index);
usersRoutes.get("/:id", UsersController.show);
usersRoutes.patch("/:id", UsersController.update);
usersRoutes.delete("/:id", UsersController.delete);
usersRoutes.post(
  "/login",
  expressYupMiddleware({ schemaValidator: userLoginSchema }),
  UsersController.session
);

export default usersRoutes;
