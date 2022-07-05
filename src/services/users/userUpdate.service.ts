import { compareSync, hash } from "bcryptjs";
import { AppDataSource } from "../../data-source";
import User from "../../entities/users";
import { AppError } from "../../errors/appError";
import { IUserCreateReturn, IUserUpdate } from "../../interfaces/users";

export default class UserUpdateService {
  async execute({ id, name, email, password }: IUserUpdate): Promise<any> {
    const userRepository = AppDataSource.getRepository(User);

    if (
      !id.match(
        /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
      )
    ) {
      throw new AppError("The id informed is not valid");
    }

    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    if (password) {
      if (compareSync(password, user.password)) {
        throw new AppError("Please, inform a different password");
      }

      user.password = await hash(password, 10);
    }

    name ? (user.name = name) : user.name;
    email ? (user.email = email) : user.email;

    await userRepository.save(user);
    const userReturned: IUserCreateReturn = { ...user };
    delete userReturned.password;

    return userReturned;
  }
}
