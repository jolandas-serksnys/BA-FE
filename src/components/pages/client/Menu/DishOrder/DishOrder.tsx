import { Button, Input } from "@src/components/common";
import { IconShoppingBasket } from "@src/components/icons";
import { useTable } from "@src/contexts/tableContext";
import { useGetDish } from "@src/hooks/dish";
import { model, useCalculatePrice } from "@src/hooks/order";
import { usePriceAnimation } from "@src/hooks/usePriceAnimation";
import { Option } from "@src/models/dish";
import { TableClaimStatus } from "@src/models/tableClaim";
import { formatPrice } from "@src/utils/formatPrice";
import clsx from "clsx";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react"
import { Badge, Modal } from "react-bootstrap"
import { DishImage } from "../Dish/Dish.style";

interface Props {
  dishId: number;
  categoryId: number;
  onClose: () => void
}

export const DishOrder = ({ dishId, categoryId, onClose }: Props) => {
  const [options, setOptions] = useState([] as number[]);
  const [quantity, setQuantity] = useState(1);
  const { tableClaim } = useTable();
  const { data } = useGetDish(categoryId, dishId);
  const { data: priceData } = useCalculatePrice({ dishId, options, quantity });
  const [price, setPrice] = useState(data?.basePrice || 0);
  const { changeValue, animation } = usePriceAnimation();

  useEffect(() => {
    data?.basePrice && setPrice(data.basePrice);
  }, [data]);

  useEffect(() => {
    priceData && changeValue(priceData, setPrice)
  }, [priceData]);

  const updateOrder = (option: Option, toAdd: boolean) => {
    let currentOrder = options.filter((opt) => opt !== option.id);
    if (toAdd) {
      currentOrder.push(option.id);
    }

    currentOrder = currentOrder.sort((a, b) => a > b ? 1 : -1);
    setOptions(currentOrder);
    if (currentOrder.length === 0) {
      changeValue(`${data.basePrice}`, setPrice)
    }
  }

  const handleSubmit = async (values: any, helpers: any) => {
    try {
      await model().sendOrder({
        tableClaimId: tableClaim.id,
        dishId,
        options,
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
      {data &&
        <div>
          <DishImage src={data.imageUrl} height="20rem" borderRadius="0.75rem" />

          <div className="p-5 pb-3">
            {tableClaim.status === TableClaimStatus.CLOSED &&
              <div className="card bg-danger text-white p-3 px-4 mb-4">
                You may no longer order new dishes, because the staff has closed your closed your table.
              </div>
            }
            <h2 className="section-heading">{data.title}</h2>
            <div className="mb-3 d-flex gap-3 align-items-center">
              {data.ageRestriction &&
                <h5>
                  <Badge>
                    {data.ageRestriction}
                  </Badge>
                </h5>
              }
              <h5 className="text-primary">
                <strong>{data.basePrice == 0.00 ? 'Free' : <>{data.basePrice} &euro;</>}</strong>
              </h5>
            </div>
            <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
          </div>

          <Formik
            onSubmit={handleSubmit}
            initialValues={{
              addon: [],
              comment: ''
            }}
          >
            {({ values, isSubmitting }) => (
              <Form>
                {data.addons && data.addons.length > 0 &&
                  <div className="p-4 px-5 border-top border-gray mt-2">
                    <h4 className="section-heading">Addons</h4>
                    <div className="row">
                      {data.addons.map((addon, addonIndex) =>
                        <div key={addon.id} className="col-12 col-lg-6 mb-2">
                          <h6 className="section-heading">{addon.title}</h6>
                          <div>
                            {addon.options && addon.options.map((option, optionIndex) =>
                              <div className="py-1" key={option.id}>
                                <div className="form-check d-flex gap-3 align-items-center m-0 p-0">
                                  <Field
                                    type="checkbox"
                                    id={`addon[${addonIndex}].option[${optionIndex}]`}
                                    name={`addon[${addonIndex}].option[${optionIndex}]`}
                                    value={`${option.id}`}
                                    className="form-check-input p-2 m-0"
                                    onChange={(checkValue: any) => {
                                      updateOrder(option, checkValue.target.checked);
                                    }}
                                    checked={values[`addon[${addonIndex}].option[${optionIndex}]`]}
                                  />
                                  <label className="form-check-label d-flex justify-content-between align-items-center w-100" htmlFor={`addon[${addonIndex}].option[${optionIndex}]`}>
                                    <span>{option.title}</span>
                                    <span>{formatPrice(option.price)}</span>
                                  </label>
                                </div>
                              </div>
                            )}
                          </div>
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
                          onClick={() => setQuantity(quantity - 1)}
                          disabled={quantity === 1}
                          type="button"
                        >
                          -
                        </button>
                        <input
                          className="form-control text-center"
                          type="number"
                          name="quantity"
                          placeholder="1"
                          value={quantity}
                          onChange={(e: any) => setQuantity(parseInt(e.target.value))}
                          min={1}
                        />
                        <button
                          className="btn btn-dark"
                          onClick={() => setQuantity(quantity + 1)}
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
                    <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting || tableClaim.status === TableClaimStatus.CLOSED}>
                      <div className="d-inline-flex gap-2 align-items-center">
                        <div className="d-inline"><IconShoppingBasket /></div>
                        <span>
                          Order now
                          (<span className={clsx('price', animation)}>{formatPrice(price as number)}</span>)
                        </span>
                      </div>
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      }
    </Modal>
  );
};