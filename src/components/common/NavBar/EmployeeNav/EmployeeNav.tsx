import { Nav, Navbar } from "react-bootstrap";
import React, { useState } from "react";
import { IconAccountCircle, IconSignOut } from "@src/components/icons";
import { useAuth } from "@src/contexts/authContext";
import { Employee } from "@src/models/employee";
import { Button } from "../../Button";
import { TestableComponentProps } from "../../TestableComponent";
import { capitalize } from "@src/utils";
import { EmployeeAccount } from "../../EmployeeAccount";

interface Props extends TestableComponentProps {
  user: Employee
}

export const EmployeeNav = ({ user }: Props) => {
  const [showAccountModal, setShowAccountModal] = useState(false);
  const { signOut } = useAuth();
  return (
    <>
      <Nav className="ms-auto align-items-center gap-4">
        <Navbar.Text className="text-end">
          <span className="d-block">Hi there, <strong className="text-dark">{user.firstName} {user.lastName}</strong></span>
          <small>({capitalize(user.role.toString())})</small>
        </Navbar.Text>
        <Navbar.Text>
          <div className="d-flex gap-2">
            <Button variant="gray" square onClick={() => setShowAccountModal(true)}><IconAccountCircle /></Button>
            <Button variant="gray" square onClick={signOut}><IconSignOut /></Button>
          </div>
        </Navbar.Text>
      </Nav>
      {showAccountModal && <EmployeeAccount onClose={() => setShowAccountModal(false)} />}
    </>
  );
};