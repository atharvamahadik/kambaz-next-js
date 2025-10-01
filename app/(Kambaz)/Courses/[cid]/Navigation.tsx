import Link from "next/link";

export default function CourseNavigation() {
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      <Link
        href="/Courses/CS5610/Home"
        id="wd-course-home-link"
        className="list-group-item active border-0"
      >
        Home
      </Link>
      <Link
        href="/Courses/CS5610/Modules"
        id="wd-course-modules-link"
        className="list-group-item text-danger border-0"
      >
        Modules
      </Link>
      <Link
        href="/Courses/CS5610/Piazza"
        id="wd-course-piazza-link"
        className="list-group-item text-danger border-0"
      >
        Piazza
      </Link>
      <Link
        href="/Courses/CS5610/Zoom"
        id="wd-course-zoom-link"
        className="list-group-item text-danger border-0"
      >
        Zoom
      </Link>
      <Link
        href="/Courses/CS5610/Assignments"
        id="wd-course-assignments-link"
        className="list-group-item text-danger border-0"
      >
        Assignments
      </Link>
      <Link
        href="/Courses/CS5610/Quizzes"
        id="wd-course-quizzes-link"
        className="list-group-item text-danger border-0"
      >
        Quizzes
      </Link>
      <Link
        href="/Courses/CS5610/Grades"
        id="wd-course-grades-link"
        className="list-group-item text-danger border-0"
      >
        Grades
      </Link>
      <Link
        href="/Courses/CS5610/People/Table"
        id="wd-course-people-link"
        className="list-group-item text-danger border-0"
      >
        People
      </Link>
    </div>
  );
}
