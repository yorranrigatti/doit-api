import { AppDataSource } from "../../data-source";
import Task from "../../entities/tasks";
import User from "../../entities/users";
import { AppError } from "../../errors/appError";
import { IListById } from "../../interfaces/list";
import { getUrl } from "../../utils";

export default class TasksListService {
  async execute(id: string): Promise<any> {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const tasks = user.tasks;

    return {tasks};
  }
}
