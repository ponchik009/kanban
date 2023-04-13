import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { AppState, AppThunk } from "@/store";
import { KanbanType, KanbanWithColumnsType, LoadingType } from "@/types";
import axios from "axios";
import { KanbanApi } from "@/api";

export interface KanbanListState {
  kanbanList: KanbanType[] | null;
  status: LoadingType;
}

const initialState: KanbanListState = {
  kanbanList: null,
  status: "idle",
};

export const fetchKanbanList = createAsyncThunk(
  "KanbanList/fetchKanbanList",
  async () => {
    return KanbanApi.getKanbanList();
  }
);

export const kanbanListSlice = createSlice({
  name: "KanbanList",
  initialState,
  reducers: {
    setKanbanList: (state, action: PayloadAction<KanbanType[] | null>) => {
      state.kanbanList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchKanbanList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchKanbanList.fulfilled, (state, action) => {
        state.status = "idle";
        state.kanbanList = action.payload;
      });
  },
});

export const { setKanbanList } = kanbanListSlice.actions;

// export const selectKanbanList = (state: AppState) => state..kanban;

export const kanbanListSliceReducer = kanbanListSlice.reducer;
