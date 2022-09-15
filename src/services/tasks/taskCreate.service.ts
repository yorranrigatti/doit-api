import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError";
import { ITaskCreate } from "../../interfaces/task.interface";
import Task from "../../models/task.model";
import User from "../../models/user.model";

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
