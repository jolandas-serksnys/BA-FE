import { Button, CardTitle, Input } from "@src/components/common";
import { IconAdd, IconDelete } from "@src/components/icons";
import { Addon } from "@src/models/dish";
import { Field, FieldArray, Form, Formik } from "formik";
import React from "react"
import { Modal } from "react-bootstrap";
import { validationSchema } from "./validation";

interface Props {
  title: string;
  subTitle: string;
  initialValues: Addon;
  onSubmit: (values: any, helpers: any) => void;
  onClose: () => void;
  isLoading?: boolean;
  isEdit?: boolean;
}

export const AddonModal = ({
  title,
  subTitle,
  initialValues,
  onSubmit,
  onClose,
  isLoading
}: Props) => (
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
      {({ values, isSubmitting, setFieldValue }) => (
        <Form>
          <div className="p-4 px-5">
            <div className="mb-3">
              <Input type="text" id="title" name="title" aria-describedby="title" label="Title" />
            </div>
            <div className="mb-3 row">
              <div className="col-12 col-md-6">
                <div className="form-check d-flex gap-3 align-items-center m-0 p-0">
                  <Field
                    type="checkbox"
                    id="isOptional"
                    name="isOptional"
                    className="form-check-input p-2 m-0"
                  />
                  <label className="form-check-label" htmlFor="isOptional">
                    Is optional
                  </label>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="form-check d-flex gap-3 align-items-center m-0 p-0">
                  <Field
                    type="checkbox"
                    id="isMultiple"
                    name="isMultiple"
                    className="form-check-input p-2 m-0"
                  />
                  <label className="form-check-label" htmlFor="isMultiple">
                    Is multichoice
                  </label>
                </div>
              </div>
            </div>

            <FieldArray name="options">
              {({ push, remove }) => (
                <>
                  {values.options.map((_option: any, index: number) => (
                    <div className="mb-3 d-flex gap-3 flex-column flex-lg-row" key={index}>
                      <div className="w-100">
                        <Input
                          type="text"
                          id={`options[${index}].title`}
                          name={`options[${index}].title`}
                          aria-describedby="options"
                          label={`Option #${index + 1} title`}
                        />
                      </div>
                      <div className="w-100">
                        <Input
                          type="number"
                          id={`options[${index}].price`}
                          name={`options[${index}].price`}
                          aria-describedby="options"
                          label={`Option #${index + 1} Price`}
                        />
                      </div>
                      <div className="col mt-1">
                        <label className="form-label">&nbsp;</label>
                        <Button
                          variant="danger"
                          size="xs"
                          onClick={() => {
                            if (values.options[index].id) {
                              setFieldValue(`options[${index}].isDeleted`, !values.options[index].isDeleted);
                            } else {
                              remove(index);
                            }
                          }}
                          type="button"
                          disabled={isLoading}
                          outline={!values.options[index].isDeleted}
                        >
                          <div className="d-flex gap-2"><IconDelete /> <span className="d-md-none">{`Remove option #${index}`}</span></div>
                        </Button>
                      </div>
                    </div>
                  ))}

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      push({ title: 'New option', price: 0, isDeleted: false })
                    }}
                    type="button"
                    disabled={isLoading}
                  >
                    <div className="d-flex gap-2"><IconAdd /> Add more</div>
                  </Button>
                </>
              )}
            </FieldArray>
          </div>

          <div className="pb-2 sticky-bottom">
            <div className="d-flex gap-2 flex-equal-2 p-2 mx-3 rounded shadow-sm bg-white">
              <Button variant="gray" onClick={onClose}>
                Close
              </Button>
              <Button
                type="submit"
                isLoading={isSubmitting || isLoading}
                disabled={isSubmitting || isLoading}
              >
                Save
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  </Modal>
);