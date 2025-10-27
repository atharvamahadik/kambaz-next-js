"use client";
import { IoSearch } from "react-icons/io5";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function AssignmentControlButtons() {
  const { cid } = useParams(); // Get the course ID from the URL

  return (
    <div className="d-flex align-items-center mb-3">
      {/* Search Bar */}
      <div className="d-flex align-items-center border rounded px-2">
        <IoSearch className="fs-5 text-secondary" />
        <input
          type="text"
          placeholder="Search..."
          className="form-control border-0 ps-2"
          style={{ boxShadow: "none", width: "150px" }}
        />
      </div>

      {/* Buttons on the right */}
      <div className="d-flex align-items-center gap-2 ms-auto">
        <button className="btn btn-secondary">+ Group</button>
        
        {/* This Link navigates to the editor page to create a NEW assignment */}
        <Link
          href={`/Courses/${cid}/Assignments/Editor`}
          className="btn btn-danger"
        >
          + Assignment
        </Link>
      </div>
    </div>
  );
}