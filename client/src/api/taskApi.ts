import { TaskType, TaskTypeWithColumn, UpdateTaskDto } from "@/types";
import { axios } from "./Api";

export class TaskApi {
  static async moveTask(
    id: string,
    dto: UpdateTaskDto
  ): Promise<TaskTypeWithColumn> {
    return (await axios.patch<TaskTypeWithColumn>(`/task/${id}`, dto)).data;
  }
}
