import { Button, CardTitle, Input } from "@src/components/common";
import { establishmentQueryKey, model, useGetEstablishement } from "@src/hooks/establishment";
import { queryClient } from "@src/utils";
import { Formik } from "formik";
import React, { useState } from "react"
import { Modal } from "react-bootstrap";
import { validationSchema } from "./validation";

interface Props {
  onClose: () => void;
}

export const EstablishmentModal = ({ onClose }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useGetEstablishement();

  const handleOnSubmit = async (values: any) => {
    setIsLoading(true);
    await model().update(values);
    await queryClient.invalidateQueries(establishmentQueryKey);
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
        title="Establishment"
        subTitle="Establishment details"
      />
      <Formik
        onSubmit={handleOnSubmit}
        initialValues={data}
        validationSchema={validationSchema}
      >
        {({ submitForm, values }) => (
          <>
            <div className="p-4 px-5">
              <div className="mb-3">
                <Input type="text" id="title" name="title" aria-describedby="title" label="Title" />
              </div>
              <div className="mb-3">
                <Input type="text" id="description" name="description" aria-describedby="description" label="Description" />
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