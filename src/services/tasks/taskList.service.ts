import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError";
import User from "../../models/user.model";

export default class TaskListService {
  async execute(id: string): Promise<any> {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const tasks = user.tasks;

    return tasks;
  }
}
