"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addAssignment, updateAssignment } from "../reducer"; // Import from local reducer

interface Assignment {
  _id: string;
  title: string;
  description: string;
  course: string;
  points: number;
  dueDate: string;
  availableStartDate: string;
  availableEndDate: string;
}
interface RootState {
  assignmentsReducer: { assignments: Assignment[] };
}

const defaultAssignment: Assignment = {
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
  const { cid, aid } = params;
  const router = useRouter();
  const dispatch = useDispatch();

  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer
  );

  const assignmentToEdit = assignments.find((a: Assignment) => a._id === aid);

  const [assignment, setAssignment] = useState<Assignment>(
    assignmentToEdit || { ...defaultAssignment, course: cid as string }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAssignment({
      ...assignment,
      [e.target.id]: e.target.value,
    });
  };

  const handleSave = () => {
    if (aid) {
      dispatch(updateAssignment(assignment));
    } else {
      dispatch(addAssignment(assignment));
    }
    router.push(`/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="p-3">
      <h4 className="fw-bold mb-4">
        {assignmentToEdit ? assignmentToEdit.title : "New Assignment"}
      </h4>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control
            type="text"
            id="title"
            value={assignment.title}
            onChange={handleChange}
          />
        </Form.Group>

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

        <Form.Group className="mb-3">
          <Form.Label>Points</Form.Label>
          <Form.Control
            type="number"
            id="points"
            value={assignment.points}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Due</Form.Label>
          <Form.Control
            type="date"
            id="dueDate"
            value={assignment.dueDate}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Available</Form.Label>
          <Row>
            <Col>
              <Form.Label>From</Form.Label>
              <Form.Control
                type="date"
                id="availableStartDate"
                value={assignment.availableStartDate}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <Form.Label>Until</Form.Label>
              <Form.Control
                type="date"
                id="availableEndDate"
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