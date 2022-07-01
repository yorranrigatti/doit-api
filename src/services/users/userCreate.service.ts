import { hash } from "bcryptjs";
import { AppDataSource } from "../../data-source";
import User from "../../entities/users";
import { AppError } from "../../errors/appError";
import { IUserCreate, IUserCreateReturn } from "../../interfaces/users";

export default class UserCreateService {
  async execute({
    name,
    email,
    password,
  }: IUserCreate): Promise<IUserCreateReturn> {
    const userRepository = AppDataSource.getRepository(User);

    const userAlreadyExists = await userRepository.findOne({
      where: { email },
    });

    if (userAlreadyExists) {
      throw new AppError("This email is already in use");
    }

    const hashedPassword = await hash(password, 10);

    const user = userRepository.create({
      name,
      email,
      password,
    });

    await userRepository.save(user);

    const userReturned: IUserCreateReturn = { ...user };
    delete userReturned.password;

    return userReturned;
  }
}
