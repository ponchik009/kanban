import { Kanban } from 'src/kanban/entities/kanban.entity';
import { BaseEntity } from 'src/model/base.entity';
import { Task } from 'src/task/entities/task.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'kanban_column' })
export class KanbanColumn extends BaseEntity {
  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 9, default: '#fff' })
  color: string;

  @Column({ type: 'boolean', default: false })
  isInitial: boolean;

  @Column({ type: 'int', nullable: false })
  order: number;

  @ManyToOne(() => Kanban, (kanban) => kanban.columns, { nullable: false })
  kanban: Kanban;

  @OneToMany(() => Task, (task) => task.column)
  tasks: Task[];
}
