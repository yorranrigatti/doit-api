import bcrypt from "bcrypt";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError";
import { IUserCreate } from "../../interfaces/user.interface";
import User from "../../models/user.model";

export default class UserCreateService {
  async execute({ name, email, password }: IUserCreate): Promise<any> {
    const userRepository = AppDataSource.getRepository(User);

    const emailAlreadyExists = await userRepository.findOne({
      where: { email },
    });

    if (emailAlreadyExists) {
      throw new AppError("Email already exists", 409);
    }

    const user = userRepository.create({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
    });

    await userRepository.save(user);

    const formatedUser = {
      ...user,
      password: undefined,
    };

    return formatedUser;
  }
}
