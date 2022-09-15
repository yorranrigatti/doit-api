export interface ITaskCreate {
  id: string;
  title: string;
  description: string;
}

export interface ITaskDelete {
  id: string;
  task_id: string;
}
