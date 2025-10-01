import React from "react";
import Link from "next/link";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { FaCaretDown, FaPlus, FaCheckCircle } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { BsGripVertical } from "react-icons/bs";
import { LiaFileContractSolid } from "react-icons/lia";
import AssignmentControlButtons from "./AssignmentControlButtons";

export default function Assignments() {
  return (
    <div>
      <AssignmentControlButtons />
      <br />
      <br />

      <div id="wd-assignments" className="p-3">
        <ListGroup>
          <ListGroupItem className="rounded-0 border-gray" id="wd-assignments">
            <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
              <div className="d-flex align-items-center">
                <BsGripVertical className="fs-4 me-2" />
                <FaCaretDown className="me-2" />
                <h4 className="mb-0 fw-bold">ASSIGNMENTS</h4>
              </div>
              <div className="d-flex align-items-center gap-1">
                <span className="badge rounded-pill text-dark border me-2">
                  40% of Total
                </span>
                <button className="btn btn-light border">
                  <FaPlus />
                </button>
                <button className="btn btn-light border">
                  <IoEllipsisVertical className="fs-5" />
                </button>
              </div>
            </div>
          </ListGroupItem>
          <ListGroupItem className="p-3 wd-assignment-list-item ps-1">
            <div className="d-flex align-items-center">
              <BsGripVertical className="fs-4 me-3" />
              <LiaFileContractSolid className="fs-4 text-success me-3" />
              <div className="flex-grow-1">
                <Link
                  href="/Courses/CS5610/Assignments/A1"
                  className="fw-bold text-dark text-decoration-none"
                >
                  A1
                </Link>
                <div className="text-muted small">
                  <span className="text-danger">Multiple Modules</span>| Not
                  available until May 6 at 12:00am | Due May 13 at 11:59pm | 100
                  pts
                </div>
              </div>
              <div className="d-flex align-items-center gap-3 ms-3">
                <FaCheckCircle className="text-success fs-5" />
                <IoEllipsisVertical className="fs-4" />
              </div>
            </div>
          </ListGroupItem>

          <ListGroupItem className="p-3 wd-assignment-list-item ps-1">
            <div className="d-flex align-items-center">
              <BsGripVertical className="fs-4 me-3" />
              <LiaFileContractSolid className="fs-4 text-success me-3" />
              <div className="flex-grow-1">
                <Link
                  href="/Courses/CS5610/Assignments/A2"
                  className="fw-bold text-dark text-decoration-none"
                >
                  A2
                </Link>
                <div className="text-muted small">
                  <span className="text-danger">Multiple Modules</span>| Not
                  available until May 13 at 12:00am | Due May 20 at 11:59pm |
                  100 pts
                </div>
              </div>
              <div className="d-flex align-items-center gap-3 ms-3">
                <FaCheckCircle className="text-success fs-5" />
                <IoEllipsisVertical className="fs-4" />
              </div>
            </div>
          </ListGroupItem>

          <ListGroupItem className="p-3 wd-assignment-list-item ps-1">
            <div className="d-flex align-items-center">
              <BsGripVertical className="fs-4 me-3" />
              <LiaFileContractSolid className="fs-4 text-success me-3" />
              <div className="flex-grow-1">
                <Link
                  href="/Courses/CS5610/Assignments/A3"
                  className="fw-bold text-dark text-decoration-none"
                >
                  A3
                </Link>
                <div className="text-muted small">
                  <span className="text-danger">Multiple Modules</span>| Not
                  available until May 20 at 12:00am | Due May 27 at 11:59pm |
                  100 pts
                </div>
              </div>
              <div className="d-flex align-items-center gap-3 ms-3">
                <FaCheckCircle className="text-success fs-5" />
                <IoEllipsisVertical className="fs-4" />
              </div>
            </div>
          </ListGroupItem>
        </ListGroup>
      </div>
    </div>
  );
}
