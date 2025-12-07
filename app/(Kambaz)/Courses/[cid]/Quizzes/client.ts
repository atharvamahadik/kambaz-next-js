import axios from "axios";

const QUIZZES_API = process.env.NEXT_PUBLIC_HTTP_SERVER 
  ? `${process.env.NEXT_PUBLIC_HTTP_SERVER}/api` 
  : "http://localhost:4000/api";

export const findQuizzesForCourse = async (courseId: string) => {
  const response = await axios.get(`${QUIZZES_API}/courses/${courseId}/quizzes`);
  return response.data;
};

export const findPublishedQuizzesForCourse = async (courseId: string) => {
  const response = await axios.get(`${QUIZZES_API}/courses/${courseId}/quizzes/published`);
  return response.data;
};

export const findQuizById = async (quizId: string) => {
  const response = await axios.get(`${QUIZZES_API}/quizzes/${quizId}`);
  return response.data;
};

export const createQuizForCourse = async (courseId: string, quiz: any) => {
  const response = await axios.post(`${QUIZZES_API}/courses/${courseId}/quizzes`, quiz);
  return response.data;
};

export const deleteQuiz = async (quizId: string) => {
  const response = await axios.delete(`${QUIZZES_API}/quizzes/${quizId}`);
  return response.data;
};

export const updateQuiz = async (quizId: string, quizUpdates: any) => {
  const response = await axios.put(`${QUIZZES_API}/quizzes/${quizId}`, quizUpdates);
  return response.data;
};

export const addQuestionToQuiz = async (quizId: string, question: any) => {
  const response = await axios.post(`${QUIZZES_API}/quizzes/${quizId}/questions`, question);
  return response.data;
};

export const updateQuestion = async (quizId: string, questionId: string, questionUpdates: any) => {
  const response = await axios.put(`${QUIZZES_API}/quizzes/${quizId}/questions/${questionId}`, questionUpdates);
  return response.data;
};

export const deleteQuestion = async (quizId: string, questionId: string) => {
  const response = await axios.delete(`${QUIZZES_API}/quizzes/${quizId}/questions/${questionId}`);
  return response.data;
};

export const submitQuizAttempt = async (quizId: string, userId: string, answers: any[]) => {
  const response = await axios.post(`${QUIZZES_API}/quizzes/${quizId}/attempts`, {
    userId,
    answers,
  });
  return response.data;
};

export const getAttemptsForUser = async (quizId: string, userId: string) => {
  const response = await axios.get(`${QUIZZES_API}/quizzes/${quizId}/attempts/${userId}`);
  return response.data;
};

export const getLatestAttempt = async (quizId: string, userId: string) => {
  const response = await axios.get(`${QUIZZES_API}/quizzes/${quizId}/attempts/${userId}/latest`);
  return response.data;
};

export const getAttemptCount = async (quizId: string, userId: string) => {
  const response = await axios.get(`${QUIZZES_API}/quizzes/${quizId}/attempts/${userId}/count`);
  return response.data;
};