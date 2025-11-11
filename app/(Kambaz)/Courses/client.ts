import axios from "axios";
import * as enrollmentsClient from "../Courses/Enrollments/client";

const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const USERS_API = `${HTTP_SERVER}/api/users`;
const MODULES_API = `${HTTP_SERVER}/api/modules`;
const ASSIGNMENTS_API = `${HTTP_SERVER}/api`;

export const fetchAllCourses = async () => {
  const { data } = await axios.get(COURSES_API);
  return data;
};
export const findMyCourses = async () => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}/current/courses`);
  return data;
};
export const createCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}/current/courses`, course);
  return data;
};
export const deleteCourse = async (id: string) => {
  const { data } = await axios.delete(`${COURSES_API}/${id}`);
  return data;
};
export const updateCourse = async (course: any) => {
  const { data } = await axios.put(`${COURSES_API}/${course._id}`, course);
  return data;
};
export const createModuleForCourse = async (courseId: string, module: any) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return response.data;
};
export const findModulesForCourse = async (courseId: string) => {
  const response = await axios
    .get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};
export const deleteModule = async (moduleId: string) => {
 const response = await axios.delete(`${MODULES_API}/${moduleId}`);
 return response.data;
};
export const updateModule = async (module: any) => {
  const { data } = await axios.put(`${MODULES_API}/${module._id}`, module);
  return data;
};
export const enrollUser = async (userId: string, courseId: string) => {
  await enrollmentsClient.enrollUserInCourse(userId, courseId);
};
export const unenrollUser = async (userId: string, courseId: string) => {
  await enrollmentsClient.unenrollUserFromCourse(userId, courseId);
};
export const getUserEnrollments = async (userId: string) => {
  return await enrollmentsClient.findEnrollmentsForUser(userId);
};
export const findAssignmentsForCourse = async (courseId: string) => {
  const response = await axios.get(`${ASSIGNMENTS_API}/courses/${courseId}/assignments`);
  return response.data;
};

export const createAssignmentForCourse = async (courseId: string, assignment: any) => {
  const response = await axios.post(
    `${ASSIGNMENTS_API}/courses/${courseId}/assignments`,
    assignment
  );
  return response.data;
};

export const deleteAssignment = async (assignmentId: string) => {
  const response = await axios.delete(`${ASSIGNMENTS_API}/assignments/${assignmentId}`);
  return response.data;
};

export const updateAssignment = async (assignmentId: string, assignmentUpdates: any) => {
  const response = await axios.put(
    `${ASSIGNMENTS_API}/assignments/${assignmentId}`,
    assignmentUpdates
  );
  return response.data;
};

