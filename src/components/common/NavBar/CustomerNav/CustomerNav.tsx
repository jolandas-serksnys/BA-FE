import { Nav, Navbar } from "react-bootstrap";
import React from "react";
import { IconSignOut } from "@src/components/icons";
import { useAuth } from "@src/contexts/authContext";
import { Customer } from "@src/models/customer";
import { useTable } from "@src/contexts/tableContext";
import { Button } from "../../Button";
import { TestableComponentProps } from "../../TestableComponent";
import clsx from "clsx";

interface Props extends TestableComponentProps {
  user: Customer
}

export const CustomerNav = ({ user }: Props) => {
  const { signOut } = useAuth();
  const { table, tableClaim } = useTable();

  return (
    <Nav className="ms-auto align-items-center gap-4">
      <Navbar.Text className="text-end">
        <span className="d-block">Hi there, <strong className="text-dark">{user.displayName}</strong></span>
        {table &&
          <div className="d-flex gap-3 align-items-center justify-content-end">
            <small>{table.displayName} <strong>#{String(table.id).padStart(4, '0')}</strong></small>
            <div className="avatar-group">
              {tableClaim && [user, ...tableClaim.customers.filter((customer) => customer.id !== user.id)].map((customer) => (
                <div className={clsx('avatar avatar-24 rounded-circle border border-2 border-light', (customer.id === tableClaim.ownerId ? 'bg-secondary text-white' : 'bg-gray text-dark'))} key={customer.id}>
                  <small className="d-inline-flex align-items-center justify-content-center">{customer.displayName[0]}</small>
                </div>
              ))}
            </div>
          </div>
        }
      </Navbar.Text>
      <Navbar.Text>
        <Button variant="gray" square onClick={signOut}><IconSignOut /></Button>
      </Navbar.Text>
    </Nav>
  );
};