import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { KanbanModule } from './kanban/kanban.module';
import { KanbanColumnModule } from './kanban-column/kanban-column.module';
import { TaskModule } from './task/task.module';
import { Kanban } from './kanban/entities/kanban.entity';
import { KanbanColumn } from './kanban-column/entities/kanban-column.entity';
import { Task } from './task/entities/task.entity';
import { TaskComment } from './task/entities/task-comment.entity';
import { FileModule } from './file/file.module';

console.log(__dirname);

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'kanban',
      entities: [Kanban, KanbanColumn, Task, TaskComment],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    KanbanModule,
    KanbanColumnModule,
    TaskModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
