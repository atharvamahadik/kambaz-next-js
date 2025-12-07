"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setQuizzes } from "../reducer";
import * as client from "../client";

interface Quiz {
  title: string;
  description: string;
  course: string;
  quizType: string;
  points: number;
  assignmentGroup: string;
  shuffleAnswers: boolean;
  timeLimit: number;
  multipleAttempts: boolean;
  howManyAttempts: number;
  showCorrectAnswers: string;
  accessCode: string;
  oneQuestionAtTime: boolean;
  webcamRequired: boolean;
  lockQuestionsAfterAnswering: boolean;
  dueDate: string;
  availableDate: string;
  untilDate: string;
  published: boolean;
}

export default function NewQuizEditor() {
  const params = useParams();
  const { cid } = params;
  const router = useRouter();
  const dispatch = useDispatch();

  const [quiz, setQuiz] = useState<Quiz>({
    title: "New Quiz",
    description: "",
    course: cid as string,
    quizType: "Graded Quiz",
    points: 0,
    assignmentGroup: "Quizzes",
    shuffleAnswers: true,
    timeLimit: 20,
    multipleAttempts: false,
    howManyAttempts: 1,
    showCorrectAnswers: "",
    accessCode: "",
    oneQuestionAtTime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    dueDate: "",
    availableDate: "",
    untilDate: "",
    published: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setQuiz({ ...quiz, [id]: checked });
    } else if (type === "number") {
      setQuiz({ ...quiz, [id]: parseInt(value) || 0 });
    } else {
      setQuiz({ ...quiz, [id]: value });
    }
  };

  const handleSave = async () => {
    const newQuiz = await client.createQuizForCourse(cid as string, quiz);
    const updatedQuizzes = await client.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(updatedQuizzes));
    router.push(`/Courses/${cid}/Quizzes/${newQuiz._id}/Editor`);
  };

  const handleSaveAndPublish = async () => {
    const publishedQuiz = { ...quiz, published: true };
    await client.createQuizForCourse(cid as string, publishedQuiz);
    const updatedQuizzes = await client.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(updatedQuizzes));
    router.push(`/Courses/${cid}/Quizzes`);
  };

  return (
    <div id="wd-quiz-editor" className="p-3">
      <h4 className="fw-bold mb-4">New Quiz</h4>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" id="title" value={quiz.title} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            id="description"
            value={quiz.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Quiz Type</Form.Label>
          <Form.Select id="quizType" value={quiz.quizType} onChange={handleChange}>
            <option value="Graded Quiz">Graded Quiz</option>
            <option value="Practice Quiz">Practice Quiz</option>
            <option value="Graded Survey">Graded Survey</option>
            <option value="Ungraded Survey">Ungraded Survey</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Assignment Group</Form.Label>
          <Form.Select id="assignmentGroup" value={quiz.assignmentGroup} onChange={handleChange}>
            <option value="Quizzes">Quizzes</option>
            <option value="Exams">Exams</option>
            <option value="Assignments">Assignments</option>
            <option value="Project">Project</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            id="shuffleAnswers"
            label="Shuffle Answers"
            checked={quiz.shuffleAnswers}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Time Limit (Minutes)</Form.Label>
          <Form.Control type="number" id="timeLimit" value={quiz.timeLimit} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            id="multipleAttempts"
            label="Allow Multiple Attempts"
            checked={quiz.multipleAttempts}
            onChange={handleChange}
          />
        </Form.Group>

        {quiz.multipleAttempts && (
          <Form.Group className="mb-3">
            <Form.Label>How Many Attempts</Form.Label>
            <Form.Control
              type="number"
              id="howManyAttempts"
              value={quiz.howManyAttempts}
              onChange={handleChange}
            />
          </Form.Group>
        )}

        <Form.Group className="mb-3">
          <Form.Label>Show Correct Answers</Form.Label>
          <Form.Control
            type="text"
            id="showCorrectAnswers"
            value={quiz.showCorrectAnswers}
            onChange={handleChange}
            placeholder="e.g., Immediately, After submission, Never"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Access Code</Form.Label>
          <Form.Control type="text" id="accessCode" value={quiz.accessCode} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            id="oneQuestionAtTime"
            label="One Question at a Time"
            checked={quiz.oneQuestionAtTime}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            id="webcamRequired"
            label="Webcam Required"
            checked={quiz.webcamRequired}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            id="lockQuestionsAfterAnswering"
            label="Lock Questions After Answering"
            checked={quiz.lockQuestionsAfterAnswering}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Due Date</Form.Label>
          <Form.Control type="date" id="dueDate" value={quiz.dueDate} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Available From</Form.Label>
          <Form.Control
            type="date"
            id="availableDate"
            value={quiz.availableDate}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Until</Form.Label>
          <Form.Control type="date" id="untilDate" value={quiz.untilDate} onChange={handleChange} />
        </Form.Group>

        <div className="d-flex justify-content-end mt-4 gap-2">
          <Link href={`/Courses/${cid}/Quizzes`} className="btn btn-secondary">
            Cancel
          </Link>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="success" onClick={handleSaveAndPublish}>
            Save & Publish
          </Button>
        </div>
      </Form>
    </div>
  );
}