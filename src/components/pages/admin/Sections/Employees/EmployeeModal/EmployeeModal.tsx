import { Button, CardTitle, Input } from "@src/components/common";
import { employeeQueryKey, employeesQueryKey, model, useGetEmployee } from "@src/hooks/employee";
import { EmployeeRole } from "@src/models/employee";
import { capitalize, queryClient } from "@src/utils";
import { Formik } from "formik";
import React, { useState } from "react"
import { Modal } from "react-bootstrap";
import { validationSchema } from "./validation";

interface Props {
  onClose: () => void;
  id: number;
}

export const EmployeeModal = ({ onClose, id }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useGetEmployee(id);

  const handleOnSubmit = async (values: any) => {
    setIsLoading(true);
    await model().update(values);
    await queryClient.invalidateQueries(employeesQueryKey);
    await queryClient.invalidateQueries(employeeQueryKey(id));
    setIsLoading(false);
    onClose();
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
      <CardTitle
        title="Employee"
        subTitle="Update employee details"
      />
      <Formik
        onSubmit={handleOnSubmit}
        initialValues={data}
        validationSchema={validationSchema}
      >
        {({ submitForm }) => (
          <>
            <div className="p-4 px-5">
              <div className="mb-3">
                <Input type="text" id="firstName" name="firstName" aria-describedby="firstName" label="First name" />
              </div>
              <div className="mb-3">
                <Input type="text" id="lastName" name="lastName" aria-describedby="lastName" label="Last name" />
              </div>
              <div className="mb-3">
                <Input type="email" id="email" name="email" aria-describedby="email" label="Email address" />
              </div>
              <div className="mb-3">
                <label
                  className="form-label"
                  htmlFor="role"
                >
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  aria-describedby="role"
                  className="form-control"
                >
                  {
                    Object.values(EmployeeRole).map((role) => (
                      <option key={role} value={role}>{capitalize(role)}</option>
                    ))
                  }
                </select>
              </div>
            </div>

            <div className="pb-2 sticky-bottom">
              <div className="d-flex gap-2 flex-equal-2 p-2 mx-3 rounded shadow-sm bg-white">
                <Button variant="gray" onClick={onClose}>
                  Close
                </Button>
                <Button
                  type="submit"
                  onClick={submitForm}
                  disabled={isLoading}
                  isLoading={isLoading}
                >
                  Save
                </Button>
              </div>
            </div>
          </>
        )}
      </Formik>
    </Modal>
  );
};