import { Button, CardTitle, Input } from "@src/components/common";
import { Table } from "@src/models/table";
import { Field, Formik } from "formik";
import React from "react"
import { Modal } from "react-bootstrap";
import { validationSchema } from "./validation";

interface Props {
  title: string;
  subTitle: string;
  initialValues: Table;
  onSubmit: (values: any, helpers: any) => void;
  onClose: () => void;
  isLoading?: boolean;
}

export const TableModal = ({ title, subTitle, initialValues, onSubmit, onClose, isLoading }: Props) => {

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
        title={title}
        subTitle={subTitle}
      />
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({ submitForm, values }) => (
          <>
            <div className="p-4 px-5">
              <div className="mb-3">
                <Input type="text" id="displayName" name="displayName" aria-describedby="displayName" label="Display name" />
              </div>
              <div className="mb-3">
                <Input type="number" id="number" name="number" aria-describedby="number" label="Table number" disabled={values.useId} />
              </div>
              <div className="mb-3">
                <div className="form-check d-flex gap-3 align-items-center m-0 p-0">
                  <Field
                    type="checkbox"
                    id="useId"
                    name="useId"
                    className="form-check-input p-2 m-0"
                  />
                  <label className="form-check-label" htmlFor="useId">
                    Use table ID as code
                  </label>
                </div>
              </div>
              <div className="mb-3">
                <Input type="number" id="seats" name="seats" aria-describedby="seats" label="Seats" />
              </div>
              <div className="mb-3">
                <div className="form-check d-flex gap-3 align-items-center m-0 p-0">
                  <Field
                    type="checkbox"
                    id="isAvailable"
                    name="isAvailable"
                    className="form-check-input p-2 m-0"
                  />
                  <label className="form-check-label" htmlFor="isAvailable">
                    Table is accepting customers
                  </label>
                </div>
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
                  isLoading={isLoading}
                  disabled={isLoading}
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