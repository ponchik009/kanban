import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import { kanbanSliceReducer } from "./KanbanSlice";
import { kanbanListSliceReducer } from "./KanbanListSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      Kanban: kanbanSliceReducer,
      KanbanList: kanbanListSliceReducer,
    },
  });
}

export const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;
