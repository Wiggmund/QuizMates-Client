import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "./features/api/apiSlice";
import { QuizesReducer, StudentsReducer } from "./features";

const store = configureStore({
  reducer: {
    students: StudentsReducer,
    quizes: QuizesReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
