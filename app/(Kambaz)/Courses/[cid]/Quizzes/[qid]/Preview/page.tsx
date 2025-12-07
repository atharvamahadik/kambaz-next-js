"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
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
  _id: string;
  title: string;
  description: string;
  questions: Question[];
  points: number;
}

interface Answer {
  questionId: string;
  answer: string;
}

export default function QuizPreview() {
  const params = useParams();
  const { cid, qid } = params;
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const fetchQuiz = async () => {
    const quizData = await client.findQuizById(qid as string);
    setQuiz(quizData);
    setAnswers(quizData.questions.map((q: Question) => ({ questionId: q._id, answer: "" })));
  };

  useEffect(() => {
    fetchQuiz();
  }, [qid]);

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers((prev) =>
      prev.map((a) => (a.questionId === questionId ? { ...a, answer } : a))
    );
  };

  const handleSubmit = () => {
    if (!quiz) return;

    let totalScore = 0;
    quiz.questions.forEach((question) => {
      const userAnswer = answers.find((a) => a.questionId === question._id)?.answer;

      if (question.type === "multiple-choice" && question.choices) {
        const correctChoice = question.choices.find((c) => c.isCorrect);
        if (correctChoice && userAnswer === correctChoice.text) {
          totalScore += question.points;
        }
      } else if (question.type === "true-false") {
        if (userAnswer === question.correctAnswer) {
          totalScore += question.points;
        }
      } else if (question.type === "fill-in-blank" && question.possibleAnswers) {
        if (question.possibleAnswers.some((ans) => ans.toLowerCase() === userAnswer?.toLowerCase())) {
          totalScore += question.points;
        }
      }
    });

    setScore(totalScore);
    setSubmitted(true);
  };

  const isAnswerCorrect = (question: Question): boolean => {
    const userAnswer = answers.find((a) => a.questionId === question._id)?.answer;

    if (question.type === "multiple-choice" && question.choices) {
      const correctChoice = question.choices.find((c) => c.isCorrect);
      return correctChoice?.text === userAnswer;
    } else if (question.type === "true-false") {
      return question.correctAnswer === userAnswer;
    } else if (question.type === "fill-in-blank" && question.possibleAnswers) {
      return question.possibleAnswers.some((ans) => ans.toLowerCase() === userAnswer?.toLowerCase());
    }

    return false;
  };

  if (!quiz) {
    return <div className="p-3">Loading...</div>;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div id="wd-quiz-preview" className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">{quiz.title}</h3>
        <Link href={`/Courses/${cid}/Quizzes/${qid}/Editor`} className="btn btn-secondary">
          Edit Quiz
        </Link>
      </div>

      {quiz.description && (
        <div className="alert alert-info mb-4">{quiz.description}</div>
      )}

      {!submitted ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4 p-3 bg-light border rounded">
            <span className="fw-bold">
              Question {currentQuestionIndex + 1} of {quiz.questions.length}
            </span>
            <div className="d-flex gap-2 flex-wrap">
              {quiz.questions.map((_, index) => (
                <Button
                  key={index}
                  size="sm"
                  variant={index === currentQuestionIndex ? "primary" : "outline-secondary"}
                  onClick={() => setCurrentQuestionIndex(index)}
                  style={{ minWidth: "40px" }}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </div>

          {currentQuestion && (
            <div className="border rounded p-4 mb-4">
              <h5 className="fw-bold mb-3">
                Question {currentQuestionIndex + 1} ({currentQuestion.points} pts)
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
                  />
                  <Form.Check
                    type="radio"
                    id={`q${currentQuestion._id}-false`}
                    name={`question-${currentQuestion._id}`}
                    label="False"
                    value="false"
                    checked={answers.find((a) => a.questionId === currentQuestion._id)?.answer === "false"}
                    onChange={(e) => handleAnswerChange(currentQuestion._id, e.target.value)}
                  />
                </div>
              )}

              {currentQuestion.type === "fill-in-blank" && (
                <Form.Control
                  type="text"
                  placeholder="Type your answer here"
                  value={answers.find((a) => a.questionId === currentQuestion._id)?.answer || ""}
                  onChange={(e) => handleAnswerChange(currentQuestion._id, e.target.value)}
                />
              )}
            </div>
          )}

          <div className="d-flex justify-content-between">
            <div>
              <Button
                variant="secondary"
                onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </Button>
            </div>
            <div className="d-flex gap-2">
              <Link href={`/Courses/${cid}/Quizzes/${qid}`} className="btn btn-outline-secondary">
                Cancel
              </Link>
              {currentQuestionIndex === quiz.questions.length - 1 ? (
                <Button variant="danger" onClick={handleSubmit}>
                  Submit Quiz
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={() => setCurrentQuestionIndex(Math.min(quiz.questions.length - 1, currentQuestionIndex + 1))}
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="alert alert-success mb-4">
            <h4>Quiz Submitted!</h4>
            <p className="mb-0">
              Your Score: {score} / {quiz.points} ({Math.round((score / quiz.points) * 100)}%)
            </p>
          </div>

          {quiz.questions.map((question, index) => {
            const correct = isAnswerCorrect(question);
            const userAnswer = answers.find((a) => a.questionId === question._id)?.answer;

            return (
              <div
                key={question._id}
                className={`border rounded p-4 mb-4 ${
                  correct ? "border-success bg-success bg-opacity-10" : "border-danger bg-danger bg-opacity-10"
                }`}
              >
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h5 className="fw-bold">
                    Question {index + 1} ({question.points} pts)
                  </h5>
                  <span className={`badge ${correct ? "bg-success" : "bg-danger"}`}>
                    {correct ? "✓ Correct" : "✗ Incorrect"}
                  </span>
                </div>

                <p className="mb-3">{question.question}</p>

                <div className="mb-2">
                  <strong>Your Answer:</strong> {userAnswer || "(No answer)"}
                </div>

                {!correct && (
                  <div className="text-success">
                    <strong>Correct Answer:</strong>{" "}
                    {question.type === "multiple-choice" &&
                      question.choices?.find((c) => c.isCorrect)?.text}
                    {question.type === "true-false" && question.correctAnswer}
                    {question.type === "fill-in-blank" &&
                      question.possibleAnswers?.join(", ")}
                  </div>
                )}
              </div>
            );
          })}

          <div className="d-flex justify-content-end">
            <Link href={`/Courses/${cid}/Quizzes`} className="btn btn-primary">
              Back to Quizzes
            </Link>
          </div>
        </>
      )}
    </div>
  );
}