import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const USERS_API = `${HTTP_SERVER}/api/users`;
const ENROLLMENTS_API = `${HTTP_SERVER}/api/enrollments`;

export const enrollUserInCourse = async (userId: string, courseId: string) => {
  await axiosWithCredentials.post(`${USERS_API}/${userId}/courses/${courseId}/enroll`);
};

export const unenrollUserFromCourse = async (userId: string, courseId: string) => {
  await axiosWithCredentials.delete(`${USERS_API}/${userId}/courses/${courseId}/unenroll`);
};

export const findEnrollmentsForUser = async (userId: string) => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}/${userId}/enrollments`);
  return data;
};

export const findAllEnrollments = async () => {
  const { data } = await axiosWithCredentials.get(ENROLLMENTS_API);
  return data;
};
