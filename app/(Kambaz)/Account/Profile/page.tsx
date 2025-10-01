import Link from "next/link";
import { Form, FormControl } from "react-bootstrap";

export default function Profile() {
  return (
   <div id="wd-profile-screen" 
   style={{ maxWidth: "400px"}}>
  <h3 className="mb-3">Profile</h3>
  <FormControl 
    id="wd-username" 
    defaultValue="alice" 
    placeholder="username" 
    className="mb-2" 
  />
  <FormControl 
    id="wd-password" 
    defaultValue="123" 
    placeholder="password" 
    type="password" 
    className="mb-2" 
  />
  <FormControl 
    id="wd-firstname" 
    defaultValue="Alice" 
    placeholder="First Name" 
    className="mb-2" 
  />
  <FormControl 
    id="wd-lastname" 
    defaultValue="Wonderland" 
    placeholder="Last Name" 
    className="mb-2" 
  />
  <FormControl 
    id="wd-dob" 
    defaultValue="2000-11-08" 
    type="date" 
    className="mb-2" 
  />
  <FormControl 
    id="wd-email" 
    defaultValue="alice@wonderland.com" 
    type="email" 
    className="mb-2" 
  />
  <Form.Select id="wd-role" defaultValue="FACULTY" className="mb-3">
    <option value="USER">User</option>
    <option value="ADMIN">Admin</option>
    <option value="FACULTY">Faculty</option>
    <option value="STUDENT">Student</option>
  </Form.Select>
  <Link 
    id="wd-signout-btn" 
    href="/Account/Signin" 
    className="btn btn-primary mb-2 bg-danger"
    style={{ width: "auto", minWidth: "120px" }}
  >
    Sign out
  </Link>
</div>
  );
}
