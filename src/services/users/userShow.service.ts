import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError";
import User from "../../models/user.model";

export default class UserShowService {
  async execute(id: string): Promise<any> {
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

    return user;
  }
}
