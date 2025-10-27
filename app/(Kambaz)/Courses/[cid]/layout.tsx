"use client";
import { ReactNode, useState } from "react";
import CourseNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useParams, redirect } from "next/navigation";
import Breadcrumb from "./Breadcrumb";
import Link from "next/link";

interface Course {
  _id: string;
  name: string;
}
interface User {
  _id: string;
  username: string;
  role: string;
}
interface Enrollment {
  _id: string;
  user: string;
  course: string;
}
interface RootState {
  coursesReducer: { courses: Course[] };
  accountReducer: { currentUser: User | null };
  enrollmentsReducer: { enrollments: Enrollment[] };
}

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams();
  const [isNavVisible, setIsNavVisible] = useState(true);

  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);

  if (!currentUser) {
    redirect("/Kambaz/Account/Signin");
    return null;
  }

  const isEnrolled = enrollments.some(
    (e: Enrollment) => e.user === currentUser._id && e.course === cid
  );

  if (!isEnrolled) {
    return (
      <div className="p-4">
        <h1>Access Denied</h1>
        <p>You are not enrolled in this course.</p>
        <Link href="/Kambaz/Dashboard" className="btn btn-primary">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const course = courses.find((course: Course) => course._id === cid);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify
          className="me-4 fs-4 mb-1"
          style={{ cursor: "pointer" }}
          onClick={() => setIsNavVisible(!isNavVisible)}
        />
        <Breadcrumb course={course} />
      </h2>
      <hr />
      <div className="d-flex">
        {isNavVisible && (
          <div className="d-none d-md-block">
            <CourseNavigation />
          </div>
        )}
        <div className="flex-fill"> {children} </div>
      </div>
    </div>
  );
}