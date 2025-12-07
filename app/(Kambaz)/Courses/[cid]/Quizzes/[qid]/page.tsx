"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaCheckCircle, FaBan } from "react-icons/fa";
import * as client from "../client";

interface Question {
  _id: string;
  title: string;
  type: string;
  points: number;
  question: string;
}

interface Quiz {
  _id: string;
  title: string;
  description: string;
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

interface Attempt {
  _id: string;
  score: number;
  totalPoints: number;
  attemptNumber: number;
  submittedAt: string;
  answers: any[];
}

interface User {
  _id: string;
  username: string;
  role: string;
}

interface RootState {
  accountReducer: { currentUser: User | null };
}

export default function QuizDetails() {
  const params = useParams();
  const { cid, qid } = params;

  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [latestAttempt, setLatestAttempt] = useState<Attempt | null>(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!qid) return;

      setLoading(true);
      setError(null);

      try {
        const quizData = await client.findQuizById(qid as string);

        if (!quizData) {
          setError("Quiz not found");
          setLoading(false);
          return;
        }

        setQuiz(quizData);
      } catch (err: any) {
        console.error("Error fetching quiz:", err);
        setError(err.message || "Failed to load quiz");
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [qid]);

  useEffect(() => {
    const fetchAttemptData = async () => {
      if (!currentUser || isFaculty || !qid) return;

      try {
        const attempt = await client.getLatestAttempt(qid as string, currentUser._id);
        setLatestAttempt(attempt);
        const countData = await client.getAttemptCount(qid as string, currentUser._id);
        setAttemptCount(countData.count);
      } catch (err) {
        console.error("Error fetching attempt data:", err);
      }
    };

    if (quiz && currentUser) {
      fetchAttemptData();
    }
  }, [quiz, currentUser, isFaculty, qid]);

  const handleTogglePublish = async () => {
    if (!quiz) return;
    const updatedQuiz = { ...quiz, published: !quiz.published };
    await client.updateQuiz(quiz._id, updatedQuiz);
    setQuiz(updatedQuiz);
  };

  const getMaxAttempts = () => {
    if (!quiz) return 1;
    return quiz.multipleAttempts ? quiz.howManyAttempts : 1;
  };

  const canTakeQuiz = () => {
    if (!quiz) return false;
    const maxAttempts = getMaxAttempts();
    return attemptCount < maxAttempts;
  };

  const getAvailabilityStatus = () => {
    if (!quiz) return "Not available";
    const now = new Date();
    const availableDate = quiz.availableDate ? new Date(quiz.availableDate) : null;
    const untilDate = quiz.untilDate ? new Date(quiz.untilDate) : null;

    if (!availableDate) return "Available";
    if (now < availableDate) return "Not yet available";
    if (untilDate && now > untilDate) return "Closed";
    return "Available";
  };

  if (loading) {
    return <div className="p-3">Loading quiz...</div>;
  }

  if (error) {
    return (
      <div className="p-3">
        <div className="alert alert-danger">
          <h5>Error loading quiz</h5>
          <p>{error}</p>
        </div>
        <Link href={`/Courses/${cid}/Quizzes`} className="btn btn-primary">
          Back to Quizzes
        </Link>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="p-3">
        <div className="alert alert-warning">Quiz not found.</div>
        <Link href={`/Courses/${cid}/Quizzes`} className="btn btn-primary">
          Back to Quizzes
        </Link>
      </div>
    );
  }

  if (!currentUser) {
    return <div className="p-3">Please sign in to view this quiz.</div>;
  }

  return (
    <div id="wd-quiz-details" className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">{quiz.title}</h3>
        <div className="d-flex gap-2">
          {isFaculty ? (
            <>
              <Button
                variant={quiz.published ? "warning" : "success"}
                onClick={handleTogglePublish}
              >
                {quiz.published ? "Unpublish" : "Publish"}
              </Button>
              <Link href={`/Courses/${cid}/Quizzes/${qid}/Preview`} className="btn btn-secondary">
                Preview
              </Link>
              <Link href={`/Courses/${cid}/Quizzes/${qid}/Editor`} className="btn btn-secondary">
                Edit
              </Link>
            </>
          ) : (
            <>
              {canTakeQuiz() && getAvailabilityStatus() === "Available" ? (
                <Link href={`/Courses/${cid}/Quizzes/${qid}/Take`} className="btn btn-danger">
                  {attemptCount > 0 ? "Retake Quiz" : "Start Quiz"}
                </Link>
              ) : (
                <Button variant="secondary" disabled>
                  {getAvailabilityStatus() !== "Available"
                    ? getAvailabilityStatus()
                    : "No Attempts Remaining"}
                </Button>
              )}
              {latestAttempt && (
                <Link href={`/Courses/${cid}/Quizzes/${qid}/Results`} className="btn btn-primary">
                  View Last Attempt
                </Link>
              )}
            </>
          )}
        </div>
      </div>

      {!isFaculty && (
        <div className="alert alert-info mb-4">
          <div className="d-flex justify-content-between">
            <div>
              <strong>Attempts:</strong> {attemptCount} / {getMaxAttempts()}
            </div>
            {latestAttempt && (
              <div>
                <strong>Last Score:</strong> {latestAttempt.score} / {latestAttempt.totalPoints}
                ({Math.round((latestAttempt.score / latestAttempt.totalPoints) * 100)}%)
              </div>
            )}
          </div>
          {latestAttempt && (
            <div className="mt-2 text-muted small">
              Last attempt: {new Date(latestAttempt.submittedAt).toLocaleString()}
            </div>
          )}
        </div>
      )}

      <div className="border rounded p-4">
        <div className="row mb-3">
          <div className="col-4 fw-bold">Quiz Type</div>
          <div className="col-8">{quiz.quizType}</div>
        </div>

        <div className="row mb-3">
          <div className="col-4 fw-bold">Points</div>
          <div className="col-8">{quiz.points}</div>
        </div>

        <div className="row mb-3">
          <div className="col-4 fw-bold">Assignment Group</div>
          <div className="col-8">{quiz.assignmentGroup}</div>
        </div>

        <div className="row mb-3">
          <div className="col-4 fw-bold">Shuffle Answers</div>
          <div className="col-8">{quiz.shuffleAnswers ? "Yes" : "No"}</div>
        </div>

        <div className="row mb-3">
          <div className="col-4 fw-bold">Time Limit</div>
          <div className="col-8">{quiz.timeLimit} Minutes</div>
        </div>

        <div className="row mb-3">
          <div className="col-4 fw-bold">Multiple Attempts</div>
          <div className="col-8">{quiz.multipleAttempts ? "Yes" : "No"}</div>
        </div>

        {quiz.multipleAttempts && (
          <div className="row mb-3">
            <div className="col-4 fw-bold">How Many Attempts</div>
            <div className="col-8">{quiz.howManyAttempts}</div>
          </div>
        )}

        <div className="row mb-3">
          <div className="col-4 fw-bold">Show Correct Answers</div>
          <div className="col-8">{quiz.showCorrectAnswers || "Not specified"}</div>
        </div>

        {isFaculty && (
          <div className="row mb-3">
            <div className="col-4 fw-bold">Access Code</div>
            <div className="col-8">{quiz.accessCode || "None"}</div>
          </div>
        )}

        <div className="row mb-3">
          <div className="col-4 fw-bold">One Question at a Time</div>
          <div className="col-8">{quiz.oneQuestionAtTime ? "Yes" : "No"}</div>
        </div>

        <div className="row mb-3">
          <div className="col-4 fw-bold">Webcam Required</div>
          <div className="col-8">{quiz.webcamRequired ? "Yes" : "No"}</div>
        </div>

        <div className="row mb-3">
          <div className="col-4 fw-bold">Lock Questions After Answering</div>
          <div className="col-8">{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</div>
        </div>

        <hr />

        <div className="row mb-3">
          <div className="col-4 fw-bold">Due Date</div>
          <div className="col-8">
            {quiz.dueDate ? new Date(quiz.dueDate).toLocaleDateString() : "Not set"}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-4 fw-bold">Available Date</div>
          <div className="col-8">
            {quiz.availableDate ? new Date(quiz.availableDate).toLocaleDateString() : "Not set"}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-4 fw-bold">Until Date</div>
          <div className="col-8">
            {quiz.untilDate ? new Date(quiz.untilDate).toLocaleDateString() : "Not set"}
          </div>
        </div>

        <hr />

        {isFaculty && (
          <div className="row mb-3">
            <div className="col-4 fw-bold">Published</div>
            <div className="col-8">
              {quiz.published ? (
                <span className="d-flex align-items-center gap-2">
                  <FaCheckCircle className="text-success" /> Published
                </span>
              ) : (
                <span className="d-flex align-items-center gap-2">
                  <FaBan className="text-secondary" /> Unpublished
                </span>
              )}
            </div>
          </div>
        )}

        <div className="row">
          <div className="col-4 fw-bold">Number of Questions</div>
          <div className="col-8">{quiz.questions?.length || 0}</div>
        </div>
      </div>
    </div>
  );
}