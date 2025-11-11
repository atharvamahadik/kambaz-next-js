"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { setAssignments } from "../reducer";
import * as client from "../../../client";

interface Assignment {
  _id?: string;
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
    assignmentToEdit || {
      title: "",
      description: "",
      course: cid as string,
      points: 100,
      dueDate: "",
      availableStartDate: "",
      availableEndDate: "",
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAssignment({
      ...assignment,
      [e.target.id]: e.target.value,
    });
  };

  const onCreateAssignmentForCourse = async () => {
    if (!cid) return;
    const newAssignment = {
      title: assignment.title,
      description: assignment.description,
      course: cid as string,
      points: assignment.points,
      dueDate: assignment.dueDate,
      availableStartDate: assignment.availableStartDate,
      availableEndDate: assignment.availableEndDate,
    };
    const createdAssignment = await client.createAssignmentForCourse(
      cid as string,
      newAssignment
    );
    dispatch(setAssignments([...assignments, createdAssignment]));
    router.push(`/Courses/${cid}/Assignments`);
  };

  const onUpdateAssignment = async () => {
    if (!assignment._id) return;
    await client.updateAssignment(assignment._id, assignment);
    const newAssignments = assignments.map((a: any) =>
      a._id === assignment._id ? assignment : a
    );
    dispatch(setAssignments(newAssignments));
    router.push(`/Courses/${cid}/Assignments`);
  };

  const handleSave = () => {
    if (assignment._id) {
      onUpdateAssignment();
    } else {
      onCreateAssignmentForCourse();
    }
  };

  const fetchAssignments = async () => {
    const assignments = await client.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(assignments));
  };

  useEffect(() => {
    if (!assignmentToEdit && aid) {
      fetchAssignments();
    }
  }, [aid]);

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