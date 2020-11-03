import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../task-status.enum';

export class CreateTaskDto{
  @ApiProperty()
  @IsNotEmpty()
  title:string;
  
  @ApiProperty() 
  @IsNotEmpty()
  description:string;
}

export class TaskStatusDto{
  @IsNotEmpty()
  @ApiProperty({enum: Object.keys(TaskStatus)})
  status: string;
}