"use client";
import { IoSearch } from "react-icons/io5";
import { IoEllipsisVertical } from "react-icons/io5";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function QuizControlButtons() {
  const { cid } = useParams();

  return (
    <div className="d-flex align-items-center mb-3">
      <div className="d-flex align-items-center border rounded px-2">
        <IoSearch className="fs-5 text-secondary" />
        <input
          type="text"
          placeholder="Search for Quiz"
          className="form-control border-0 ps-2"
          style={{ boxShadow: "none", width: "200px" }}
        />
      </div>

      <div className="d-flex align-items-center gap-2 ms-auto">
        <Link
          href={`/Courses/${cid}/Quizzes/Editor`}
          className="btn btn-danger"
        >
          + Quiz
        </Link>
        <button className="btn btn-secondary">
          <IoEllipsisVertical className="fs-5" />
        </button>
      </div>
    </div>
  );
}