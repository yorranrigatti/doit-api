import { AppDataSource } from "../../data-source";
import Task from "../../entities/tasks";
import User from "../../entities/users";
import { AppError } from "../../errors/appError";
import { ITaskCreate } from "../../interfaces/tasks";

export default class TaskCreateService {
  async execute({ id, title, description }: ITaskCreate): Promise<any> {
    const userRepository = AppDataSource.getRepository(User);
    const taskRepository = AppDataSource.getRepository(Task);

    const user = await userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const task = taskRepository.create({ user, title, description });
    return await taskRepository.save(task);
  }
}
