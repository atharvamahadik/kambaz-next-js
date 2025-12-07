"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button, Form, Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { setQuizzes } from "../../reducer";
import * as client from "../../client";

interface Question {
  _id: string;
  title: string;
  type: "multiple-choice" | "true-false" | "fill-in-blank";
  points: number;
  question: string;
  choices?: { text: string; isCorrect: boolean }[];
  correctAnswer?: string;
  possibleAnswers?: string[];
}

interface Quiz {
  _id?: string;
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
  questions: Question[];
}

export default function QuizEditor() {
  const params = useParams();
  const { cid, qid } = params;
  const router = useRouter();
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState<"details" | "questions">("details");
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [newQuestion, setNewQuestion] = useState<Question>({
    _id: "",
    title: "",
    type: "multiple-choice",
    points: 0,
    question: "",
    choices: [
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
    ],
  });

  const fetchQuiz = async () => {
    const quizData = await client.findQuizById(qid as string);
    setQuiz(quizData);
  };

  useEffect(() => {
    fetchQuiz();
  }, [qid]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!quiz) return;
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
    if (!quiz || !quiz._id) return;

    await client.updateQuiz(quiz._id, quiz);
    const updatedQuizzes = await client.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(updatedQuizzes));
    router.push(`/Courses/${cid}/Quizzes/${quiz._id}`);
  };

  const handleSaveAndPublish = async () => {
    if (!quiz || !quiz._id) return;

    const publishedQuiz = { ...quiz, published: true };
    await client.updateQuiz(quiz._id, publishedQuiz);
    const updatedQuizzes = await client.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(updatedQuizzes));
    router.push(`/Courses/${cid}/Quizzes`);
  };

  const handleAddQuestion = () => {
    setEditingQuestionId("new");
    setNewQuestion({
      _id: "",
      title: "",
      type: "multiple-choice",
      points: 0,
      question: "",
      choices: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
    });
  };

  const handleSaveQuestion = async () => {
    if (!quiz || !quiz._id) return;

    if (editingQuestionId === "new") {
      await client.addQuestionToQuiz(quiz._id, newQuestion);
    } else if (editingQuestionId) {
      await client.updateQuestion(quiz._id, editingQuestionId, newQuestion);
    }

    const updatedQuiz = await client.findQuizById(quiz._id);
    setQuiz(updatedQuiz);
    setEditingQuestionId(null);
    setNewQuestion({
      _id: "",
      title: "",
      type: "multiple-choice",
      points: 0,
      question: "",
      choices: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
    });
  };

  const handleDeleteQuestion = async (questionId: string) => {
    if (!quiz || !quiz._id) return;

    if (window.confirm("Are you sure you want to delete this question?")) {
      await client.deleteQuestion(quiz._id, questionId);
      const updatedQuiz = await client.findQuizById(quiz._id);
      setQuiz(updatedQuiz);
    }
  };

  const handleEditQuestion = (question: Question) => {
    setEditingQuestionId(question._id);
    setNewQuestion(question);
  };

  const handleQuestionTypeChange = (type: "multiple-choice" | "true-false" | "fill-in-blank") => {
    if (type === "true-false") {
      setNewQuestion({
        ...newQuestion,
        type,
        correctAnswer: "true",
        choices: undefined,
        possibleAnswers: undefined,
      });
    } else if (type === "fill-in-blank") {
      setNewQuestion({
        ...newQuestion,
        type,
        possibleAnswers: [""],
        choices: undefined,
        correctAnswer: undefined,
      });
    } else {
      setNewQuestion({
        ...newQuestion,
        type,
        choices: [
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
        ],
        correctAnswer: undefined,
        possibleAnswers: undefined,
      });
    }
  };

  const handleChoiceChange = (index: number, text: string) => {
    if (!newQuestion.choices) return;
    const updatedChoices = [...newQuestion.choices];
    updatedChoices[index] = { ...updatedChoices[index], text };
    setNewQuestion({ ...newQuestion, choices: updatedChoices });
  };

  const handleCorrectChoiceChange = (index: number) => {
    if (!newQuestion.choices) return;
    const updatedChoices = newQuestion.choices.map((choice, i) => ({
      ...choice,
      isCorrect: i === index,
    }));
    setNewQuestion({ ...newQuestion, choices: updatedChoices });
  };

  const handleAddChoice = () => {
    if (!newQuestion.choices) return;
    setNewQuestion({
      ...newQuestion,
      choices: [...newQuestion.choices, { text: "", isCorrect: false }],
    });
  };

  const handleRemoveChoice = (index: number) => {
    if (!newQuestion.choices || newQuestion.choices.length <= 2) return;
    const updatedChoices = newQuestion.choices.filter((_, i) => i !== index);
    setNewQuestion({ ...newQuestion, choices: updatedChoices });
  };

  const handlePossibleAnswerChange = (index: number, value: string) => {
    if (!newQuestion.possibleAnswers) return;
    const updated = [...newQuestion.possibleAnswers];
    updated[index] = value;
    setNewQuestion({ ...newQuestion, possibleAnswers: updated });
  };

  const handleAddPossibleAnswer = () => {
    if (!newQuestion.possibleAnswers) return;
    setNewQuestion({
      ...newQuestion,
      possibleAnswers: [...newQuestion.possibleAnswers, ""],
    });
  };

  const handleRemovePossibleAnswer = (index: number) => {
    if (!newQuestion.possibleAnswers || newQuestion.possibleAnswers.length <= 1) return;
    const updated = newQuestion.possibleAnswers.filter((_, i) => i !== index);
    setNewQuestion({ ...newQuestion, possibleAnswers: updated });
  };

  if (!quiz) {
    return <div className="p-3">Loading...</div>;
  }

  const renderQuestionForm = () => (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Question Title</Form.Label>
        <Form.Control
          type="text"
          value={newQuestion.title}
          onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Question Type</Form.Label>
        <Form.Select
          value={newQuestion.type}
          onChange={(e) =>
            handleQuestionTypeChange(e.target.value as "multiple-choice" | "true-false" | "fill-in-blank")
          }
        >
          <option value="multiple-choice">Multiple Choice</option>
          <option value="true-false">True/False</option>
          <option value="fill-in-blank">Fill in the Blank</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Points</Form.Label>
        <Form.Control
          type="number"
          value={newQuestion.points}
          onChange={(e) => setNewQuestion({ ...newQuestion, points: parseInt(e.target.value) || 0 })}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Question Text</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={newQuestion.question}
          onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
        />
      </Form.Group>

      {newQuestion.type === "multiple-choice" && newQuestion.choices && (
        <div>
          <Form.Label>Choices (Select the correct answer)</Form.Label>
          {newQuestion.choices.map((choice, index) => (
            <div key={index} className="d-flex gap-2 mb-2">
              <Form.Check
                type="radio"
                name="correctChoice"
                checked={choice.isCorrect}
                onChange={() => handleCorrectChoiceChange(index)}
              />
              <Form.Control
                type="text"
                value={choice.text}
                onChange={(e) => handleChoiceChange(index, e.target.value)}
                placeholder={`Choice ${index + 1}`}
              />
              {newQuestion.choices!.length > 2 && (
                <Button variant="danger" size="sm" onClick={() => handleRemoveChoice(index)}>
                  Remove
                </Button>
              )}
            </div>
          ))}
          <Button variant="secondary" size="sm" onClick={handleAddChoice}>
            + Add Choice
          </Button>
        </div>
      )}

      {newQuestion.type === "true-false" && (
        <Form.Group className="mb-3">
          <Form.Label>Correct Answer</Form.Label>
          <div>
            <Form.Check
              type="radio"
              id="true-option"
              label="True"
              name="tfAnswer"
              checked={newQuestion.correctAnswer === "true"}
              onChange={() => setNewQuestion({ ...newQuestion, correctAnswer: "true" })}
            />
            <Form.Check
              type="radio"
              id="false-option"
              label="False"
              name="tfAnswer"
              checked={newQuestion.correctAnswer === "false"}
              onChange={() => setNewQuestion({ ...newQuestion, correctAnswer: "false" })}
            />
          </div>
        </Form.Group>
      )}

      {newQuestion.type === "fill-in-blank" && newQuestion.possibleAnswers && (
        <div>
          <Form.Label>Possible Correct Answers</Form.Label>
          {newQuestion.possibleAnswers.map((answer, index) => (
            <div key={index} className="d-flex gap-2 mb-2">
              <Form.Control
                type="text"
                value={answer}
                onChange={(e) => handlePossibleAnswerChange(index, e.target.value)}
                placeholder={`Answer ${index + 1}`}
              />
              {newQuestion.possibleAnswers!.length > 1 && (
                <Button variant="danger" size="sm" onClick={() => handleRemovePossibleAnswer(index)}>
                  Remove
                </Button>
              )}
            </div>
          ))}
          <Button variant="secondary" size="sm" onClick={handleAddPossibleAnswer}>
            + Add Answer
          </Button>
        </div>
      )}

      <div className="d-flex gap-2 mt-3">
        <Button variant="primary" onClick={handleSaveQuestion}>
          {editingQuestionId === "new" ? "Save Question" : "Update Question"}
        </Button>
        <Button variant="secondary" onClick={() => setEditingQuestionId(null)}>
          Cancel
        </Button>
      </div>
    </>
  );

  return (
    <div id="wd-quiz-editor" className="p-3">
      <h4 className="fw-bold mb-4">{quiz.title}</h4>

      <Nav variant="tabs" className="mb-3">
        <Nav.Item>
          <Nav.Link active={activeTab === "details"} onClick={() => setActiveTab("details")} style={{ cursor: "pointer" }}>
            Details
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link active={activeTab === "questions"} onClick={() => setActiveTab("questions")} style={{ cursor: "pointer" }}>
            Questions
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {activeTab === "details" && (
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" id="title" value={quiz.title} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} id="description" value={quiz.description} onChange={handleChange} />
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
            <Form.Label>Points</Form.Label>
            <Form.Control
              type="number"
              id="points"
              value={quiz.points}
              readOnly
              disabled
              style={{ backgroundColor: "#e9ecef" }}
            />
            <Form.Text className="text-muted">
              Points are automatically calculated from the sum of all question points.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check type="checkbox" id="shuffleAnswers" label="Shuffle Answers" checked={quiz.shuffleAnswers} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Time Limit (Minutes)</Form.Label>
            <Form.Control type="number" id="timeLimit" value={quiz.timeLimit} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check type="checkbox" id="multipleAttempts" label="Allow Multiple Attempts" checked={quiz.multipleAttempts} onChange={handleChange} />
          </Form.Group>

          {quiz.multipleAttempts && (
            <Form.Group className="mb-3">
              <Form.Label>How Many Attempts</Form.Label>
              <Form.Control type="number" id="howManyAttempts" value={quiz.howManyAttempts} onChange={handleChange} />
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Show Correct Answers</Form.Label>
            <Form.Control type="text" id="showCorrectAnswers" value={quiz.showCorrectAnswers} onChange={handleChange} placeholder="e.g., Immediately, After submission, Never" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Access Code</Form.Label>
            <Form.Control type="text" id="accessCode" value={quiz.accessCode} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check type="checkbox" id="oneQuestionAtTime" label="One Question at a Time" checked={quiz.oneQuestionAtTime} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check type="checkbox" id="webcamRequired" label="Webcam Required" checked={quiz.webcamRequired} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check type="checkbox" id="lockQuestionsAfterAnswering" label="Lock Questions After Answering" checked={quiz.lockQuestionsAfterAnswering} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Due Date</Form.Label>
            <Form.Control type="date" id="dueDate" value={quiz.dueDate} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Available From</Form.Label>
            <Form.Control type="date" id="availableDate" value={quiz.availableDate} onChange={handleChange} />
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
      )}

      {activeTab === "questions" && (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>Questions (Total Points: {quiz.points})</h5>
            <Button variant="danger" onClick={handleAddQuestion}>
              + New Question
            </Button>
          </div>

          {quiz.questions.map((question) => (
            <div key={question._id} className="border rounded p-3 mb-3">
              {editingQuestionId === question._id ? (
                <div>{renderQuestionForm()}</div>
              ) : (
                <div>
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 className="fw-bold">{question.title || "Untitled Question"}</h6>
                      <p className="text-muted mb-1">Type: {question.type}</p>
                      <p className="text-muted mb-2">Points: {question.points}</p>
                      <p>{question.question}</p>
                    </div>
                    <div className="d-flex gap-2">
                      <Button variant="warning" size="sm" onClick={() => handleEditQuestion(question)}>
                        Edit
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => handleDeleteQuestion(question._id)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {editingQuestionId === "new" && (
            <div className="border rounded p-3 mb-3 bg-light">
              <h6 className="fw-bold mb-3">New Question</h6>
              {renderQuestionForm()}
            </div>
          )}

          {quiz.questions.length === 0 && editingQuestionId !== "new" && (
            <div className="text-center text-muted my-5">
              <p>No questions yet. Click &quot;+ New Question&quot; to add one.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}