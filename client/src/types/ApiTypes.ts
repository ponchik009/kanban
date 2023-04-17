export type UpdateTaskDto = {
  name?: string;
  description?: string;
  columnId: string;
  childKanbanId?: string;
};

export type UpdateColumnDto = {
  name?: string;
  order?: number;
  color?: string;
  isInitial?: boolean;
};
