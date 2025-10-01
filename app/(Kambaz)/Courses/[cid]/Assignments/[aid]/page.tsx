"use client";

import { Button, Col, Form, Row } from "react-bootstrap";

export default function AssignmentEditor() {
   return (
    <div id="wd-assignments-editor" className="p-3">
      <h4 className="fw-bold mb-4">Edit Assignment</h4>
      <Form>
        <Form.Group className="mb-3" controlId="wd-name">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control type="text" defaultValue="A1 - ENV + HTML" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="wd-description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            defaultValue="The assignment is available online. Submit a link to the landing page of your web application running on netlify."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="wd-points">
          <Form.Label>Points</Form.Label>
            <Form.Control type="number" defaultValue={100} />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="wd-assignment">
          <Row className="mb-3">
            <Col md={3}>
            <Form.Group controlId="wd-group">
              <Form.Label>Assignment Group</Form.Label>
              <Form.Select defaultValue="Assignments">
                <option>Assignments</option>
                <option>Quizzes</option>
              </Form.Select>
            </Form.Group>
            </Col>
          </Row>
        </Form.Group>
        <Row className="mb-3">
          <Col md={3}>
            <Form.Group controlId="wd-display-grade-as">
              <Form.Label>Display Grade As</Form.Label>
              <Form.Select defaultValue="Percentage">
                <option>Percentage</option>
                <option>Points</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="wd-submission">
          <Row className="mb-3">
            <Col md={3}>
            <Form.Group controlId="wd-submission-type">
              <Form.Label>Submission Type</Form.Label>
              <Form.Select defaultValue="Online">
                <option>Online</option>
                <option>Offline</option>
              </Form.Select>
            </Form.Group>
          <Form.Group className="mb-3">
            <br/>
          <Form.Label><strong>Online Entry Options</strong></Form.Label>
          <div className="d-flex flex-column">
            <Form.Check type="checkbox" label="Text Entry" id="wd-text-entry" />
            <Form.Check type="checkbox" label="Website URL" id="wd-website-url" />
            <Form.Check type="checkbox" label="Media Recordings" id="wd-media-recordings" />
            <Form.Check type="checkbox" label="Student Annotation" id="wd-student-annotation" />
            <Form.Check type="checkbox" label="File Uploads" id="wd-file-upload" />
          </div>
        </Form.Group>
          </Col>
        </Row>
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="wd-submission">
         Assign <br/>
          <Form.Group controlId="wd-assign-to">
              <Form.Label>Assign To</Form.Label>
              <Form.Control defaultValue="Everyone" />
            </Form.Group>
            <Form.Group controlId="wd-due-date">
              <Form.Label>Due</Form.Label>
              <Form.Control type="date" defaultValue="2025-09-18" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Available</Form.Label>
              <Row>
                <Col>
                  <Form.Control type="date" defaultValue="2025-09-18" />
                </Col>
                <Col>
                  <Form.Control type="date" defaultValue="2025-11-18" />
                </Col>
              </Row>
            </Form.Group>
        </Form.Group>

        <div className="d-flex justify-content-end mt-4">
          <Button variant="secondary" className="me-2" onClick={() => alert("Cancelled Successfully.")}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => alert("Saved Successfully.")}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
