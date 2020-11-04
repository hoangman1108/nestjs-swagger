import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from '../../authentication/entities/auth.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dbo';
import { TaskStatusValidationPipe } from '../../common/pipes/task-status-validation.pipe';
import { TaskStatus } from './enum/task-status.enum';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';
@ApiTags('Task')
@Controller('tasks')
@ApiSecurity('authorization')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) { }

  @Get()
  async getTasks(
    @Query() filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ):Promise<Task[]> {
    return this.tasksService.getTasks(filterDto, user);
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto, @GetUser() user:User,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Get('/:id')
  getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status, user);
  }

  @Delete('/:id')
  deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.tasksService.deleteTask(id, user);
  }
}
