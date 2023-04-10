import { v4 } from "uuid";

import { TaskBoardType } from "@/types";

export class KanbanApi {
  static data: TaskBoardType = {
    columns: [
      {
        id: v4(),
        title: "col1",
        tasks: [
          { content: "item1", id: v4() },
          { content: "item2", id: v4() },
          { content: "item3", id: v4() },
        ],
      },
      {
        id: v4(),
        title: "col2",
        tasks: [
          { content: "item1", id: v4() },
          { content: "item2", id: v4() },
          { content: "item3", id: v4() },
        ],
      },
      {
        id: v4(),
        title: "col3",
        tasks: [
          { content: "item1", id: v4() },
          { content: "item2", id: v4() },
          { content: "item3", id: v4() },
        ],
      },
      {
        id: v4(),
        title: "col4",
        tasks: [
          { content: "item1", id: v4() },
          { content: "item2", id: v4() },
          { content: "item3", id: v4() },
        ],
      },
      {
        id: v4(),
        title: "col4",
        tasks: [
          { content: "item1", id: v4() },
          { content: "item2", id: v4() },
          { content: "item3", id: v4() },
        ],
      },
      {
        id: v4(),
        title: "col4",
        tasks: [
          { content: "item1", id: v4() },
          { content: "item2", id: v4() },
          { content: "item3", id: v4() },
        ],
      },
      {
        id: v4(),
        title: "col4",
        tasks: [
          { content: "item1", id: v4() },
          { content: "item2", id: v4() },
          { content: "item3", id: v4() },
        ],
      },
      {
        id: v4(),
        title: "col4",
        tasks: [
          { content: "item1", id: v4() },
          { content: "item2", id: v4() },
          { content: "item3", id: v4() },
        ],
      },
      {
        id: v4(),
        title: "col4",
        tasks: [
          { content: "item1", id: v4() },
          { content: "item2", id: v4() },
          { content: "item3", id: v4() },
        ],
      },
      {
        id: v4(),
        title: "col4",
        tasks: [
          { content: "item1", id: v4() },
          { content: "item2", id: v4() },
          { content: "item3", id: v4() },
        ],
      },
    ],
  };

  static async getKanbanBoard(): Promise<TaskBoardType> {
    return new Promise((resolve) => resolve(KanbanApi.data));
  }
}
