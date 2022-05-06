import { Header } from "./EmployeeAccount.style";
import { Input } from "../Input";
import { Button } from "@src/components/common";
import { useAuth } from "@src/contexts/authContext";
import { useGetEstablishement } from "@src/hooks/establishment";
import { model } from "@src/hooks/user";
import { Employee } from "@src/models/employee";
import { capitalize } from "@src/utils";
import { Form, Formik, FormikHelpers } from "formik";
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

  const handleSubmitAccount = async (values: any, { resetForm }: FormikHelpers<any>) => {
    try {
      const updatedData = await model().employeeUpdateAccount(values);
      updatedEmployeeData(updatedData);
      setShowForm(undefined);
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitPassword = async (values: any, { resetForm }: FormikHelpers<any>) => {
    try {
      const updatedData = await model().employeeUpdatePassword(values);
      if (updatedData) {
        updatedEmployeeData(updatedData);
        setShowForm(undefined);
        resetForm();
      }
    } catch (error) {
      console.log(error);
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

        {showForm === 'account' &&
          <Formik initialValues={user} onSubmit={handleSubmitAccount}>
            {() => (
              <Form>
                <div className="p-4 d-flex flex-column gap-3">
                  <Input name="email" label="Email addresss" type="email" disabled />
                  <Input name="firstName" label="First Name" />
                  <Input name="lastName" label="Last Name" />
                </div>

                <div className="pb-2 sticky-bottom">
                  <div className="d-flex gap-2 flex-equal-2 p-2 mx-3 rounded shadow-sm bg-white">
                    <Button onClick={() => setShowForm(undefined)} variant="gray">
                      Back
                    </Button>
                    <Button type="submit">
                      Save
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        }

        {showForm === 'password' &&
          <Formik initialValues={{
            currentPassword: '',
            password: '',
            passwordConfirmation: ''
          }} onSubmit={handleSubmitPassword}>
            {() => (
              <Form>
                <div className="p-4 d-flex flex-column gap-3">
                  <Input name="currentPassword" label="Current Password" type="password" />
                  <Input name="password" label="New Password" type="password" />
                  <Input name="passwordConfirmation" label="Repeat New Password" type="password" />
                </div>

                <div className="pb-2 sticky-bottom">
                  <div className="d-flex gap-2 flex-equal-2 p-2 mx-3 rounded shadow-sm bg-white">
                    <Button onClick={() => setShowForm(undefined)} variant="gray">
                      Back
                    </Button>
                    <Button type="submit">
                      Save
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        }
        {!showForm &&
          <>
            <div className="p-4 d-flex flex-column gap-3">
              <Button variant="gray" onClick={() => setShowForm('account')}>
                Manage Account
              </Button>
              <Button variant="gray" onClick={() => setShowForm('password')}>
                Change Password
              </Button>
              <Button variant="gray" onClick={signOut}>
                Sign Out
              </Button>
            </div>

            <div className="pb-2 sticky-bottom">
              <div className="d-flex gap-2 flex-equal-2 p-2 mx-3 rounded shadow-sm bg-white">
                <Button onClick={onClose}>
                  Close
                </Button>
              </div>
            </div>
          </>
        }
      </>
    </Modal>
  );
}