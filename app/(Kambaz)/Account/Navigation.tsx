"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { useSelector } from "react-redux";

interface User {
  _id: string;
  username: string;
  role: string;
}
interface RootState {
  accountReducer: {
    currentUser: User | null;
  };
}

export default function AccountNavigation() {
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const pathname = usePathname();

  return (
    <Nav variant="pills">
      {links.map((link) => (
        <NavItem key={link}>
          <NavLink
            as={Link}
            href={`/Account/${link}`}
            active={pathname.includes(`/Account/${link}`)}
          >
            {link}
          </NavLink>
          {currentUser && currentUser.role === "ADMIN" && (
            <NavLink
              as={Link}
              href={`/Account/Users`}
              active={pathname.endsWith("Users")}
            >
              {" "}
              Users{" "}
            </NavLink>
          )}
        </NavItem>
      ))}
    </Nav>
  );
}
