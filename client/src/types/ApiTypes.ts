export type UpdateTaskDto = {
  name?: string;
  description?: string;
  columnId: string;
  childKanbanId?: string;
};
