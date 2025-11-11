import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

interface EnrollmentsState {
  enrollments: Enrollment[];
}

const initialState: EnrollmentsState = {
  enrollments: [],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action: PayloadAction<Enrollment[]>) => {
      state.enrollments = action.payload;
    },
    enrollUser: (state, action: PayloadAction<{ userId: string; courseId: string }>) => {
      const { userId, courseId } = action.payload;
      const exists = state.enrollments.find(
        (e) => e.user === userId && e.course === courseId
      );
      if (!exists) {
        state.enrollments.push({ _id: crypto.randomUUID(), user: userId, course: courseId });
      }
    },
    unenrollUser: (state, action: PayloadAction<{ userId: string; courseId: string }>) => {
      const { userId, courseId } = action.payload;
      state.enrollments = state.enrollments.filter(
        (e) => !(e.user === userId && e.course === courseId)
      );
    },
  },
});

export const { setEnrollments, enrollUser, unenrollUser } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
