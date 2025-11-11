"use client";
import React, { useState } from "react";
import { FormControl } from "react-bootstrap";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });
  const [module, setModule] = useState({
    id: "M101",
    name: "Introduction to Web Development",
    description: "Learn the fundamentals of HTML, CSS, and JavaScript.",
    course: "Web Development Bootcamp",
  });
  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;
  const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;
  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>
      <h4>Retrieving Objects</h4>
      <a
        id="wd-retrieve-assignments"
        className="btn btn-primary me-2"
        href={`${HTTP_SERVER}/lab5/assignment`}
      >
        Get Assignment
      </a>
      <a
        id="wd-retrieve-modules"
        className="btn btn-primary me-2"
        href={`${HTTP_SERVER}/lab5/module`}
      >
        Get Module
      </a>

      <hr />
      <h4>Retrieving Properties</h4>
      <a
        id="wd-retrieve-assignment-title"
        className="btn btn-primary me-2"
        href={`${HTTP_SERVER}/lab5/assignment/title`}
      >
        Get Assignment Title
      </a>
      <a
        id="wd-retrieve-assignment-title"
        className="btn btn-primary me-2"
        href={`${HTTP_SERVER}/lab5/module/name`}
      >
        Get Module Name
      </a>
      <hr />
      <h4>Modifying Properties</h4>
      <div>
        <FormControl
          className="w-75 mt-2"
          id="wd-assignment-title"
          defaultValue={assignment.title}
          onChange={(e) =>
            setAssignment({ ...assignment, title: e.target.value })
          }
        />
        <a
          id="wd-update-assignment-title"
          className="btn btn-primary mt-2"
          href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}
        >
          Update Assignment Title{" "}
        </a>
      </div>
      <div>
        <FormControl
          className="w-75 mt-2"
          type="number"
          defaultValue={assignment.score}
          onChange={(e) =>
            setAssignment({ ...assignment, score: Number(e.target.value) })
          }
        />
        <a
          className="btn btn-primary mt-2"
          href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
        >
          Update Assignment Score
        </a>
      </div>
      <div>
        <label className="me-2">
          <input
            type="checkbox"
            checked={assignment.completed}
            onChange={(e) =>
              setAssignment({ ...assignment, completed: e.target.checked })
            }
          />{" "}
          Completed
        </label>
        <a
          className="btn btn-success mt-2"
          href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
        >
          Update Completed
        </a>
      </div>

      <div>
        <FormControl
          className="w-75 mt-2"
          id="wd-module-name"
          defaultValue={module.name}
          onChange={(e) => setModule({ ...module, name: e.target.value })}
        />
        <a
          id="wd-update-assignment-title"
          className="btn btn-primary mt-2"
          href={`${MODULE_API_URL}/name/${module.name}`}
        >
          Update Module Name{" "}
        </a>
      </div>
      <div>
        <FormControl
          className="w-75 mt-2"
          defaultValue={module.description}
          onChange={(e) =>
            setModule({ ...module, description: e.target.value })
          }
        />
        <a
          className="btn btn-primary mt-2"
          href={`${MODULE_API_URL}/description/${module.description}`}
        >
          Update Module Description
        </a>
      </div>

      <hr />
    </div>
  );
}
