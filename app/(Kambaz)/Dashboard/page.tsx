import Link from "next/link";
import Image from "next/image";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (6)</h2>
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/Courses/CS5610" className="wd-dashboard-course-link">
            <Image
              src="/images/CourseImage1.png"
              width={200}
              height={150}
              alt="Course #1 Image"
            />
            <div>
              <h5> CS5610 Web Development </h5>
              <p className="wd-dashboard-course-title">
                Full Stack Software Developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/CS5010" className="wd-dashboard-course-link">
            <Image
              src="/images/CourseImage2.webp"
              width={200}
              height={150}
              alt="Course #2 Image"
            />
            <div>
              <h5> CS5010 Programming Design Paradigm </h5>
              <p className="wd-dashboard-course-title">Design Paradigms</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/CS5780" className="wd-dashboard-course-link">
            <Image
              src="/images/CourseImage3.jpeg"
              width={200}
              height={150}
              alt="Course #3 Image"
            />
            <div>
              <h5> CS5780 Building Scalable Distributed Systems </h5>
              <p className="wd-dashboard-course-title">
                Scalable Distributed Systems
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/CS5900" className="wd-dashboard-course-link">
            <Image
              src="/images/CourseImage4.jpeg"
              width={200}
              height={150}
              alt="Course #4 Image"
            />
            <div>
              <h5> CS5900 Foundation of AI </h5>
              <p className="wd-dashboard-course-title">
                AI Foundational Course
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/CS5400" className="wd-dashboard-course-link">
            <Image
              src="/images/CourseImage5.jpeg"
              width={200}
              height={150}
              alt="Course #5 Image"
            />
            <div>
              <h5> CS5610 Cloud Computing </h5>
              <p className="wd-dashboard-course-title">
                Cloud Computing Course
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/Courses/CS7010" className="wd-dashboard-course-link">
            <Image
              src="/images/CourseImage6.jpeg"
              width={200}
              height={150}
              alt="Course #6 Image"
            />
            <div>
              <h5> CS7010 ML OPS </h5>
              <p className="wd-dashboard-course-title">
                Machine Learning Operations
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
