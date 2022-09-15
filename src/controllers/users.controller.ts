import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import UserCreateService from "../services/users/userCreate.service";
import UserListService from "../services/users/userList.service";
import UserShowService from "../services/users/userShow.service";
import UserUpdateService from "../services/users/userUpdate.service";
import UserDeleteService from "../services/users/userDelete.service";
import UserLoginService from "../services/users/userLogin.service";

export default class UsersController {
  static async store(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const createUser = new UserCreateService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return res.status(201).json({
      message: "User created successfully",
      data: instanceToPlain(user),
    });
  }

  static async index(req: Request, res: Response) {
    const per_page = req.query.per_page as string;
    const page = req.query.page as string;

    const usersList = new UserListService();

    const users = await usersList.execute({
      per_page: +per_page,
      page: +page,
    });

    return res.json(instanceToPlain(users));
  }

  static async show(req: Request, res: Response) {
    const { id } = req.params;

    const showUser = new UserShowService();

    const user = await showUser.execute(id);

    return res.json(instanceToPlain(user));
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const updateUser = new UserUpdateService();

    const user = await updateUser.execute({ id, name, email, password });

    return res.json({
      message: "User updated successfully",
      data: instanceToPlain(user),
    });
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    const deleteUser = new UserDeleteService();

    await deleteUser.execute(id);

    return res.status(204).json({ message: "User deleted successfully" });
  }

  static async session(req: Request, res: Response) {
    const { email, password } = req.body;

    const auth = new UserLoginService();

    const token = await auth.execute({ email, password });

    return res.status(200).json(token);
  }
}
