import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from "uuid";
import { CreateTaskDto, TaskStatusDto } from './dto/create-task.dto';
@Injectable()
export class TasksService {
  private tasks = [];
  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find(task => task.id === id);
    if(!found) {
      throw new NotFoundException(`user have id ${id} not found`);
    }

    return found;
  }

  deleteTask(id: string): void {
    this.getTaskById(id);
    this.tasks.filter(task => task.id !== id);
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,

    };
    this.tasks.push(task);
    return task;
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
