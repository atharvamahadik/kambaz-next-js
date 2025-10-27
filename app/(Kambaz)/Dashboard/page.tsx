"use client";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import { enrollUser, unenrollUser } from "./enrollmentsReducer";
import { useState } from "react";
import Link from "next/link";
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

interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  image: string;
  description: string;
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
  coursesReducer: {
    courses: Course[];
  };
  accountReducer: {
    currentUser: User | null;
  };
  enrollmentsReducer: {
    enrollments: Enrollment[];
  };
}

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { enrollments } = useSelector(
    (state: RootState) => state.enrollmentsReducer
  );
  
  const dispatch = useDispatch();

  const [course, setCourse] = useState<Course>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/Khoury.jpg",
    description: "New Description",
  });
  
  const [showAllCourses, setShowAllCourses] = useState(false);

  if (!currentUser) {
    return <h1>Please sign in to view this page.</h1>;
  }
  const isEnrolled = (courseId: string) => {
    return enrollments.some(
      (e: Enrollment) => e.user === currentUser._id && e.course === courseId
    );
  };
  const userEnrolledCourses = courses.filter((c: Course) => isEnrolled(c._id));

  const displayedCourses = showAllCourses ? courses : userEnrolledCourses;

  return (
    <div id="wd-dashboard">
      <div className="d-flex justify-content-between align-items-center">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        <Button 
          variant="primary" 
          onClick={() => setShowAllCourses(!showAllCourses)}
        >
          {showAllCourses ? "Show My Enrolled Courses" : "Show All Courses"}
        </Button>
      </div>
      <hr />
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
      
      <h2 id="wd-dashboard-published">
        {showAllCourses ? "All Courses" : "My Enrolled Courses"} ({displayedCourses.length})
      </h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4" style={{ rowGap: "35px" }}>
          {displayedCourses.map((course: Course) => {
            const enrolled = isEnrolled(course._id);
            
            return (
              <Col
                key={course._id}
                className="wd-dashboard-course"
                style={{ width: "300px" }}
              >
                <Card>
                  <Link
                    href={enrolled ? `/Courses/${course._id}/Home` : '#'}
                    onClick={(e) => {
                      if (!enrolled) {
                        e.preventDefault();
                        alert("You must be enrolled in this course to view it.");
                      }
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
                      <Button variant="primary" disabled={!enrolled}>Go</Button>
                      {currentUser.role === 'FACULTY' && (
                        <>
                          <button
                            onClick={(event) => {
                              event.preventDefault();
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
                              event.preventDefault();
                              setCourse(course);
                            }}
                            className="btn btn-warning me-2 float-end"
                          >
                            Edit
                          </button>
                        </>
                      )}
                    </CardBody>
                  </Link>
                  {showAllCourses && (
                    <CardBody className="pt-0">
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