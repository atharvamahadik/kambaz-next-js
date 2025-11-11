import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

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

interface AssignmentsState {
  assignments: Assignment[];
}

const initialState: AssignmentsState = {
  assignments: [],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },
    addAssignment: (state, action: PayloadAction<{ title: string; course: string }>) => {
      const assignmentData = action.payload;
      const newAssignment: Assignment = {
        _id: uuidv4(),
        title: assignmentData.title,
        description: "",
        course: assignmentData.course,
        points: 100,
        dueDate: "",
        availableStartDate: "",
        availableEndDate: "",
      };
      state.assignments.push(newAssignment);
    },
    deleteAssignment: (state, action: PayloadAction<string>) => {
      const assignmentId = action.payload;
      state.assignments = state.assignments.filter(
        (a: Assignment) => a._id !== assignmentId
      );
    },
    updateAssignment: (state, action: PayloadAction<Assignment>) => {
      const assignmentData = action.payload;
      state.assignments = state.assignments.map((a: Assignment) =>
        a._id === assignmentData._id ? assignmentData : a
      );
    },
  },
});

export const { 
  setAssignments, 
  addAssignment, 
  deleteAssignment, 
  updateAssignment 
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;