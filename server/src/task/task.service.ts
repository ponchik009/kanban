import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { KanbanColumnService } from 'src/kanban-column/kanban-column.service';
import { KanbanService } from 'src/kanban/kanban.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
    @Inject(forwardRef(() => KanbanService))
    private kanbanService: KanbanService,
    @Inject(forwardRef(() => KanbanColumnService))
    private kanbanColumnService: KanbanColumnService,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    let kanbanColumn;
    try {
      kanbanColumn = await this.kanbanColumnService.findOne(
        createTaskDto.columnId,
      );
    } catch (e) {
      throw e;
    }

    if (!kanbanColumn.isInital) {
      throw new HttpException(
        'Колонка не является начальной',
        HttpStatus.BAD_REQUEST,
      );
    }

    let kanban;
    if (createTaskDto.childKanbanId) {
      try {
        kanban = await this.kanbanService.findOne(createTaskDto.childKanbanId);
      } catch (e) {
        throw e;
      }
    }

    const newTask = this.taskRepo.create(createTaskDto);
    if (kanban) {
      newTask.childKanban = kanban;
    }

    return await this.taskRepo.save({ ...newTask, column: kanbanColumn });
  }

  findAll() {
    return `This action returns all task`;
  }

  async findOne(id: string) {
    try {
      const task = await this.taskRepo.findOne({
        where: { id },
        relations: { childKanban: true, column: true },
      });

      if (!task) {
        throw new HttpException('Задача не найдена', HttpStatus.NOT_FOUND);
      }

      return task;
    } catch (e) {
      throw new HttpException('Задача не найдена', HttpStatus.NOT_FOUND);
    }
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    let task;
    let column;
    try {
      task = await this.findOne(id);
      column = await this.kanbanColumnService.findOne(updateTaskDto.columnId);
    } catch (e) {
      throw e;
    }

    return await this.taskRepo.save({ ...task, column });
  }

  remove(id: string) {
    return `This action removes a #${id} task`;
  }
}
