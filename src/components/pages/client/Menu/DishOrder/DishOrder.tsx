import { Button, Input } from "@src/components/common";
import { IconShoppingBasket } from "@src/components/icons";
import { useTable } from "@src/contexts/tableContext";
import { model, useCalculatePrice } from "@src/hooks/order";
import { usePriceAnimation } from "@src/hooks/usePriceAnimation";
import { Addon, Dish, Option } from "@src/models/dish";
import { TableClaimStatus } from "@src/models/tableClaim";
import { formatPrice } from "@src/utils/formatPrice";
import clsx from "clsx";
import { Field, FieldArray, Form, Formik, useFormik } from "formik";
import React, { useEffect, useState } from "react"
import { Badge, Modal } from "react-bootstrap"
import { DishImage } from "../Dish/Dish.style";

interface Props {
  dish: Dish;
  onClose: () => void
}

interface FieldValueProps {
  comment: string;
  quantity: number;
  addons: {
    id: number;
    options: number | number[] | undefined;
  }[]
}

export const DishOrder = ({ dish, onClose }: Props) => {
  const { tableClaim } = useTable();
  const { changeValue, animation } = usePriceAnimation();
  const [price, setPrice] = useState(dish.basePrice);
  const [quantity, setQuantity] = useState<number>(1);
  const [options, setOptions] = useState<number[]>([]);
  const { data: priceData } = useCalculatePrice(dish.id, options, quantity);

  useEffect(() => {
    if (priceData) {
      changeValue(priceData, setPrice);
    }
  }, [priceData]);

  const initialValues: FieldValueProps = {
    comment: '',
    quantity: 1,
    addons: dish.addons.map((addon: Addon) => ({
      id: addon.id,
      options: !addon.isMultiple && addon.isOptional ? addon.options[0].id : addon.isMultiple ? [] as number[] : undefined
    }))
  };

  const handleSubmit = async (values: any, helpers: any) => {
    try {
      await model().sendOrder({
        tableClaimId: tableClaim.id,
        dishId: dish.id,
        options: options,
        comment: values.comment,
        quantity
      });
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
      <div>
        <DishImage src={dish.imageUrl} height="20rem" borderRadius="0.75rem" />

        <div className="p-5 pb-3">
          {tableClaim.status === TableClaimStatus.CLOSED &&
            <div className="card bg-danger text-white p-3 px-4 mb-4">
              You may no longer order new dishes, because the staff has closed your closed your table.
            </div>
          }
          <h2 className="section-heading">{dish.title}</h2>
          <div className="mb-3 d-flex gap-3 align-items-center">
            {dish.warningLabel &&
              <h5>
                <Badge>
                  {dish.warningLabel}
                </Badge>
              </h5>
            }
            <h5 className="text-primary">
              <strong>{dish.basePrice == 0.00 ? 'Free' : <>{dish.basePrice} &euro;</>}</strong>
            </h5>
          </div>
          <div dangerouslySetInnerHTML={{ __html: dish.description }}></div>
        </div>

        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, handleChange }) => (
            <Form>
              {dish.addons && dish.addons.length > 0 &&
                <div className="p-4 px-5 border-top border-gray mt-2">
                  <h4 className="section-heading">Addons</h4>
                  <div className="row">
                    {dish.addons.map((addon: Addon, addonIndex: number) =>
                      <div key={addon.id} className="col-12 col-lg-6 mb-2">
                        <h6 className="section-heading">{addon.title}</h6>
                        <FieldArray
                          name={`addons[${addonIndex}].options`}
                          render={() => (
                            <div>
                              {!addon.isMultiple && addon.isOptional &&
                                <div className="py-1">
                                  <div className="form-check d-flex gap-3 align-items-center m-0 p-0">
                                    <Field
                                      type={addon.isMultiple ? 'checkbox' : 'radio'}
                                      id={`addons[${addonIndex}].options[${addon.options.length}]`}
                                      name={`addons[${addonIndex}].options`}
                                      className="form-check-input p-2 m-0"
                                      onChange={(e: any) => {
                                        const checked = e.target.checked;

                                        if (checked) {
                                          const addonOptions = addon.options.map((option: Option) => option.id);
                                          setOptions([...options.filter((opt) => !addonOptions.includes(opt))].sort());
                                        }

                                        handleChange(e);
                                      }}
                                    />
                                    <label
                                      className="form-check-label d-flex justify-content-between align-items-center w-100"
                                      htmlFor={`addons[${addonIndex}].options[${addon.options.length}]`}
                                    >
                                      <span>Not selected</span>
                                      <span>Free</span>
                                    </label>
                                  </div>
                                </div>
                              }
                              {addon.options && addon.options.map((option: Option, optionIndex: number) =>
                                <div className="py-1" key={option.id}>
                                  <div className="form-check d-flex gap-3 align-items-center m-0 p-0">
                                    <Field
                                      type={addon.isMultiple ? 'checkbox' : 'radio'}
                                      id={`addons[${addonIndex}].options[${optionIndex}]`}
                                      name={`addons[${addonIndex}].options`}
                                      value={`${option.id}`}
                                      className="form-check-input p-2 m-0"
                                      onChange={(e: any) => {
                                        const checked = e.target.checked;
                                        const addonOptions = addon.options.map((option: Option) => option.id);

                                        if (checked && addon.isMultiple) {
                                          setOptions([...options.filter((o) => o != option.id), option.id].sort());
                                        } else if (checked && !addon.isMultiple) {
                                          setOptions([...options.filter((o) => !addonOptions.includes(o)), option.id].sort());
                                        } else {
                                          setOptions([...options.filter((o) => o != option.id)].sort());
                                        }

                                        handleChange(e);
                                      }}
                                    />
                                    <label
                                      className="form-check-label d-flex justify-content-between align-items-center w-100"
                                      htmlFor={`addons[${addonIndex}].options[${optionIndex}]`}
                                    >
                                      <span>{option.title}</span>
                                      <span>{formatPrice(option.price)}</span>
                                    </label>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        />
                      </div>
                    )}
                  </div>
                </div>
              }

              <div className="p-4 px-5 border-top border-gray mt-2">
                <div className="row">
                  <div className="col-12 col-lg-8">
                    <Input
                      type="text"
                      name="comment"
                      placeholder="Please serve this cold..."
                      label="Comment"
                    />
                  </div>
                  <div className="col-12 col-lg-4">
                    <label className="form-label" htmlFor="quantity">Quantity</label>
                    <div className="input-group">
                      <button
                        className="btn btn-dark"
                        onClick={() => {
                          setFieldValue('quantity', values.quantity - 1);
                          setQuantity(values.quantity - 1);
                        }}
                        disabled={values.quantity === 1}
                        type="button"
                      >
                        -
                      </button>
                      <input
                        className="form-control text-center"
                        type="number"
                        name="quantity"
                        placeholder="1"
                        value={values.quantity}
                        onChange={
                          (e: any) => {
                            handleChange(e);
                            setQuantity(Number(e.target.value));
                          }
                        }
                        min={1}
                      />
                      <button
                        className="btn btn-dark"
                        onClick={() => {
                          setFieldValue('quantity', values.quantity + 1);
                          setQuantity(values.quantity + 1);
                        }}
                        type="button"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="pb-2 sticky-bottom"
                style={{
                  zIndex: 2,
                }}
              >
                <div className="d-flex gap-2 flex-equal-2 p-2 mx-3 rounded shadow-sm bg-white">
                  <Button variant="gray" onClick={onClose}>
                    Close
                  </Button>
                  <Button type="submit" disabled={tableClaim.status === TableClaimStatus.CLOSED}>
                    <div className="d-inline-flex gap-2 align-items-center">
                      <div className="d-inline"><IconShoppingBasket /></div>
                      <span>
                        Order now
                        (<span className={clsx('price', animation)}>{formatPrice(price)}</span>)
                      </span>
                    </div>
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>

      </div>
    </Modal>
  );
};