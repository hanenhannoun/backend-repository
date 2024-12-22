import { Controller, Post, Body, Get, Param, Delete, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';
import { UpdateTaskDto } from './dto/update-task.dto';


@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService ) {}

  @Post()
  async createTask(@Body() taskCreateDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(taskCreateDto);
  }
  
  @Get()
  async findAll() {
    return this.taskService.findAll();
  }

  
  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.taskService.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.update(id, updateTaskDto);
  }
  
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.taskService.remove(id);
  }

}
