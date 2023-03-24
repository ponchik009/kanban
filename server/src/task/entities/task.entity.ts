import { KanbanColumn } from 'src/kanban-column/entities/kanban-column.entity';
import { Kanban } from 'src/kanban/entities/kanban.entity';
import { BaseEntity } from 'src/model/base.entity';
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { TaskComment } from './task-comment.entity';

@Entity({ name: 'task' })
export class Task extends BaseEntity {
  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 300, default: '' })
  description: string;

  @ManyToOne(() => KanbanColumn, (kanbanColumn) => kanbanColumn.tasks)
  column: KanbanColumn;

  @OneToOne(() => Kanban, (kanban) => kanban.parentTask, { nullable: true })
  childKanban: Kanban | null;

  @OneToMany(() => TaskComment, (comment) => comment.task)
  comments: Comment[];
}
