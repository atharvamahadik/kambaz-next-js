"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addAssignment, updateAssignment } from "../reducer"; // Import from local reducer

// Define a default empty assignment for create mode
const defaultAssignment = {
  _id: "",
  title: "",
  description: "",
  course: "",
  points: 100,
  dueDate: "",
  availableStartDate: "",
  availableEndDate: "",
};

export default function AssignmentEditor() {
  const params = useParams();
  const { cid, aid } = params; // 'aid' will exist if editing, be undefined if creating
  const router = useRouter();
  const dispatch = useDispatch();

  const { assignments } = useSelector(
    (state: any) => state.assignmentsReducer
  );
  
  const assignmentToEdit = assignments.find((a: any) => a._id === aid);

  // Use local state, ensuring 'course' is a string
  const [assignment, setAssignment] = useState(
    assignmentToEdit || { ...defaultAssignment, course: (cid as string) }
  );

  // Handle form field changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAssignment({
      ...assignment,
      [e.target.id]: e.target.value,
    });
  };

  // Handle save
  const handleSave = () => {
    if (aid) {
      // Edit Mode
      dispatch(updateAssignment(assignment));
    } else {
      // Create Mode
      dispatch(addAssignment(assignment)); // 'course' is already set in the state
    }
    router.push(`/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="p-3">
      <h4 className="fw-bold mb-4">
        {assignmentToEdit ? assignmentToEdit.title : "New Assignment"}
      </h4>
      <Form>
        {/*
          FIX: Removed 'controlId' from <Form.Group>
          FIX: Added 'id="title"' to <Form.Control> to match state
        */}
        <Form.Group className="mb-3">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control
            type="text"
            id="title"
            value={assignment.title}
            onChange={handleChange}
          />
        </Form.Group>

        {/* FIX: Added 'id="description"' */}
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            id="description"
            value={assignment.description}
            onChange={handleChange}
          />
        </Form.Group>

        {/* FIX: Added 'id="points"' */}
        <Form.Group className="mb-3">
          <Form.Label>Points</Form.Label>
          <Form.Control
            type="number"
            id="points"
            value={assignment.points}
            onChange={handleChange}
          />
        </Form.Group>

        {/* FIX: Added 'id="dueDate"' */}
        <Form.Group className="mb-3">
          <Form.Label>Due</Form.Label>
          <Form.Control
            type="date"
            id="dueDate"
            value={assignment.dueDate}
            onChange={handleChange}
          />
        </Form.Group>

        {/* FIX: Removed 'controlId' from <Form.Group> */}
        <Form.Group className="mb-3">
          <Form.Label>Available</Form.Label>
          <Row>
            <Col>
              <Form.Label>From</Form.Label>
              <Form.Control
                type="date"
                id="availableStartDate" // This ID is correct
                value={assignment.availableStartDate}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <Form.Label>Until</Form.Label>
              <Form.Control
                type="date"
                id="availableEndDate" // This ID is correct
                value={assignment.availableEndDate}
                onChange={handleChange}
              />
            </Col>
          </Row>
        </Form.Group>

        <div className="d-flex justify-content-end mt-4">
          <Link
            href={`/Courses/${cid}/Assignments`}
            className="btn btn-secondary me-2"
          >
            Cancel
          </Link>
          <Button variant="danger" onClick={handleSave}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}