"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ListGroup, ListGroupItem, Dropdown } from "react-bootstrap";
import { FaRocket, FaCheckCircle, FaBan } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { BsGripVertical } from "react-icons/bs";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { deleteQuiz, setQuizzes, togglePublishQuiz } from "./reducer";
import QuizControlButtons from "./QuizControlButtons";
import * as client from "./client";

interface Quiz {
  _id: string;
  title: string;
  course: string;
  description?: string;
  points?: number;
  dueDate?: string;
  availableDate?: string;
  untilDate?: string;
  published: boolean;
  questions: any[];
}

interface User {
  _id: string;
  username: string;
  role: string;
}

interface RootState {
  quizzesReducer: { quizzes: Quiz[] };
  accountReducer: { currentUser: User | null };
}

export default function Quizzes() {
  const { cid } = useParams();
  const dispatch = useDispatch();

  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  const [userScores, setUserScores] = useState<Record<string, { score: number; total: number } | null>>({});

  const isFaculty = currentUser?.role === "FACULTY";

  const fetchQuizzes = async () => {
    let fetchedQuizzes;
    if (isFaculty) {
      fetchedQuizzes = await client.findQuizzesForCourse(cid as string);
    } else {
      fetchedQuizzes = await client.findPublishedQuizzesForCourse(cid as string);
    }
    dispatch(setQuizzes(fetchedQuizzes));
  };

  const fetchUserScores = async () => {
    if (!currentUser || isFaculty) return;

    const scores: Record<string, { score: number; total: number } | null> = {};
    for (const quiz of quizzes) {
      try {
        const attempt = await client.getLatestAttempt(quiz._id, currentUser._id);
        if (attempt) {
          scores[quiz._id] = { score: attempt.score, total: attempt.totalPoints };
        } else {
          scores[quiz._id] = null;
        }
      } catch {
        scores[quiz._id] = null;
      }
    }
    setUserScores(scores);
  };

  useEffect(() => {
    fetchQuizzes();
  }, [cid, currentUser]);

  useEffect(() => {
    if (quizzes.length > 0 && !isFaculty) {
      fetchUserScores();
    }
  }, [quizzes, currentUser]);

  const sortedQuizzes = [...quizzes].sort((a, b) => {
    const dateA = a.availableDate ? new Date(a.availableDate).getTime() : 0;
    const dateB = b.availableDate ? new Date(b.availableDate).getTime() : 0;
    return dateA - dateB;
  });

  const onRemoveQuiz = async (quizId: string) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      await client.deleteQuiz(quizId);
      dispatch(deleteQuiz(quizId));
    }
  };

  const onTogglePublish = async (quiz: Quiz) => {
    const updatedQuiz = { ...quiz, published: !quiz.published };
    await client.updateQuiz(quiz._id, updatedQuiz);
    dispatch(togglePublishQuiz(quiz._id));
  };

  const getAvailabilityStatus = (quiz: Quiz) => {
    const now = new Date();
    const availableDate = quiz.availableDate ? new Date(quiz.availableDate) : null;
    const untilDate = quiz.untilDate ? new Date(quiz.untilDate) : null;

    if (!availableDate) return "Not available";

    if (now < availableDate) {
      return `Not available until ${new Date(quiz.availableDate!).toLocaleDateString()}`;
    } else if (untilDate && now > untilDate) {
      return "Closed";
    } else {
      return "Available";
    }
  };

  const isQuizClosed = (quiz: Quiz) => {
    const now = new Date();
    const untilDate = quiz.untilDate ? new Date(quiz.untilDate) : null;
    return untilDate && now > untilDate;
  };

  const isQuizAvailable = (quiz: Quiz) => {
    const now = new Date();
    const availableDate = quiz.availableDate ? new Date(quiz.availableDate) : null;
    const untilDate = quiz.untilDate ? new Date(quiz.untilDate) : null;

    if (!availableDate) return false;
    if (now < availableDate) return false;
    if (untilDate && now > untilDate) return false;
    return true;
  };

  if (!currentUser) {
    return <div className="p-3">Please sign in to view quizzes.</div>;
  }

  return (
    <div id="wd-quizzes" className="p-3">
      {isFaculty && <QuizControlButtons />}

      {sortedQuizzes.length === 0 ? (
        <div className="text-center text-muted my-5">
          {isFaculty ? (
            <p>No quizzes available. Click &quot;+ Quiz&quot; to create one.</p>
          ) : (
            <p>No quizzes available for this course yet.</p>
          )}
        </div>
      ) : (
        <ListGroup>
          <ListGroupItem className="rounded-0 border-gray">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <BsGripVertical className="fs-4 me-2" />
                <h4 className="mb-0 fw-bold">Assignment Quizzes</h4>
              </div>
            </div>
          </ListGroupItem>

          {sortedQuizzes.map((quiz: Quiz) => {
            const closed = isQuizClosed(quiz);
            const available = isQuizAvailable(quiz);
            
            const canClick = isFaculty || available;

            return (
              <ListGroupItem key={quiz._id} className="p-3 wd-quiz-list-item ps-1">
                <div className="d-flex align-items-center">
                  <BsGripVertical className="fs-4 me-3" />
                  <FaRocket className={`fs-4 me-3 ${closed && !isFaculty ? "text-secondary" : "text-success"}`} />
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center gap-2">
                      {canClick ? (
                        <Link
                          href={`/Courses/${cid}/Quizzes/${quiz._id}`}
                          className="fw-bold text-dark text-decoration-none"
                        >
                          {quiz.title}
                        </Link>
                      ) : (
                        <span
                          className="fw-bold text-secondary"
                          style={{ cursor: "not-allowed" }}
                          title={closed ? "This quiz is closed" : "This quiz is not yet available"}
                        >
                          {quiz.title}
                        </span>
                      )}
                    </div>
                    <div className="text-muted small">
                      <span className={`fw-bold ${closed && !isFaculty ? "text-danger" : ""}`}>
                        {getAvailabilityStatus(quiz)}
                      </span>{" "}
                      | <span className="fw-bold">Due</span>{" "}
                      {quiz.dueDate ? new Date(quiz.dueDate).toLocaleDateString() : "No due date"}{" "}
                      | {quiz.points || 0} pts | {quiz.questions?.length || 0} Questions
                      {!isFaculty && userScores[quiz._id] && (
                        <span className="ms-2 text-primary fw-bold">
                          | Score: {userScores[quiz._id]!.score}/{userScores[quiz._id]!.total}
                        </span>
                      )}
                    </div>
                  </div>

                  {isFaculty && (
                    <div className="d-flex align-items-center gap-2 ms-3">
                      <span
                        onClick={() => onTogglePublish(quiz)}
                        style={{ cursor: "pointer" }}
                        title={quiz.published ? "Published - Click to unpublish" : "Unpublished - Click to publish"}
                      >
                        {quiz.published ? (
                          <FaCheckCircle className="fs-5 text-success" />
                        ) : (
                          <FaBan className="fs-5 text-secondary" />
                        )}
                      </span>
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="link"
                          className="text-dark p-0"
                          style={{ textDecoration: "none" }}
                        >
                          <IoEllipsisVertical className="fs-4" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item as={Link} href={`/Courses/${cid}/Quizzes/${quiz._id}/Editor`}>
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => onRemoveQuiz(quiz._id)}>
                            Delete
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => onTogglePublish(quiz)}>
                            {quiz.published ? "Unpublish" : "Publish"}
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  )}
                </div>
              </ListGroupItem>
            );
          })}
        </ListGroup>
      )}
    </div>
  );
}