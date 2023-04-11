export type TaskType = {
  id: string;
  name: string;
  desctiption: string;
  chilKanban: KanbanType | null;
  column: ColumnType;
};

export type ColumnType = {
  id: string;
  name: string;
  color: string;
  order: number;
  isInitial: boolean;
};

export type ColumnWithTasksType = ColumnType & {
  tasks: TaskType[];
};

export type KanbanType = {
  id: string;
  name: string;
  avatar: string;
  parentTask: TaskType;
};

export type KanbanWithColumnsType = KanbanType & {
  columns: ColumnWithTasksType[];
};
