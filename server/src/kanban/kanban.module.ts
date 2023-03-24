import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { KanbanService } from './kanban.service';
import { KanbanController } from './kanban.controller';
import { Kanban } from './entities/kanban.entity';
import { TaskModule } from 'src/task/task.module';
import { KanbanColumnModule } from 'src/kanban-column/kanban-column.module';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Kanban]),
    forwardRef(() => TaskModule),
    forwardRef(() => KanbanColumnModule),
    FileModule,
  ],
  controllers: [KanbanController],
  providers: [KanbanService],
  exports: [KanbanService],
})
export class KanbanModule {}
