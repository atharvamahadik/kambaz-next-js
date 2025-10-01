import { IoSearch } from "react-icons/io5";

export default function AssignmentControlButtons() {
  return (
    <div className="d-flex align-items-center">
      <div className="d-flex align-items-center border rounded px-2">
        <IoSearch className="fs-5 text-secondary" />
        <input
          type="text"
          placeholder="Search..."
          className="form-control border-0 ps-2"
          style={{ boxShadow: "none", width: "150px" }}
        />
      </div>

      <div className="d-flex align-items-center gap-2 ms-auto">
        <button className="btn btn-secondary">+ Group</button>
        <button className="btn btn-danger">+ Assignment</button>
      </div>
    </div>
  );
}
