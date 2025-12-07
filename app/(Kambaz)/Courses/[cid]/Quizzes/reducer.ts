import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface Question {
  _id: string;
  title: string;
  type: "multiple-choice" | "true-false" | "fill-in-blank";
  points: number;
  question: string;
  choices?: { text: string; isCorrect: boolean }[];
  correctAnswer?: string;
  possibleAnswers?: string[];
}

interface Quiz {
  _id: string;
  title: string;
  description: string;
  course: string;
  quizType: string;
  points: number;
  assignmentGroup: string;
  shuffleAnswers: boolean;
  timeLimit: number;
  multipleAttempts: boolean;
  howManyAttempts: number;
  showCorrectAnswers: string;
  accessCode: string;
  oneQuestionAtTime: boolean;
  webcamRequired: boolean;
  lockQuestionsAfterAnswering: boolean;
  dueDate: string;
  availableDate: string;
  untilDate: string;
  published: boolean;
  questions: Question[];
}

interface QuizzesState {
  quizzes: Quiz[];
}

const initialState: QuizzesState = {
  quizzes: [],
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action: PayloadAction<Quiz[]>) => {
      state.quizzes = action.payload;
    },
    addQuiz: (state, action: PayloadAction<{ title: string; course: string }>) => {
      const quizData = action.payload;
      const newQuiz: Quiz = {
        _id: uuidv4(),
        title: quizData.title,
        description: "",
        course: quizData.course,
        quizType: "Graded Quiz",
        points: 0,
        assignmentGroup: "Quizzes",
        shuffleAnswers: true,
        timeLimit: 20,
        multipleAttempts: false,
        howManyAttempts: 1,
        showCorrectAnswers: "",
        accessCode: "",
        oneQuestionAtTime: true,
        webcamRequired: false,
        lockQuestionsAfterAnswering: false,
        dueDate: "",
        availableDate: "",
        untilDate: "",
        published: false,
        questions: [],
      };
      state.quizzes.push(newQuiz);
    },
    deleteQuiz: (state, action: PayloadAction<string>) => {
      const quizId = action.payload;
      state.quizzes = state.quizzes.filter((q: Quiz) => q._id !== quizId);
    },
    updateQuiz: (state, action: PayloadAction<Quiz>) => {
      const quizData = action.payload;
      state.quizzes = state.quizzes.map((q: Quiz) =>
        q._id === quizData._id ? quizData : q
      );
    },
    togglePublishQuiz: (state, action: PayloadAction<string>) => {
      const quizId = action.payload;
      state.quizzes = state.quizzes.map((q: Quiz) =>
        q._id === quizId ? { ...q, published: !q.published } : q
      );
    },
  },
});

export const { 
  setQuizzes, 
  addQuiz, 
  deleteQuiz, 
  updateQuiz,
  togglePublishQuiz 
} = quizzesSlice.actions;

export default quizzesSlice.reducer;