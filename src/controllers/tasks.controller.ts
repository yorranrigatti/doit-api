import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import TaskCreateService from "../services/tasks/taskCreate.service";
import TaskDeleteService from "../services/tasks/taskDelete.service";
import TaskListService from "../services/tasks/taskList.service";

export default class TaskController {
  static async store(req: Request, res: Response) {
    const { id } = req.params;
    const { title, description } = req.body;

    const createTask = new TaskCreateService();
    const task = await createTask.execute({
      id,
      title,
      description,
    });

    const returnedTask = {
      id: task.id,
      title: task.title,
      description: task.description,
      user: {
        id: task.user.id,
        name: task.user.name,
        email: task.user.email,
      },
    };

    return res.status(201).json({
      message: "Task created successfully",
      data: instanceToPlain(returnedTask),
    });
  }

  static async index(req: Request, res: Response) {
    const { id } = req.params;
    const per_page = req.query.per_page as string;
    const page = req.query.page as string;
    const tasksList = new TaskListService();
    const tasks = await tasksList.execute(id);
    return res.json(instanceToPlain(tasks));
  }

  static async delete(req: Request, res: Response) {
    const { id, task_id } = req.params;
    const deleteTask = new TaskDeleteService();
    await deleteTask.execute({ id, task_id });
    return res.status(204).json({ message: "Task deleted successfully" });
  }
}
