import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import React from "react";
import { useAuth } from "@src/contexts/authContext";
import { Customer } from "@src/models/customer";
import { Employee } from "@src/models/employee";
import { CustomerNav } from "./CustomerNav";
import { EmployeeNav } from "./EmployeeNav";

export const NavBar = () => {
  const { user } = useAuth();

  return (
    <Navbar className="py-3">
      <Container>
        <Navbar.Text>
          <Link to="/" className="navbar-brand text-primary">Delish.lt</Link>
        </Navbar.Text>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id="navbar">
          {user && (
            <>
              {!user.isEmployee && <CustomerNav user={user as Customer} />}
              {user.isEmployee && <EmployeeNav user={user as Employee} />}
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}