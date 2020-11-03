import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusValidationPipe } from './dto/pipes/task-status-validation.pipe';
import { Task, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';
import axios from 'axios';
@Controller('tasks')
@ApiTags('Task')
export class TasksController {
  constructor(private tasksService: TasksService) { }

  @Get()
  async getAllTasks(): Promise<Task[]> {
    const formBody = [];
    const input: any = {
      _UserID: 'GHT.DMO',
      _deviceID: '""',
      _deptID: '10-02',
      _CodeHotel: 'DLT',
      _FormName: 'FrmSalesTicket',
    };
    for (const property in input) {
      const encodedKey: string = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(input[property]);
      formBody.push(`${encodedKey}=${encodedValue}`);
    }
    const formBodyString = formBody.join('&');
    const config: any = {
      method: 'post',
      url: 'http://mght.ddns.net:7070/mPOS/POS.userinfo.asmx/UserRight',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: 'AspxAutoDetectCookieSupport=1',
      },
      data: formBodyString,
    };

    axios(config).then((response) => {
      const { data } = response;
     console.log(data);
    }).catch((error) => {
      throw new Error(error);
    });
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto
  ): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete()
  deleteTask(@Param('id') id: string): void {
    this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Task {
    console.log(status);
    return this.tasksService.updateTaskStatus(id, status);
  }
}
