"use client";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
// 1. Import new enrollment actions
import { enrollUser, unenrollUser } from "./enrollmentsReducer";
import { useState } from "react";
import Link from "next/link";
// 2. DO NOT import db.enrollments. We get it from Redux now.
// import * as db from "../Database"; // We don't need 'db' anymore
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  FormControl,
  Row,
} from "react-bootstrap";

export default function Dashboard() {
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  // 3. Get enrollments from REDUX, not the static file
  const { enrollments } = useSelector(
    (state: any) => state.enrollmentsReducer
  );
  
  const dispatch = useDispatch();

  // State for the new course form
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/Khoury.jpg",
    description: "New Description",
  });
  
  // 4. Add state for the "Show All Courses" toggle
  const [showAllCourses, setShowAllCourses] = useState(false);

  if (!currentUser) {
    return <h1>Please sign in to view this page.</h1>;
  }

  // 5. Helper function to check if the current user is enrolled in a specific course
  const isEnrolled = (courseId: string) => {
    return enrollments.some(
      (e: any) => e.user === currentUser._id && e.course === courseId
    );
  };

  // 6. Get the list of courses the user is *actually* enrolled in
  const userEnrolledCourses = courses.filter((c: any) => isEnrolled(c._id));

  // 7. Determine which list to display based on the toggle
  const displayedCourses = showAllCourses ? courses : userEnrolledCourses;

  return (
    <div id="wd-dashboard">
      <div className="d-flex justify-content-between align-items-center">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        {/* 8. Add the new blue "Enrollments" button with toggle logic */}
        <Button 
          variant="primary" 
          onClick={() => setShowAllCourses(!showAllCourses)}
        >
          {showAllCourses ? "Show My Enrolled Courses" : "Show All Courses"}
        </Button>
      </div>
      <hr />

      {/* 9. Only show the "New Course" form for Faculty */}
      {currentUser.role === 'FACULTY' && (
        <>
          <h5>
            New Course
            <Button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={() => dispatch(addNewCourse(course))}
            >
              Add
            </Button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={() => dispatch(updateCourse(course))}
              id="wd-update-course-click"
            >
              Update{" "}
            </button>
          </h5>
          <br />
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            as="textarea"
            value={course.description}
            rows={3}
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />
          <hr />
        </>
      )}
      
      {/* 10. Update the count and title to reflect the *displayed* courses */}
      <h2 id="wd-dashboard-published">
        {showAllCourses ? "All Courses" : "My Enrolled Courses"} ({displayedCourses.length})
      </h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4" style={{ rowGap: "35px" }}>
          {/* 11. Map over the *displayed* courses */}
          {displayedCourses.map((course: any) => {
            // 12. Check enrollment status for *this* specific course
            const enrolled = isEnrolled(course._id);
            
            return (
              <Col
                key={course._id}
                className="wd-dashboard-course"
                style={{ width: "300px" }}
              >
                <Card>
                  {/* 13. Protect the route LINK: only allow navigation if enrolled */}
                  <Link
                    href={enrolled ? `/Courses/${course._id}/Home` : '#'}
                    onClick={(e) => {
                      if (!enrolled) {
                        e.preventDefault();
                        alert("You must be enrolled in this course to view it.");
                      }
                      // No preventDefault if enrolled, so link navigation proceeds
                    }}
                    title={!enrolled ? "You are not enrolled in this course" : course.name}
                    style={!enrolled ? { cursor: "not-allowed" } : {}}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <CardImg
                      src={course.image}
                      variant="top"
                      width="100%"
                      height={160}
                      style={!enrolled ? { opacity: 0.6 } : {}}
                    />
                    {/* First CardBody contains original buttons */}
                    <CardBody>
                      <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {course.name}
                      </CardTitle>
                      <CardText
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        {course.description}
                      </CardText>

                      {/* 14. Original GO button structure - disabled if not enrolled */}
                      <Button variant="primary" disabled={!enrolled}>Go</Button>

                      {/* 15. Only show Edit/Delete for Faculty, ensure they preventDefault */}
                      {currentUser.role === 'FACULTY' && (
                        <>
                          <button
                            onClick={(event) => {
                              event.preventDefault(); // Stop Link navigation
                              dispatch(deleteCourse(course._id));
                            }}
                            className="btn btn-danger float-end"
                            id="wd-delete-course-click"
                          >
                            Delete
                          </button>
                          <button
                            id="wd-edit-course-click"
                            onClick={(event) => {
                              event.preventDefault(); // Stop Link navigation
                              setCourse(course);
                            }}
                            className="btn btn-warning me-2 float-end"
                          >
                            Edit
                          </button>
                        </>
                      )}
                    </CardBody>
                  </Link> {/* End of Link wrapper */}

                  {/* 16. Add conditional Enroll/Unenroll buttons */}
                  {/* These buttons are *outside* the Link wrapper to avoid navigation */}
                  {/* Only show these when "Show All Courses" is active */}
                  {showAllCourses && (
                    <CardBody className="pt-0"> {/* pt-0 removes extra padding */}
                        {enrolled ? (
                          <Button 
                            variant="danger" 
                            className="w-100"
                            onClick={() => dispatch(unenrollUser({ userId: currentUser._id, courseId: course._id }))}
                          >
                            Unenroll
                          </Button>
                        ) : (
                          <Button 
                            variant="success" 
                            className="w-100"
                            onClick={() => dispatch(enrollUser({ userId: currentUser._id, courseId: course._id }))}
                          >
                            Enroll
                          </Button>
                        )}
                    </CardBody>
                   )}

                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}