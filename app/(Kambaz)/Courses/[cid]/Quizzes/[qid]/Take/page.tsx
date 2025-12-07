"use client";

import { useParams, useRouter } from "next/navigation";
import { Button, Form, Modal } from "react-bootstrap";
import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import * as client from "../../client";

interface Choice {
  text: string;
  isCorrect: boolean;
}

interface Question {
  _id: string;
  title: string;
  type: "multiple-choice" | "true-false" | "fill-in-blank";
  points: number;
  question: string;
  choices?: Choice[];
  correctAnswer?: string;
  possibleAnswers?: string[];
}

interface Quiz {
  _id: string;
  title: string;
  description: string;
  questions: Question[];
  points: number;
  timeLimit: number;
  accessCode: string;
  oneQuestionAtTime: boolean;
  shuffleAnswers: boolean;
  lockQuestionsAfterAnswering: boolean;
  multipleAttempts: boolean;
  howManyAttempts: number;
}

interface Answer {
  questionId: string;
  answer: string;
}

interface User {
  _id: string;
  username: string;
  role: string;
}

interface RootState {
  accountReducer: { currentUser: User | null };
}

export default function QuizTake() {
  const params = useParams();
  const { cid, qid } = params;
  const router = useRouter();

  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [lockedQuestions, setLockedQuestions] = useState<Set<number>>(new Set());
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [showAccessCodeModal, setShowAccessCodeModal] = useState(false);
  const [accessCodeInput, setAccessCodeInput] = useState("");
  const [accessCodeError, setAccessCodeError] = useState("");
  const [quizStarted, setQuizStarted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchQuiz = async () => {
    const quizData = await client.findQuizById(qid as string);
    setQuiz(quizData);

    let processedQuestions = [...quizData.questions];
    
    if (quizData.shuffleAnswers) {
      processedQuestions = processedQuestions.map((q: Question) => {
        if (q.type === "multiple-choice" && q.choices) {
          return { ...q, choices: shuffleArray([...q.choices]) };
        }
        return q;
      });
    }

    setQuestions(processedQuestions);
    setAnswers(processedQuestions.map((q: Question) => ({ questionId: q._id, answer: "" })));
    setTimeRemaining(quizData.timeLimit * 60);

    if (quizData.accessCode && quizData.accessCode.trim() !== "") {
      setShowAccessCodeModal(true);
    } else {
      setQuizStarted(true);
    }
  };

  useEffect(() => {
    if (currentUser?.role === "FACULTY") {
      router.push(`/Courses/${cid}/Quizzes/${qid}/Preview`);
      return;
    }
    fetchQuiz();
  }, [qid, currentUser]);

  useEffect(() => {
    if (!quizStarted || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStarted]);

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAccessCodeSubmit = () => {
    if (accessCodeInput === quiz?.accessCode) {
      setShowAccessCodeModal(false);
      setQuizStarted(true);
      setAccessCodeError("");
    } else {
      setAccessCodeError("Incorrect access code. Please try again.");
    }
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    if (lockedQuestions.has(currentQuestionIndex)) return;
    
    setAnswers((prev) =>
      prev.map((a) => (a.questionId === questionId ? { ...a, answer } : a))
    );
  };

  const handleNextQuestion = () => {
    if (quiz?.lockQuestionsAfterAnswering) {
      setLockedQuestions((prev) => new Set(prev).add(currentQuestionIndex));
    }
    setCurrentQuestionIndex((prev) => Math.min(questions.length - 1, prev + 1));
  };

  const handlePrevQuestion = () => {
    if (quiz?.lockQuestionsAfterAnswering && lockedQuestions.has(currentQuestionIndex - 1)) {
      return;
    }
    setCurrentQuestionIndex((prev) => Math.max(0, prev - 1));
  };

  const handleSubmit = useCallback(async () => {
    if (!quiz || !currentUser || submitting) return;
    
    setSubmitting(true);
    try {
      await client.submitQuizAttempt(quiz._id, currentUser._id, answers);
      router.push(`/Courses/${cid}/Quizzes/${qid}/Results`);
    } catch (error: any) {
      console.error("Error submitting quiz:", error);
      alert(error.response?.data?.error || "Failed to submit quiz");
      setSubmitting(false);
    }
  }, [quiz, currentUser, answers, submitting, cid, qid, router]);

  if (!currentUser) {
    return <div className="p-3">Please sign in to take this quiz.</div>;
  }

  if (!quiz || questions.length === 0) {
    return <div className="p-3">Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLocked = lockedQuestions.has(currentQuestionIndex);

  return (
    <div id="wd-quiz-take" className="p-3">
      <Modal show={showAccessCodeModal} backdrop="static" keyboard={false} centered>
        <Modal.Header>
          <Modal.Title>Access Code Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please enter the access code to start the quiz.</p>
          <Form.Control
            type="text"
            placeholder="Enter access code"
            value={accessCodeInput}
            onChange={(e) => setAccessCodeInput(e.target.value)}
            isInvalid={!!accessCodeError}
          />
          {accessCodeError && (
            <Form.Control.Feedback type="invalid">{accessCodeError}</Form.Control.Feedback>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}`)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAccessCodeSubmit}>
            Start Quiz
          </Button>
        </Modal.Footer>
      </Modal>

      {quizStarted && (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-bold">{quiz.title}</h3>
            <div className={`badge fs-5 ${timeRemaining < 60 ? "bg-danger" : "bg-primary"}`}>
              ⏱️ {formatTime(timeRemaining)}
            </div>
          </div>

          {quiz.description && (
            <div className="alert alert-info mb-4">{quiz.description}</div>
          )}

          <div className="d-flex justify-content-between align-items-center mb-4 p-3 bg-light border rounded">
            <span className="fw-bold">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            {!quiz.oneQuestionAtTime && (
              <div className="d-flex gap-2 flex-wrap">
                {questions.map((_, index) => (
                  <Button
                    key={index}
                    size="sm"
                    variant={
                      index === currentQuestionIndex
                        ? "primary"
                        : lockedQuestions.has(index)
                        ? "secondary"
                        : answers[index]?.answer
                        ? "success"
                        : "outline-secondary"
                    }
                    onClick={() => {
                      if (!quiz.lockQuestionsAfterAnswering || !lockedQuestions.has(index)) {
                        setCurrentQuestionIndex(index);
                      }
                    }}
                    disabled={quiz.lockQuestionsAfterAnswering && lockedQuestions.has(index)}
                    style={{ minWidth: "40px" }}
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>
            )}
          </div>

          <div className={`border rounded p-4 mb-4 ${isLocked ? "bg-light" : ""}`}>
            <h5 className="fw-bold mb-3">
              Question {currentQuestionIndex + 1} ({currentQuestion.points} pts)
              {isLocked && <span className="badge bg-secondary ms-2">Locked</span>}
            </h5>
            <p className="mb-3">{currentQuestion.question}</p>

            {currentQuestion.type === "multiple-choice" && currentQuestion.choices && (
              <div>
                {currentQuestion.choices.map((choice, choiceIndex) => (
                  <Form.Check
                    key={choiceIndex}
                    type="radio"
                    id={`q${currentQuestion._id}-choice${choiceIndex}`}
                    name={`question-${currentQuestion._id}`}
                    label={choice.text}
                    value={choice.text}
                    checked={answers.find((a) => a.questionId === currentQuestion._id)?.answer === choice.text}
                    onChange={(e) => handleAnswerChange(currentQuestion._id, e.target.value)}
                    disabled={isLocked}
                  />
                ))}
              </div>
            )}

            {currentQuestion.type === "true-false" && (
              <div>
                <Form.Check
                  type="radio"
                  id={`q${currentQuestion._id}-true`}
                  name={`question-${currentQuestion._id}`}
                  label="True"
                  value="true"
                  checked={answers.find((a) => a.questionId === currentQuestion._id)?.answer === "true"}
                  onChange={(e) => handleAnswerChange(currentQuestion._id, e.target.value)}
                  disabled={isLocked}
                />
                <Form.Check
                  type="radio"
                  id={`q${currentQuestion._id}-false`}
                  name={`question-${currentQuestion._id}`}
                  label="False"
                  value="false"
                  checked={answers.find((a) => a.questionId === currentQuestion._id)?.answer === "false"}
                  onChange={(e) => handleAnswerChange(currentQuestion._id, e.target.value)}
                  disabled={isLocked}
                />
              </div>
            )}

            {currentQuestion.type === "fill-in-blank" && (
              <Form.Control
                type="text"
                placeholder="Type your answer here"
                value={answers.find((a) => a.questionId === currentQuestion._id)?.answer || ""}
                onChange={(e) => handleAnswerChange(currentQuestion._id, e.target.value)}
                disabled={isLocked}
              />
            )}
          </div>

          <div className="d-flex justify-content-between">
            <Button
              variant="secondary"
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0 || (quiz.lockQuestionsAfterAnswering && lockedQuestions.has(currentQuestionIndex - 1))}
            >
              Previous
            </Button>
            <div className="d-flex gap-2">
              {currentQuestionIndex === questions.length - 1 ? (
                <Button variant="danger" onClick={handleSubmit} disabled={submitting}>
                  {submitting ? "Submitting..." : "Submit Quiz"}
                </Button>
              ) : (
                <Button variant="primary" onClick={handleNextQuestion}>
                  Next
                </Button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}