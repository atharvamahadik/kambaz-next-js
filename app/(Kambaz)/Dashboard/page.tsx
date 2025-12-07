"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse, setCourses } from "../Courses/reducer";
import { setEnrollments } from "../Courses/Enrollments/reducer"; // ← CHANGED IMPORT
import * as client from "../Courses/client";
import * as enrollmentsClient from "../Courses/Enrollments/client";
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
  coursesReducer: { courses: Course[] };
  accountReducer: { currentUser: User | null };
  enrollmentsReducer: { enrollments: Enrollment[] };
}

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
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

  const fetchDashboardData = async () => {
    if (!currentUser) return;
    try {
      const allCourses = await client.fetchAllCourses();
      dispatch(setCourses(allCourses));

      const userEnrollments = await enrollmentsClient.findEnrollmentsForUser(currentUser._id);
      console.log("Fetched enrollments from backend:", userEnrollments);
      dispatch(setEnrollments(userEnrollments));
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [currentUser]);

  if (!currentUser) return <h1>Please sign in to view this page.</h1>;

  const isEnrolled = (courseId: string) =>
    enrollments.some((e) => e.user === currentUser._id && e.course === courseId);

  const userEnrolledCourses = courses.filter((c) => isEnrolled(c._id));
  const displayedCourses = showAllCourses ? courses : userEnrolledCourses;

  const onAddNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
  };

  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(setCourses(courses.map((c) => (c._id === course._id ? course : c))));
  };

  const onDeleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((c) => c._id !== courseId)));
  };

  const handleEnroll = async (courseId: string) => {
    if (!currentUser) return;
    try {
      await enrollmentsClient.enrollUserInCourse(currentUser._id, courseId);
      
      // Refetch enrollments from backend to sync
      const updatedEnrollments = await enrollmentsClient.findEnrollmentsForUser(currentUser._id);
      dispatch(setEnrollments(updatedEnrollments));
      
      console.log("✅ Enrolled successfully");
    } catch (error) {
      console.error("❌ Enrollment failed:", error);
      alert("Failed to enroll in course. Please try again.");
    }
  };

  const handleUnenroll = async (courseId: string) => {
    if (!currentUser) return;
    try {
      await enrollmentsClient.unenrollUserFromCourse(currentUser._id, courseId);
      
      // Refetch enrollments from backend to sync
      const updatedEnrollments = await enrollmentsClient.findEnrollmentsForUser(currentUser._id);
      dispatch(setEnrollments(updatedEnrollments));
      
      console.log("✅ Unenrolled successfully");
    } catch (error) {
      console.error("❌ Unenrollment failed:", error);
      alert("Failed to unenroll from course. Please try again.");
    }
  };

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

      {currentUser.role === "FACULTY" && (
        <>
          <h5>
            New Course
            <Button className="btn btn-primary float-end" onClick={onAddNewCourse}>
              Add
            </Button>
            <Button className="btn btn-warning float-end me-2" onClick={onUpdateCourse}>
              Update
            </Button>
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
              <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card>
                  <Link
                    href={enrolled ? `/Courses/${course._id}/Home` : "#"}
                    onClick={(e) => {
                      if (!enrolled) {
                        e.preventDefault();
                        alert("You must be enrolled in this course to view it.");
                      }
                    }}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                    style={!enrolled ? { cursor: "not-allowed" } : {}}
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
                      <Button variant="primary" disabled={!enrolled}>
                        Go
                      </Button>

                      {currentUser.role === "FACULTY" && (
                        <>
                          <Button
                            variant="danger"
                            className="float-end"
                            onClick={(e) => {
                              e.preventDefault();
                              onDeleteCourse(course._id);
                            }}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="warning"
                            className="me-2 float-end"
                            onClick={(e) => {
                              e.preventDefault();
                              setCourse(course);
                            }}
                          >
                            Edit
                          </Button>
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
                          onClick={() => handleUnenroll(course._id)}
                        >
                          Unenroll
                        </Button>
                      ) : (
                        <Button
                          variant="success"
                          className="w-100"
                          onClick={() => handleEnroll(course._id)}
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