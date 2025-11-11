"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { FaCaretDown, FaCheckCircle, FaTrash } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { BsGripVertical } from "react-icons/bs";
import { LiaFileContractSolid } from "react-icons/lia";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment, setAssignments } from "./reducer";
import AssignmentControlButtons from "./AssignmentControlButtons";
import * as client from "../../client";

interface Assignment {
  _id: string;
  title: string;
  course: string;
  description?: string;
  points?: number;
  dueDate?: string;
  availableStartDate?: string;
  availableEndDate?: string;
}

interface RootState {
  assignmentsReducer: { assignments: Assignment[] };
}

export default function Assignments() {
  const { cid } = useParams();
  const dispatch = useDispatch();

  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer
  );

  const fetchAssignments = async () => {
    const assignments = await client.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(assignments));
  };

  const onRemoveAssignment = async (assignmentId: string) => {
    if (window.confirm("Are you sure you want to remove this assignment?")) {
      await client.deleteAssignment(assignmentId);
      dispatch(setAssignments(assignments.filter((a: any) => a._id !== assignmentId)));
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [cid]);

  const courseAssignments = assignments;

  return (
    <div id="wd-assignments" className="p-3">
      <AssignmentControlButtons />

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
                <IoEllipsisVertical className="fs-5" />
              </button>
            </div>
          </div>
        </ListGroupItem>
        {courseAssignments.map((assignment: Assignment) => (
          <ListGroupItem
            key={assignment._id}
            className="p-3 wd-assignment-list-item ps-1"
          >
            <div className="d-flex align-items-center">
              <BsGripVertical className="fs-4 me-3" />
              <LiaFileContractSolid className="fs-4 text-success me-3" />
              <div className="flex-grow-1">
                <Link
                  href={`/Courses/${cid}/Assignments/${assignment._id}`}
                  className="fw-bold text-dark text-decoration-none"
                >
                  {assignment.title}
                </Link>
                <div className="text-muted small">
                  <span className="text-danger">Multiple Modules</span> | Not
                  available until {assignment.availableStartDate || "TBD"} |
                  Due {assignment.dueDate || "TBD"} |{" "}
                  {assignment.points || 100} pts
                </div>
              </div>
              <div className="d-flex align-items-center gap-3 ms-3">
                <FaTrash
                  className="text-danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => onRemoveAssignment(assignment._id)}
                />
                <FaCheckCircle className="text-success fs-5" />
                <IoEllipsisVertical className="fs-4" />
              </div>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}