import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { AppState, AppThunk } from "@/store";
import { KanbanWithColumnsType, LoadingType } from "@/types";
import axios from "axios";
import { DraggableLocation } from "react-beautiful-dnd";
import { KanbanApi } from "@/api";

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
    moveToDifferentColumn: (
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
      const [sourceColumn] = updated.filter(
        ({ id }) => id === source.droppableId
      );
      const [destinationColumn] = updated.filter(
        ({ id }) => id === destination.droppableId
      );

      // extract the tasks from the columnn
      const sourceRow = sourceColumn.tasks;
      const destinationRow = destinationColumn.tasks;

      // remove the source item
      const [removed] = sourceRow.splice(source.index, 1);
      // insert the source item at the new colIndex
      destinationRow.splice(destination.index, 0, removed);

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
      });
  },
});

export const {
  setKanban,
  moveToSameColumn,
  moveToDifferentColumn,
  moveColumn,
} = kanbanSlice.actions;

export const selectKanban = (state: AppState) => state.Kanban.kanban;
export const selectKanbanColumns = (state: AppState) =>
  state.Kanban.kanban?.columns;

export const kanbanSliceReducer = kanbanSlice.reducer;
