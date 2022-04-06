import { Button } from "@src/components/common";
import { Layout } from "@src/components/common/Layout";
import { useAuth } from "@src/contexts/authContext";
import { useTable } from "@src/contexts/tableContext";
import { model, orderClaimQueryKey, useGetTableOrder } from "@src/hooks/order";
import { CustomerOrderStatus } from "@src/models/order";
import { capitalize, queryClient } from "@src/utils";
import clsx from "clsx";
import React from "react";

export const OrdersPage = () => {
  const [isLoadingCancel, setIsLoadingCancel] = React.useState(false);
  const { user } = useAuth();
  const { tableClaim } = useTable();
  const { data, isLoading } = useGetTableOrder(tableClaim.id);

  if (isLoading) {
    return <>Loading...</>;
  }

  const formatDate = (date: string) => {
    const dateObj = new Date(date);

    return `${dateObj.getHours()}:${dateObj.getMinutes()}`;
  };

  const cencelOrder = async (id: number) => {
    setIsLoadingCancel(true);
    await model().cancel(id);
    queryClient.invalidateQueries(orderClaimQueryKey);
    setIsLoadingCancel(false);
  }

  return (
    <Layout>
      <div className="card">
        <div className="card-body">
          <ul className="list-group">
            {data && data.customer_orders.map((order, index) => (
              <li key={index} className="list-group-item d-flex flex-column gap-2 px-4 py-4">
                <h2 className="section-heading m-0">{order.title}</h2>

                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="m-0 mt-1">
                    {order.owner.id === user.id &&
                      <div className="badge bg-success me-1 mb-1">Your order</div>
                    }
                    {order.status &&
                      <div className={clsx('badge me-1 mb-1', [order.status === CustomerOrderStatus.CANCELLED ? 'bg-danger' : 'bg-primary'])}>{capitalize(order.status)}</div>
                    }
                    <div className="badge bg-gray text-dark me-1 mb-1">Ordered at {formatDate(order.createdAt)}</div>
                    {order.createdAt !== order.updatedAt &&
                      <div className="badge bg-gray text-dark me-1 mb-1">Status updated at {formatDate(order.updatedAt)}</div>
                    }
                  </h5>

                  {order.owner.id === user.id && order.status === CustomerOrderStatus.CREATED &&
                    <Button
                      size="sm"
                      className="text-nowrap"
                      variant="gray"
                      isLoading={isLoadingCancel}
                      disabled={isLoadingCancel}
                      onClick={() => cencelOrder(order.id)}
                    >
                      Cancel Order
                    </Button>
                  }
                </div>
                <div className="d-flex justify-content-between">
                  <div>Base price</div>
                  <div>{order.price} &euro;</div>
                </div>
                {order.order_addons && order.order_addons.length > 0 &&
                  <div>
                    {order.order_addons.map((item, index) => (
                      <div key={index} className="d-flex justify-content-between">
                        <div>- {item.title}</div>
                        <div>{item.price} &euro;</div>
                      </div>
                    ))}
                  </div>
                }
                <h6 className="d-flex justify-content-between mt-3 mb-0">
                  Total:
                  <strong className="text-primary">{order.totalPrice} &euro;</strong>
                </h6>
                {order.owner.id !== user.id &&
                  <div className="d-flex gap-2 mt-3">
                    <div className={clsx('avatar avatar-24 rounded-circle border border-2 bg-gray text-dark')}>
                      <small className="d-inline-flex align-items-center justify-content-center">{order.owner.displayName[0]}</small>
                    </div>
                    <span>
                      <strong>{order.owner.displayName}</strong> made this order
                    </span>
                  </div>
                }
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};