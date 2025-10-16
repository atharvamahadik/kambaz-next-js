"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Button, Col, Form, Row } from "react-bootstrap";
import assignments from "../../../../Database/assignments.json";

export default function AssignmentEditor() {
  const params = useParams();
  const { cid, aid } = params;

  const assignment = assignments.find(a => a._id === aid);

  return (
    <div id="wd-assignments-editor" className="p-3">
      <h4 className="fw-bold mb-4">{assignment?.title || "Edit Assignment"}</h4>
      <Form>
        <Form.Group className="mb-3" controlId="wd-name">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control type="text" defaultValue={assignment?.title} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            defaultValue={assignment?.description}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-points">
          <Form.Label>Points</Form.Label>
          <Form.Control type="number" defaultValue={assignment?.points || 100} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-due-date">
          <Form.Label>Due</Form.Label>
          <Form.Control type="date" defaultValue={assignment?.dueDate} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-available">
          <Form.Label>Available</Form.Label>
          <Row>
            <Col>
              <Form.Control type="date" defaultValue={assignment?.availableStartDate} />
            </Col>
            <Col>
              <Form.Control type="date" defaultValue={assignment?.availableEndDate} />
            </Col>
          </Row>
        </Form.Group>

        <div className="d-flex justify-content-end mt-4">
          <Link href={`/Courses/${cid}/Assignments`} className="btn btn-secondary me-2">
            Cancel
          </Link>
          <Link href={`/Courses/${cid}/Assignments`} className="btn btn-danger">
            Save
          </Link>
        </div>
      </Form>
    </div>
  );
}
