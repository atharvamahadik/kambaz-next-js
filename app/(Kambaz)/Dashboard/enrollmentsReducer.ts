import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../Database"; // Load initial data
import { v4 as uuidv4 } from "uuid";

interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

const initialState = {
  enrollments: enrollments as Enrollment[],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    // Action to enroll a user in a course
    enrollUser: (state, action) => {
      const { userId, courseId } = action.payload;
      const newEnrollment: Enrollment = {
        _id: uuidv4(), // Create a new unique ID
        user: userId,
        course: courseId,
      };
      state.enrollments.push(newEnrollment);
    },
    // Action to unenroll a user
    unenrollUser: (state, action) => {
      const { userId, courseId } = action.payload;
      state.enrollments = state.enrollments.filter(
        (e) => !(e.user === userId && e.course === courseId)
      );
    },
  },
});

export const { enrollUser, unenrollUser } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;