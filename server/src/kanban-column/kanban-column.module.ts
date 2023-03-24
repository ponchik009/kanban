import { forwardRef, Module } from '@nestjs/common';
import { KanbanColumnService } from './kanban-column.service';
import { KanbanColumnController } from './kanban-column.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KanbanColumn } from './entities/kanban-column.entity';
import { KanbanModule } from 'src/kanban/kanban.module';
import { TaskModule } from 'src/task/task.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([KanbanColumn]),
    forwardRef(() => KanbanModule),
    forwardRef(() => TaskModule),
  ],
  controllers: [KanbanColumnController],
  providers: [KanbanColumnService],
  exports: [KanbanColumnService],
})
export class KanbanColumnModule {}
