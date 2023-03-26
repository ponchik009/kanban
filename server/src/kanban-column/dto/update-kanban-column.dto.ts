import { PartialType } from '@nestjs/mapped-types';
import { CreateKanbanColumnDto } from './create-kanban-column.dto';

export class UpdateKanbanColumnDto extends PartialType(CreateKanbanColumnDto) {
  name?: string;
  order?: number;
  color?: string;
  isInitial?: boolean;
}
