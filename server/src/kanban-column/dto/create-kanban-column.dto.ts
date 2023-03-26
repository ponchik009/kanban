export class CreateKanbanColumnDto {
  name: string;
  kanbanId: string;
  order: number;
  color?: string;
  isInitial?: boolean;
}
