import { KanbanType, KanbanWithColumnsType } from "@/types";
import { axios } from "./Api";

export class KanbanApi {
  static async getKanbanList(): Promise<KanbanType[]> {
    return (await axios.get<KanbanType[]>("/kanban")).data;
  }

  static async getKanbanBoard(id: string): Promise<KanbanWithColumnsType> {
    return (await axios.get<KanbanWithColumnsType>("/kanban/" + id)).data;
  }
}
