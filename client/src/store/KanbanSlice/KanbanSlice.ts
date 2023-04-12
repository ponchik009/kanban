import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { AppState, AppThunk } from "@/store";
import { KanbanWithColumnsType, LoadingType } from "@/types";
import axios from "axios";

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
    const data = (
      await axios.get<KanbanWithColumnsType>(
        `http://localhost:8080/kanban/${id}`
      )
    ).data;

    return data;
  }
);

export const kanbanSlice = createSlice({
  name: "Kanban",
  initialState,
  reducers: {
    setKanban: (state, action: PayloadAction<KanbanWithColumnsType | null>) => {
      state.kanban = action.payload;
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

export const { setKanban } = kanbanSlice.actions;

export const selectKanban = (state: AppState) => state.Kanban.kanban;

export const kanbanSliceReducer = kanbanSlice.reducer;
