import { KanbanColumn } from 'src/kanban-column/entities/kanban-column.entity';
import { BaseEntity } from 'src/model/base.entity';
import { Task } from 'src/task/entities/task.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@Entity({ name: 'kanban' })
export class Kanban extends BaseEntity {
  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 300, default: 'img/default.jpg' })
  avatar: string;

  @OneToMany(() => KanbanColumn, (kanbanColumn) => kanbanColumn.kanban)
  columns: KanbanColumn[];

  @OneToOne(() => Task, (task) => task.childKanban, { nullable: true })
  @JoinColumn()
  parentTask: Task | null;
}
