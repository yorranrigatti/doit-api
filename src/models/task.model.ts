import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import User from "./user.model";

@Entity("tasks")
class Task {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne((type) => User, (user) => user.tasks)
  @JoinTable()
  user: User;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default Task;
