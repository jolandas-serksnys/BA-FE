import { Button, SectionHeader } from "@src/components/common";
import { Layout } from "@src/components/common/Layout";
import { IconAlert } from "@src/components/icons";
import { useGetActiveTableOrders } from "@src/hooks/order";
import { TableOrder } from "@src/models/order";
import React, { useEffect, useState } from "react";
import { Accordion, Alert, Col, Form, Nav, Row, Tab } from "react-bootstrap";
import { CustomerOrder } from "./CustomerOrder";

export const OrdersPage = () => {
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [filteredOrders, setFilteredOrders] = useState<TableOrder[]>(null);
  const { data, isLoading, error } = useGetActiveTableOrders();

  const updateFilteredOrders = () => {
    if (filterQuery === '') {
      setFilteredOrders(data);
    } else {
      setFilteredOrders(
        data.filter((order) =>
          order.table_claim.table.displayName.toLowerCase().includes(filterQuery.toLowerCase())
          || order.customer_orders.some((customerOrder) => customerOrder.status?.toLowerCase().includes(filterQuery.toLowerCase()))
          || order.customer_orders.some((customerOrder) => customerOrder.title.toLowerCase().includes(filterQuery.toLowerCase()))
        )
      );
    }
  };

  useEffect(() => {
    updateFilteredOrders();
  }, [data, filterQuery]);

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>Error!</div>;

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFilterQuery(value);
  };

  return (
    <Layout>
      <div className="d-flex flex-column">
        <SectionHeader title="Active table orders" />
        <div className="card">
          <div className="card-body">
            <Tab.Container defaultActiveKey="0">
              <Row>
                <Col lg={4}>
                  <div className="mb-3">
                    <Form.Control
                      type="search"
                      placeholder="Search..."
                      onChange={handleFilter}
                    />
                  </div>

                  <Nav variant="pills" className="flex-column mb-3 gap-1">
                    {filteredOrders && filteredOrders.map((item, index) => (
                      <Nav.Item key={item.id}>
                        <Nav.Link eventKey={index}>
                          <div className="d-flex justify-content-between align-items-center gap-3">
                            <div>
                              <strong className="d-block">{item.table_claim.table.displayName}</strong>
                              <small>{item.table_claim.customers.length} Customer{item.table_claim.customers.length > 1 ? 's' : ''}</small>
                            </div>
                            <strong className="text-warning">
                              <IconAlert />
                            </strong>
                          </div>
                        </Nav.Link>
                      </Nav.Item>
                    ))}
                  </Nav>
                </Col>
                <Col lg={8}>
                  <Tab.Content>
                    {filteredOrders && filteredOrders.map((item, index) => (
                      <Tab.Pane key={item.id} eventKey={index}>
                        <Alert variant="warning" className="p-4 py-3">
                          <Alert.Heading>
                            <strong>Assistance request</strong>
                          </Alert.Heading>
                          <div>
                            Table &quot;<strong>{item.table_claim.table.displayName}</strong>&quot; has requested assistance from an employee.
                          </div>
                        </Alert>
                        <Accordion defaultActiveKey="0">
                          {item.customer_orders.map((order, index) => <CustomerOrder key={index} index={index} order={order} />)}
                        </Accordion>
                        <div className="d-flex gap-3 mt-3 align-items-center justify-content-between">
                          <Button outline variant="danger" size="sm">Close this table order</Button>
                        </div>
                      </Tab.Pane>
                    ))}
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </div>
        </div>
      </div>
    </Layout>
  );
};