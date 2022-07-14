import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { AppDataSource } from "../../data-source";
import "dotenv/config";
import { IUserLogin } from "../../interfaces/users";
import User from "../../entities/users";
import { AppError } from "../../errors/appError";

export default class UserLoginService {
  public async execute({ email, password }: IUserLogin): Promise<any> {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError("Incorrect email and/or password.");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Incorrect email and/or password.");
    }

    const token = sign(
      { email: user.email },
      String(process.env.JWT_SECRET) || "default",
      {
        subject: user.id,
        expiresIn: "24h",
      }
    );

    return { token };
  }
}
