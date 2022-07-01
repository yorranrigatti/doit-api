import { Request, Response } from "express";
import UserCreateService from "../services/users/userCreate.service";

export default class UserController {
  static async store(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const createUser = new UserCreateService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });
      
      const data = {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at,
      };

      return res.status(201).json({message: "User created", data})
  }
  static async index(req: Request, res: Response) {
    const usersList = new UsersListService();

    const users = await usersList.execute()

    return res.json(users)
  }
  static async show(req: Request, res: Response) {}
  static async update(req: Request, res: Response) {}
  static async delete(req: Request, res: Response) {}
}
