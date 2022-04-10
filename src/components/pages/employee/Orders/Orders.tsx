import { Button, Input, SectionHeader } from "@src/components/common";
import { Layout } from "@src/components/common/Layout";
import { useTable } from "@src/contexts/tableContext";
import { model, useCustomerOrders } from "@src/hooks/order";
import { TableClaimStatus } from "@src/models/tableClaim";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Accordion, Col, Form, Nav, Row, Tab } from "react-bootstrap";
import { CustomerOrder } from "./CustomerOrder";

export const OrdersPage = () => {
  const { tableUpdates, setUpdates } = useTable();
  const [filterProps, setFilterProps] = useState({
    query: '',
    dateFrom: '',
    dateTo: '',
  });
  const [isLoadingToggle, setIsLoadingToggle] = useState(false);
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

  const handleFilter = async (values: any, { setSubmitting }: any) => {
    setSubmitting(true);
    setFilterProps(values);
    mutate();
    setSubmitting(false);
  };

  const handleFilterReset = async () => {
    setFilterProps({
      query: '',
      dateFrom: '',
      dateTo: '',
    });
  };

  return (
    <Layout>
      <div className="d-flex flex-column">
        <SectionHeader title="Active table orders" />
        <div className="card">
          <div className="card-body">
            <Formik
              initialValues={filterProps}
              onSubmit={handleFilter}
            >
              {({ handleSubmit, resetForm }) => (
                <Form onSubmit={handleSubmit} className="mb-3">
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
                </Form>
              )}
            </Formik>
            {data && data.length !== 0 &&
              <Tab.Container defaultActiveKey={activeOrder}>
                <Row>
                  <Col lg={4}>
                    <Nav variant="pills" className="flex-column mb-3 gap-1">
                      {data && data.map((item, index) => (
                        <Nav.Item key={item.id}>
                          <Nav.Link eventKey={index} onClick={() => {
                            setActiveOrder(index);
                            setActiceCustomerOrder(0);
                          }}>
                            <div className="d-flex justify-content-between align-items-center gap-3">
                              <div>
                                <strong className="d-block">{item.table_claim.table.displayName}</strong>
                                <small>{item.table_claim.customers.length} Customer{item.table_claim.customers.length > 1 ? 's' : ''}</small>
                              </div>
                              {
                                /*
                              <strong className="text-warning">
                                <IconAlert />
                              </strong>
                                */
                              }
                            </div>
                          </Nav.Link>
                        </Nav.Item>
                      ))}
                    </Nav>
                  </Col>
                  <Col lg={8}>
                    <Tab.Content>
                      {data && data.map((item, index) => (
                        <Tab.Pane key={item.id} eventKey={index}>
                          {
                            /*
                          <Alert variant="warning" className="p-4 py-3">
                            <Alert.Heading>
                              <strong>Assistance request</strong>
                            </Alert.Heading>
                            <div>
                              Table &quot;<strong>{item.table_claim.table.displayName}</strong>&quot; has requested assistance from an employee.
                            </div>
                          </Alert>
                            */
                          }
                          <Accordion defaultActiveKey="0" activeKey={`${acticeCustomerOrder}`}>
                            {item.customer_orders.map((order, index) => <CustomerOrder key={index} index={index} order={order} setActiceCustomerOrder={setActiceCustomerOrder} />)}
                          </Accordion>
                          <div className="d-flex gap-3 mt-3 align-items-center justify-content-between">
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
      </div>
    </Layout >
  );
};