import { Button, CardTitle, Input } from "@src/components/common";
import { model } from "@src/hooks/tableClaim";
import { AssistanceRequestType } from "@src/models/tableClaim";
import { Form, Formik } from "formik";
import React from "react";
import { Modal } from "react-bootstrap";

interface Props {
  onClose: () => void;
}

export const AssistanceModal = ({ onClose }: Props): JSX.Element => {
  const initialValues = {
    message: ''
  };

  const onSubmit = async (values: any, helpers: any) => {
    try {
      await model().requestAssistance(AssistanceRequestType.OTHER, values.message);
      helpers.resetForm();
      onClose();
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
      <CardTitle
        title="Assistance"
        subTitle="Please fill in the form below to request assistance."
      />
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="p-4 d-flex flex-column gap-3">
              <Input name="message" label="What do you need assistance with?" required />
            </div>
            <div className="pb-2 sticky-bottom">
              <div className="d-flex gap-2 flex-equal-2 p-2 mx-3 rounded shadow-sm bg-white">
                <Button onClick={onClose} variant="gray" type="button">
                  Close
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  isLoading={isSubmitting}
                >
                  Send Request
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}