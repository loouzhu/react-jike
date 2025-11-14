import { configureStore } from "@reduxjs/toolkit";
import jikeReducer from "../features/jikeSlice";

export default configureStore({
  reducer: {
    jike: jikeReducer,
  },
});