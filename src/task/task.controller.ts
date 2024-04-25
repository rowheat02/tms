/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';

import { ApiQuery } from '@nestjs/swagger';
import { TaskService } from './task.service';
import { taskFilterDto } from './dto/taskfilter';
import { CreateTaskDto } from './dto/createtask';
import { updateTaskDto } from './dto/updatetask';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('')
  async createTask(@Body(ValidationPipe) CreateTaskDto: CreateTaskDto) {
    return this.taskService.createTask(CreateTaskDto);
  }

  @ApiQuery({ name: 'priority', required: false, type: Number })
  @ApiQuery({ name: 'status', required: false, type: String })
  @Get('')
  async getTasks(@Query(ValidationPipe) query: taskFilterDto) {
    return this.taskService.getTasks(query);
  }

  @Patch('/:id')
  async updateTask(
    @Param('id') id: string,
    @Body(ValidationPipe) data: updateTaskDto,
  ) {
    return this.taskService.updateTask(+id, data);
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(+id);
  }
}
