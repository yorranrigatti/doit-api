import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError";
import { ITaskDelete } from "../../interfaces/task.interface";
import Task from "../../models/task.model";

export default class TaskDeleteService {
  async execute({ id, task_id }: ITaskDelete) {
    const taskRepository = AppDataSource.getRepository(Task);

    if (
      !task_id.match(
        /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
      )
    ) {
      throw new AppError("The id informed is not valid");
    }

    const task = await taskRepository.findOne({ where: { id } });

    if (!task) {
      throw new AppError("Task not found", 404);
    }

    await taskRepository.delete(task.id);
    return true;
  }
}
