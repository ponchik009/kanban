import { ColumnWithTasksType, UpdateColumnDto } from "@/types";
import { axios } from "./Api";

export class KanbanColumnApi {
  static async updateColumn(
    id: string,
    dto: UpdateColumnDto
  ): Promise<ColumnWithTasksType[]> {
    return (
      await axios.patch<ColumnWithTasksType[]>(`/kanban-column/${id}`, dto)
    ).data;
  }
}
