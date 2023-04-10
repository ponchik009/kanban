export type TaskType = {
  id: string;
  content: string;
};

export type ColumnType = {
  id: string;
  title: string;
  tasks: TaskType[];
};

export type TaskBoardType = {
  columns: ColumnType[];
};
