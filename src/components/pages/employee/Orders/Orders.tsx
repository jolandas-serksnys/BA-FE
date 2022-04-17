import { Button, Card, Input, SectionHeader } from "@src/components/common";
import { Layout } from "@src/components/common/Layout";
import { useTable } from "@src/contexts/tableContext";
import { model, useCustomerOrders } from "@src/hooks/order";
import { model as tableClaimModel } from "@src/hooks/tableClaim";
import { TableClaimStatus } from "@src/models/tableClaim";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Accordion, Alert, Col, Form, Nav, Row, Tab } from "react-bootstrap";
import { CustomerOrder } from "./CustomerOrder";
import { CustomerOrderNavButton } from "./CustomerOrderNavButton";

export const OrdersPage = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1)

  const initialValues = {
    query: '',
    dateFrom: new Date().toISOString().split('T')[0],
    dateTo: tomorrow.toISOString().split('T')[0],
  };

  const { tableUpdates, setUpdates } = useTable();
  const [filterProps, setFilterProps] = useState(initialValues);
  const [isLoadingToggle, setIsLoadingToggle] = useState(false);
  const [isLoadingSeats, setIsLoadingSeats] = useState(false);
  const { data, isLoading, mutate } = useCustomerOrders(filterProps);
  const [activeOrder, setActiveOrder] = useState(0);
  const [acticeCustomerOrder, setActiceCustomerOrder] = useState(0);

  useEffect(() => {
    mutate();
  }, []);

  useEffect(() => {
    if (tableUpdates) {
      mutate();
      setUpdates(false);
    }
  }, [mutate, tableUpdates]);

  useEffect(() => {
    mutate()
  }, [filterProps]);

  const toggleTableOrderClaim = async (orderId: number) => {
    setIsLoadingToggle(true);
    await model().toggleTableOrderClaim(orderId);
    mutate();
    setIsLoadingToggle(false);
  };

  const toggleSeatsBypass = async (claimId: number) => {
    setIsLoadingSeats(true);
    await tableClaimModel().toggleSeatsLimit(claimId);
    mutate();
    setIsLoadingSeats(false);
  };

  const handleFilter = async (values: any, { setSubmitting }: any) => {
    setSubmitting(true);
    setFilterProps(values);
    mutate();
    setSubmitting(false);
  };

  const handleFilterReset = async () => {
    setFilterProps(initialValues);
  };

  return (
    <Layout>
      <div className="d-flex flex-column">
        <SectionHeader title="Active table orders" />
        <div>
          <Formik
            initialValues={filterProps}
            onSubmit={handleFilter}
          >
            {({ handleSubmit, resetForm }) => (
              <Form onSubmit={handleSubmit} className="mb-3">
                <Card
                  body={
                    <div className="d-flex gap-3 flex-column flex-lg-row">
                      <Input
                        type="search"
                        placeholder="Search..."
                        name="query"
                        id="query"
                      />
                      <Input
                        type="date"
                        placeholder="Date from"
                        name="dateFrom"
                        id="dateFrom"
                      />
                      <Input
                        type="date"
                        placeholder="Date to"
                        name="dateTo"
                        id="dateTo"
                      />
                      <div className="d-flex gap-3">
                        <Button type="submit" className="text-nowrap">
                          Filter
                        </Button>
                        <Button type="button" className="text-nowrap" onClick={() => {
                          handleFilterReset();
                          resetForm();
                        }}>
                          Clear
                        </Button>
                      </div>
                    </div>
                  }
                />
              </Form>
            )}
          </Formik>
          {data && data.length !== 0 &&
            <Tab.Container defaultActiveKey={activeOrder}>
              <Row>
                <Col lg={4}>
                  <Nav variant="pills" className="card flex-column mb-3 gap-1 p-3">
                    {data && data.map((item, index) => (
                      <CustomerOrderNavButton
                        key={item.id}
                        index={index}
                        item={item}
                        setActiveOrder={setActiveOrder}
                        setActiceCustomerOrder={setActiceCustomerOrder}
                      />
                    ))}
                  </Nav>
                </Col>
                <Col lg={8}>
                  <Tab.Content>
                    {data && data.map((item, index) => (
                      <Tab.Pane key={item.id} eventKey={index}>
                        {item.table_claim.assistanceRequests
                          && item.table_claim.assistanceRequests.length > 0 &&
                          <Alert variant="warning" className="p-4 py-3">
                            <Alert.Heading>
                              <strong>Assistance requests</strong>
                            </Alert.Heading>
                            <ul className="m-0">
                              {item.table_claim.assistanceRequests.map((request) => (
                                <li key={request.id}>
                                  <div className="d-flex justify-content-between">
                                    <span>{request.message}</span>
                                    <button className="btn btn-link p-0">Dismiss</button>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </Alert>
                        }
                        <Accordion defaultActiveKey="0" activeKey={`${acticeCustomerOrder}`} className="shadow-sm rounded">
                          {item.customer_orders.map((order, index) =>
                            <CustomerOrder
                              key={index}
                              index={index}
                              order={order}
                              setActiceCustomerOrder={setActiceCustomerOrder}
                            />
                          )}
                        </Accordion>
                        <Card
                          className="mt-3"
                          body={
                            <div className="d-flex gap-2 align-items-center">
                              <Button
                                outline
                                variant="danger"
                                size="sm"
                                onClick={() => toggleSeatsBypass(item.table_claim.id)}
                                isLoading={isLoadingSeats}
                                disabled={isLoadingSeats}
                              >
                                {item.table_claim.allowSeatsBypass ? 'Enable' : 'Disable'} seats limit
                              </Button>
                              <Button
                                outline
                                variant="danger"
                                size="sm"
                                onClick={() => toggleTableOrderClaim(item.id)}
                                isLoading={isLoadingToggle}
                                disabled={isLoadingToggle}
                              >
                                {item.table_claim.status === TableClaimStatus.ACTIVE ? 'Close' : 'Reopen'} this table order
                              </Button>
                            </div>
                          }
                        />
                      </Tab.Pane>
                    ))}
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          }
          {(!data || data.length === 0) && !isLoading &&
            <div className="rounded border p-5 text-center">
              <h5 className="mb-0">No orders found</h5>
            </div>
          }
          {isLoading &&
            <div className="rounded border p-5 text-center">
              <h5 className="mb-0">Loading data...</h5>
            </div>
          }
        </div>
      </div>
    </Layout >
  );
};