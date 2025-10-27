import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../../Database"; // Path is ../../Database if you're in Courses/Assignments/
import { v4 as uuidv4 } from "uuid";

// Define the Assignment type for better type safety
interface Assignment {
  _id: string;
  title: string;
  description: string;
  course: string;
  points: number;
  dueDate: string;
  availableStartDate: string;
  availableEndDate: string;
}

const initialState = {
  assignments: assignments as Assignment[],
  assignment: null as Assignment | null, // To hold a single assignment for editing
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload: assignment }) => {
      const newAssignment: Assignment = {
        _id: uuidv4(),
        ...assignment,
      };
      state.assignments = [...state.assignments, newAssignment];
    },
    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(
        (a) => a._id !== assignmentId
      );
    },
    updateAssignment: (state, { payload: assignment }) => {
      state.assignments = state.assignments.map((a) =>
        a._id === assignment._id ? assignment : a
      );
    },
    setAssignment: (state, { payload: assignment }) => {
      state.assignment = assignment;
    },
  },
});

export const {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  setAssignment,
} = assignmentsSlice.actions;
export default assignmentsSlice.reducer;