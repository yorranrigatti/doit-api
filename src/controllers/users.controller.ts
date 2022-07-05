import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";

import UserCreateService from "../services/users/userCreate.service";
import UserDeleteService from "../services/users/userDelete.service";
import userShowService from "../services/users/userShow.service";
import UsersListService from "../services/users/usersList.service";
import UserUpdateService from "../services/users/userUpdate.service";

export default class UserController {
  static async store(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const createUser = new UserCreateService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    const result = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return res.status(201).json({
      message: "User created successfully",
      data: instanceToPlain(result),
    });
  }
  static async index(req: Request, res: Response) {
    const per_page = req.query.per_page as string;
    const page = req.query.page as string;

    const usersList = new UsersListService();

    const users = await usersList.execute({
      per_page: +per_page,
      page: +page,
    });

    return res.json(instanceToPlain(users));
  }

  static async show(req: Request, res: Response) {
    const { id } = req.params;

    const showUser = new userShowService();

    const user = await showUser.execute(id);

    return res.json(instanceToPlain(user));
  }
  static async update(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const { id } = req.params;

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
}
