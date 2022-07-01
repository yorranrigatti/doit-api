export interface IUserCreate {
  name: string;
  email: string;
  password: string;
}

export interface IUserCreateReturn {
  id: string;
  name: string;
  email: string;
  password?: string;
  created_at: Date;
  updated_at: Date;
}
