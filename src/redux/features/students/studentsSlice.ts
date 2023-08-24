import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Student } from "../../../model";
import { RootState } from "../../store";

const studentsAdapter = createEntityAdapter<Student>({
  sortComparer: (a, b) => a.id - b.id,
});

const studentsSlice = createSlice({
  name: "students",
  initialState: studentsAdapter.getInitialState({
    studentsList: [] as Student[],
  }),
  reducers: {},
});

export const StudentsReducer = studentsSlice.reducer;

export const {
  selectById: selectStudentById,
  selectAll: selectAllStudents,
  selectIds: selectStudentsIds,
} = studentsAdapter.getSelectors((state: RootState) => state.students);
