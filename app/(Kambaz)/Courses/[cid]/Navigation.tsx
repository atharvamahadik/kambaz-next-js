import Link from "next/link";

export default function CourseNavigation() {
    return (
        <div id="wd-courses-navigation">
            <Link href="/Courses/CS5610/Home" id="wd-course-home-link">Home</Link><br/>
            <Link href="/Courses/CS5610/Modules" id="wd-course-modules-link">Modules</Link><br/>
            <Link href="/Courses/CS5610/Piazza" id="wd-course-piazza-link">Piazza</Link><br/>
            <Link href="/Courses/CS5610/Zoom" id="wd-course-zoom-link">Zoom</Link><br/>
            <Link href="/Courses/CS5610/Assignments" id="wd-course-assignments-link">Assignments</Link><br/>
            <Link href="/Courses/CS5610/Quizzes" id="wd-course-quizzes-link">Quizzes</Link><br/>
            <Link href="/Courses/CS5610/Grades" id="wd-course-grades-link">Grades</Link><br/>
            <Link href="/Courses/CS5610/People" id="wd-course-people-link">People</Link><br/>
        </div>
    )
}