"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { ListGroup, ListGroupItem } from "react-bootstrap";

const links = [
  "Home",
  "Modules",
  "Piazza",
  "Zoom",
  "Assignments",
  "Quizzes",
  "Grades",
  "People",
];

export default function CourseNavigation() {
  const pathname = usePathname();
  const params = useParams();
  const cid = params?.cid;

  return (
    <ListGroup
      id="wd-courses-navigation"
      className="wd list-group fs-5 rounded-0"
    >
      {links.map((link) => {
        const href =
          link === "People"
            ? `/Courses/${cid}/People/Table`
            : `/Courses/${cid}/${link}`;
        
        return (
          <ListGroupItem
            key={link}
            as={Link}
            href={href}
            className={`list-group-item border-0 ${
              pathname?.includes(link) ? "active" : "text-danger"
            }`}
          >
            {link}
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
}
