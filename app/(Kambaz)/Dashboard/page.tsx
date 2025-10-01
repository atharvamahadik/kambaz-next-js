import Link from "next/link";
import Image from "next/image";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Row,
} from "react-bootstrap";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row className="g-4" style={{ rowGap: "35px" }} >
          <Col
            className="wd-dashboard-course"
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            xxl={1}
            style={{ width: "300px" }}
          >
            <Card>
              <Link
                href="/Courses/CS5610"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <CardImg
                  variant="top"
                  src="/images/CourseImage1.png"
                  width="100%"
                  height={160}
                />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    {" "}
                    CS5610 Web Development{" "}
                  </CardTitle>
                  <CardText
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    Full Stack Software Developer
                  </CardText>
                  <Button variant="primary"> Go </Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col
            className="wd-dashboard-course"
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            xxl={1}
            style={{ width: "300px" }}
          >
            <Card>
              <Link
                href="/Courses/CS5010"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <CardImg
                  variant="top"
                  src="/images/CourseImage2.webp"
                  width="100%"
                  height={160}
                />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    CS5010 Programming Design Paradigm
                  </CardTitle>
                  <CardText
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    Design Paradigms
                  </CardText>
                  <Button variant="primary"> Go </Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col
            className="wd-dashboard-course"
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            xxl={1}
            style={{ width: "300px" }}
          >
            <Card>
              <Link
                href="/Courses/CS5780"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <CardImg
                  variant="top"
                  src="/images/CourseImage3.jpeg"
                  width="100%"
                  height={160}
                />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    CS5780 Building Scalable Distributed Systems
                  </CardTitle>
                  <CardText
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    Scalable Distributed Systems
                  </CardText>
                  <Button variant="primary"> Go </Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col
            className="wd-dashboard-course"
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            xxl={1}
            style={{ width: "300px" }}
          >
            <Card>
              <Link
                href="/Courses/CS5900"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <CardImg
                  variant="top"
                  src="/images/CourseImage4.jpeg"
                  width="100%"
                  height={160}
                  alt="Course #4 Image"
                />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    CS5900 Foundation of AI
                  </CardTitle>
                  <CardText
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    AI Foundational Course
                  </CardText>
                  <Button variant="primary"> Go </Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col
            className="wd-dashboard-course"
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            xxl={1}
            style={{ width: "300px" }}
          >
            <Card>
              <Link
                href="/Courses/CS5400"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <CardImg
                  variant="top"
                  src="/images/CourseImage5.jpeg"
                  width="100%"
                  height={160}
                  alt="Course #5 Image"
                />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    CS5610 Cloud Computing
                  </CardTitle>
                  <CardText
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    Cloud Computing Course
                  </CardText>
                  <Button variant="primary"> Go </Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col
            className="wd-dashboard-course"
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            xxl={1}
            style={{ width: "300px" }}
          >
            <Card>
              <Link
                href="/Courses/CS7010"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <CardImg
                  variant="top"
                  src="/images/CourseImage6.jpeg"
                  width="100%"
                  height={160}
                  alt="Course #6 Image"
                />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    CS7010 ML OPS
                  </CardTitle>
                  <CardText
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    Machine Learning Operations
                  </CardText>
                  <Button variant="primary"> Go </Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col
            className="wd-dashboard-course"
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2}
            xxl={1}
            style={{ width: "300px" }}
          >
            <Card>
              <Link
                href="/Courses/CS7080"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <CardImg
                  variant="top"
                  src="/images/CourseImage7.jpeg"
                  width="100%"
                  height={160}
                  alt="Course #7 Image"
                />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    CS7010 Natural Language Processing
                  </CardTitle>
                  <CardText
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    Natural Language Processing
                  </CardText>
                  <Button variant="primary"> Go </Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
