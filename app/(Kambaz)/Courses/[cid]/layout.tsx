"use client";
import { ReactNode, useState } from "react";
import CourseNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useParams, redirect } from "next/navigation"; // 1. Import redirect
import Breadcrumb from "./Breadcrumb";
import Link from "next/link"; // 2. Import Link

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams();

  // --- Start of New Security Logic ---

  // 3. Get all the state we need for validation
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector(
    (state: any) => state.enrollmentsReducer
  );

  // 4. CHECK 1: Is anyone logged in?
  if (!currentUser) {
    // Adjust this path to your actual signin page
    redirect("/Kambaz/Account/Signin"); 
  }

  // 5. CHECK 2: Is the logged-in user enrolled in this course?
  const isEnrolled = enrollments.some(
    (e: any) => e.user === currentUser._id && e.course === cid
  );

  // 6. If not enrolled, block access and show a message
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
  // --- End of New Security Logic ---

  // If the user IS enrolled, the component continues normally.
  const course = courses.find((course: any) => course._id === cid);
  
  // Your existing sidebar toggle state
  const [isNavVisible, setIsNavVisible] = useState(true);

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