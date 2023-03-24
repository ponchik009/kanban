import { forwardRef, Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskComment } from './entities/task-comment.entity';
import { Task } from './entities/task.entity';
import { KanbanModule } from 'src/kanban/kanban.module';
import { KanbanColumnModule } from 'src/kanban-column/kanban-column.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, TaskComment]),
    forwardRef(() => KanbanModule),
    forwardRef(() => KanbanColumnModule),
  ],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
