import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { User } from 'src/users/entities/user.entity';
import { Category } from 'src/categories/entities/category.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async createTask(taskCreateDto: CreateTaskDto): Promise<Task> {
    const { categoryId, userId, ...taskData } = taskCreateDto;

    
    const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }

    
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    
    const task = this.taskRepository.create({
      ...taskData,
      category,
      user,
    });

    return this.taskRepository.save(task);
  }

 
   async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }
  

  
  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findById(id); 
    Object.assign(task, updateTaskDto); 
    return this.taskRepository.save(task);
  }

 
  async remove(id: number): Promise<void> {
    const task = await this.findById(id); 
    await this.taskRepository.remove(task);
  }


  
}
