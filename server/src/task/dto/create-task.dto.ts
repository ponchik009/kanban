export class CreateTaskDto {
  name: string;
  description?: string;
  columnId: string;
  childKanbanId?: string;
}
