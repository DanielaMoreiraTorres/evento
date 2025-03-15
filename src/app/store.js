import { configureStore } from "@reduxjs/toolkit";
import { eventosSlice } from "../feature/eventosSlice";

export const store = configureStore({
  reducer: {
    eventos: eventosSlice.reducer,
  },
});
