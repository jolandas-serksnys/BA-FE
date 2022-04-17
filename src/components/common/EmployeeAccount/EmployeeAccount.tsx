import { Header } from "./EmployeeAccount.style";
import { Input } from "../Input";
import { Button } from "@src/components/common";
import { useAuth } from "@src/contexts/authContext";
import { useGetEstablishement } from "@src/hooks/establishment";
import { model } from "@src/hooks/user";
import { Employee } from "@src/models/employee";
import { capitalize } from "@src/utils";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";

interface Props {
  onClose: () => void;
}

export const EmployeeAccount = ({ onClose }: Props): JSX.Element => {
  const [showForm, setShowForm] = useState<string>(undefined);
  const { user: userGeneric, signOut, updatedEmployeeData } = useAuth();
  const user = userGeneric as Employee;
  const { data: establishment } = useGetEstablishement();

  const handleSubmit = async (values: any, helpers: any) => {
    switch (showForm) {
      case 'account':
        try {
          const updatedData = await model().employeeUpdateAccount(values);
          updatedEmployeeData(updatedData);
          setShowForm(undefined);
        } catch (error) {
          console.log(error);
        }
        break;

      case 'password':
        try {
          const updatedData = await model().employeeUpdatePassword(values);
          updatedEmployeeData(updatedData);
          setShowForm(undefined);
        } catch (error) {
          console.log(error);
        }
        break;

      default:
        break;
    }
  };

  return (
    <Modal
      show
      onHide={onClose}
      backdrop="static"
      keyboard={false}
      size="xl"
      dialogClassName="modal-dialog-bottom"
    >
      <>
        <Header className="bg-primary text-light">
          <h2 className="section-heading">{user.firstName} {user.lastName}</h2>
          <h5 className="section-heading m-0">
            {capitalize(user.role)} at {establishment ? <>{establishment.title}</> : <>loading...</>}
          </h5>
        </Header>

        <Formik initialValues={user} onSubmit={handleSubmit}>
          {({ submitForm }) => (
            <Form>
              <div className="p-4 d-flex flex-column gap-3">
                {!showForm &&
                  <>
                    <Button variant="gray" onClick={() => setShowForm('account')}>
                      Manage Account
                    </Button>
                    <Button variant="gray" onClick={() => setShowForm('password')}>
                      Change Password
                    </Button>
                    <Button variant="gray" onClick={signOut}>
                      Sign Out
                    </Button>
                  </>
                }
                {showForm === 'account' &&
                  <>
                    <Input name="email" label="Email addresss" type="email" disabled />
                    <Input name="firstName" label="First Name" />
                    <Input name="lastName" label="Last Name" />
                  </>
                }
                {showForm === 'password' &&
                  <>
                    <Input name="currentPassword" label="Current Password" type="password" />
                    <Input name="password" label="New Password" type="password" />
                    <Input name="passwordConfirmation" label="Repeat New Password" type="password" />
                  </>
                }
              </div>

              <div className="pb-2 sticky-bottom">
                <div className="d-flex gap-2 flex-equal-2 p-2 mx-3 rounded shadow-sm bg-white">
                  {showForm &&
                    <>
                      <Button onClick={() => setShowForm(undefined)} variant="gray">
                        Back
                      </Button>
                      <Button type="submit">
                        Save
                      </Button>
                    </>
                  }
                  {!showForm &&
                    <Button onClick={onClose}>
                      Close
                    </Button>
                  }
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </>
    </Modal>
  );
}