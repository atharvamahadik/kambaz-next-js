"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
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
  showCorrectAnswers: string;
  multipleAttempts: boolean;
  howManyAttempts: number;
}

interface AttemptAnswer {
  questionId: string;
  answer: string;
  isCorrect: boolean;
  pointsEarned: number;
}

interface Attempt {
  _id: string;
  score: number;
  totalPoints: number;
  attemptNumber: number;
  submittedAt: string;
  answers: AttemptAnswer[];
}

interface User {
  _id: string;
  username: string;
  role: string;
}

interface RootState {
  accountReducer: { currentUser: User | null };
}

export default function QuizResults() {
  const params = useParams();
  const { cid, qid } = params;

  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [attempt, setAttempt] = useState<Attempt | null>(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!currentUser) return;

    try {
      const quizData = await client.findQuizById(qid as string);
      setQuiz(quizData);

      const latestAttempt = await client.getLatestAttempt(qid as string, currentUser._id);
      setAttempt(latestAttempt);

      const countData = await client.getAttemptCount(qid as string, currentUser._id);
      setAttemptCount(countData.count);
    } catch (error) {
      console.error("Error fetching results:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [qid, currentUser]);

  const getCorrectAnswer = (question: Question): string => {
    if (question.type === "multiple-choice" && question.choices) {
      return question.choices.find((c) => c.isCorrect)?.text || "N/A";
    } else if (question.type === "true-false") {
      return question.correctAnswer || "N/A";
    } else if (question.type === "fill-in-blank" && question.possibleAnswers) {
      return question.possibleAnswers.join(" or ");
    }
    return "N/A";
  };

  const shouldShowCorrectAnswers = (): boolean => {
    if (!quiz) return false;
    return quiz.showCorrectAnswers?.toLowerCase() === "immediately";
  };

  const canRetakeQuiz = (): boolean => {
    if (!quiz) return false;
    const maxAttempts = quiz.multipleAttempts ? quiz.howManyAttempts : 1;
    return attemptCount < maxAttempts;
  };

  if (!currentUser) {
    return <div className="p-3">Please sign in to view your results.</div>;
  }

  if (loading) {
    return <div className="p-3">Loading...</div>;
  }

  if (!quiz || !attempt) {
    return (
      <div className="p-3">
        <p>No attempt found for this quiz.</p>
        <Link href={`/Courses/${cid}/Quizzes/${qid}`} className="btn btn-primary">
          Back to Quiz
        </Link>
      </div>
    );
  }

  const maxAttempts = quiz.multipleAttempts ? quiz.howManyAttempts : 1;

  return (
    <div id="wd-quiz-results" className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">{quiz.title} - Results</h3>
        <div className="d-flex gap-2">
          {canRetakeQuiz() && (
            <Link href={`/Courses/${cid}/Quizzes/${qid}/Take`} className="btn btn-warning">
              Retake Quiz
            </Link>
          )}
          <Link href={`/Courses/${cid}/Quizzes`} className="btn btn-secondary">
            Back to Quizzes
          </Link>
        </div>
      </div>

      <div className="alert alert-success mb-4">
        <h4 className="mb-3">Quiz Submitted!</h4>
        <div className="row">
          <div className="col-md-4">
            <strong>Score:</strong> {attempt.score} / {attempt.totalPoints}
          </div>
          <div className="col-md-4">
            <strong>Percentage:</strong> {Math.round((attempt.score / attempt.totalPoints) * 100)}%
          </div>
          <div className="col-md-4">
            <strong>Attempt:</strong> {attempt.attemptNumber} of {maxAttempts}
          </div>
        </div>
        <div className="mt-2 text-muted">
          Submitted: {new Date(attempt.submittedAt).toLocaleString()}
        </div>
      </div>

      {quiz.questions.map((question, index) => {
        const attemptAnswer = attempt.answers.find((a) => a.questionId === question._id);
        const isCorrect = attemptAnswer?.isCorrect || false;

        return (
          <div
            key={question._id}
            className={`border rounded p-4 mb-4 ${
              isCorrect
                ? "border-success bg-success bg-opacity-10"
                : "border-danger bg-danger bg-opacity-10"
            }`}
          >
            <div className="d-flex justify-content-between align-items-start mb-3">
              <h5 className="fw-bold">
                Question {index + 1} ({question.points} pts)
              </h5>
              <span className={`badge ${isCorrect ? "bg-success" : "bg-danger"}`}>
                {isCorrect ? "✓ Correct" : "✗ Incorrect"} ({attemptAnswer?.pointsEarned || 0}/{question.points})
              </span>
            </div>

            <p className="mb-3">{question.question}</p>

            <div className="mb-2">
              <strong>Your Answer:</strong> {attemptAnswer?.answer || "(No answer)"}
            </div>

            {!isCorrect && shouldShowCorrectAnswers() && (
              <div className="text-success">
                <strong>Correct Answer:</strong> {getCorrectAnswer(question)}
              </div>
            )}
          </div>
        );
      })}

      <div className="d-flex justify-content-between mt-4">
        <Link href={`/Courses/${cid}/Quizzes/${qid}`} className="btn btn-outline-secondary">
          Quiz Details
        </Link>
        <div className="d-flex gap-2">
          {canRetakeQuiz() && (
            <Link href={`/Courses/${cid}/Quizzes/${qid}/Take`} className="btn btn-warning">
              Retake Quiz ({attemptCount}/{maxAttempts} attempts used)
            </Link>
          )}
          <Link href={`/Courses/${cid}/Quizzes`} className="btn btn-primary">
            Back to Quizzes
          </Link>
        </div>
      </div>
    </div>
  );
}