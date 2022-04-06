import { Button } from "@src/components/common";
import { IconShoppingBasket } from "@src/components/icons";
import { useTable } from "@src/contexts/tableContext";
import { useGetDish } from "@src/hooks/dish";
import { model, useCalculatePrice } from "@src/hooks/order";
import { Option } from "@src/models/dish";
import { formatPrice } from "@src/utils/formatPrice";
import clsx from "clsx";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react"
import { Modal } from "react-bootstrap"
import { DishImage } from "../Dish/Dish.style";

interface Props {
  dishId: number;
  categoryId: number;
  onClose: () => void
}

export const DishOrder = ({ dishId, categoryId, onClose }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { tableClaim } = useTable();
  const { data } = useGetDish(categoryId, dishId);
  const [options, setOptions] = useState([] as number[]);
  const { data: priceData } = useCalculatePrice({ dishId, options });
  const [animation, setAnimation] = useState('initial');
  const [price, setPrice] = useState(data?.basePrice || 0);

  const handlePrice = (newPrice: string) => {
    setTimeout(() => setAnimation('goUp'), 0);
    setTimeout(() => setPrice(parseFloat(newPrice)), 100);
    setTimeout(() => setAnimation('waitDown'), 100);
    setTimeout(() => setAnimation('initial'), 200);
  }

  useEffect(() => {
    data?.basePrice && setPrice(data.basePrice);
  }, [data]);

  useEffect(() => {
    priceData && handlePrice(priceData)
  }, [priceData]);

  const updateOrder = (option: Option, toAdd: boolean) => {
    let currentOrder = options.filter((opt) => opt !== option.id);
    if (toAdd) {
      currentOrder.push(option.id);
    }

    currentOrder = currentOrder.sort((a, b) => a > b ? 1 : -1);
    setOptions(currentOrder);
    if (currentOrder.length === 0) {
      handlePrice(String(data.basePrice))
    }
  }

  const handleSubmit = async (values: any, helpers: any) => {
    setIsLoading(true);
    try {
      await model().sendOrder({
        tableClaimId: tableClaim.id,
        dishId,
        options,
        comment: ''
      });
      onClose();
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
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
            <h2 className="section-heading">{data.title}</h2>
            <div className="mb-3">
              <h5 className="text-primary"><strong>{data.basePrice == 0.00 ? 'Free' : <>{data.basePrice} &euro;</>}</strong></h5>
            </div>
            <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
          </div>

          <Formik
            onSubmit={handleSubmit}
            initialValues={{
              addon: []
            }}
          >
            {({ values }) => (
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

                <div className="pb-2 sticky-bottom">
                  <div className="d-flex gap-2 flex-equal-2 p-2 mx-3 rounded shadow-sm bg-white">
                    <Button variant="gray" onClick={onClose}>
                      Close
                    </Button>
                    <Button type="submit" isLoading={isLoading}>
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