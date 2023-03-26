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
    let kanbanColumn = await this.kanbanColumnService.findOne(
      createTaskDto.columnId,
    );

    if (!kanbanColumn.isInitial) {
      throw new HttpException(
        'Колонка не является начальной',
        HttpStatus.BAD_REQUEST,
      );
    }

    let kanban = createTaskDto.childKanbanId
      ? await this.kanbanService.findOne(createTaskDto.childKanbanId)
      : null;

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
    const promise = Promise.all([
      this.findOne(id),
      this.kanbanColumnService.findOne(updateTaskDto.columnId),
    ]);
    let [task, column] = await promise;

    return await this.taskRepo.save({ ...task, column });
  }

  remove(id: string) {
    return `This action removes a #${id} task`;
  }
}
