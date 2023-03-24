import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from 'src/model/base.entity';
import { Task } from './task.entity';

@Entity({ name: 'task_comment' })
export class TaskComment extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  comment: string;

  @ManyToOne(() => Task, (task) => task.comments)
  task: Task;
}
