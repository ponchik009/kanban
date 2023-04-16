import {
  createAsyncThunk,
  createSlice,
  current,
  PayloadAction,
} from "@reduxjs/toolkit";
import { DraggableLocation } from "react-beautiful-dnd";

import type { AppState } from "@/store";
import { KanbanWithColumnsType, LoadingType, UpdateTaskDto } from "@/types";
import { KanbanApi } from "@/api";
import { TaskApi } from "@/api/taskApi";

export interface KanbanState {
  kanban: KanbanWithColumnsType | null;
  status: LoadingType;
}

const initialState: KanbanState = {
  kanban: null,
  status: "idle",
};

export const fetchKanban = createAsyncThunk(
  "Kanban/fetchKanban",
  async (id: string) => {
    return KanbanApi.getKanbanBoard(id);
  }
);

export const updateTaskStatus = createAsyncThunk(
  "Kanban/updateTaskStatus",
  async (
    data: {
      source: DraggableLocation;
      destination: DraggableLocation;
    },
    { getState, dispatch }
  ) => {
    const { source, destination } = data;
    const state = (getState() as AppState).Kanban;

    const kanban = state.kanban;
    // moving tasks in same column
    const updated = [...kanban!.columns];
    const sourceColumnIndex = updated.findIndex(
      ({ id }) => id === source.droppableId
    );
    const [destinationColumn] = updated.filter(
      ({ id }) => id === destination.droppableId
    );

    const taskId = updated[sourceColumnIndex].tasks[source.index].id;

    const sourceColumnWithFilteredTasks = {
      ...updated[sourceColumnIndex],
      tasks: updated[sourceColumnIndex].tasks.filter(
        (t, i) => i !== source.index
      ),
    };
    updated.splice(sourceColumnIndex, 1, sourceColumnWithFilteredTasks);
    dispatch(setKanban({ ...state.kanban!, columns: updated }));

    return TaskApi.moveTask(taskId, {
      columnId: destinationColumn.id,
    });
  }
);

export const kanbanSlice = createSlice({
  name: "Kanban",
  initialState,
  reducers: {
    setKanban: (state, action: PayloadAction<KanbanWithColumnsType | null>) => {
      state.kanban = action.payload;
    },
    moveToSameColumn: (
      state,
      action: PayloadAction<{
        source: DraggableLocation;
        destination: DraggableLocation;
      }>
    ) => {
      const { source, destination } = action.payload;
      const kanban = state.kanban;
      // moving tasks in same column
      const updated = [...kanban!.columns];
      // isolate the row of the column we want to adjust
      const [column] = updated.filter(({ id }) => id === source.droppableId);
      const tasks = column.tasks;
      // remove the source item
      const [removed] = tasks.splice(source.index, 1);
      // insert the source item at the new colIndex
      tasks.splice(destination.index, 0, removed);

      state.kanban!.columns = updated;
    },
    moveColumn: (
      state,
      action: PayloadAction<{
        source: DraggableLocation;
        destination: DraggableLocation;
      }>
    ) => {
      const { source, destination } = action.payload;
      const kanban = state.kanban;
      // moving tasks in same column
      const updated = [...kanban!.columns];
      // remove source column
      const [removed] = updated.splice(source.index, 1);
      // insert source column at new destination
      updated.splice(destination.index, 0, removed);

      state.kanban!.columns = updated;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchKanban.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchKanban.fulfilled, (state, action) => {
        state.status = "idle";
        state.kanban = action.payload;
      })
      .addCase(updateTaskStatus.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        state.status = "idle";

        const { destination } = action.meta.arg;

        const [destinationColumn] = state.kanban!.columns.filter(
          ({ id }) => id === destination.droppableId
        );

        // insert the source item at the new colIndex
        destinationColumn.tasks.splice(destination.index, 0, action.payload);
      });
  },
});

export const {
  setKanban,
  moveToSameColumn,

  moveColumn,
} = kanbanSlice.actions;

export const selectKanban = (state: AppState) => state.Kanban.kanban;
export const selectKanbanColumns = (state: AppState) =>
  state.Kanban.kanban?.columns;

export const kanbanSliceReducer = kanbanSlice.reducer;
