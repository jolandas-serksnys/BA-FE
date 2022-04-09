import { Card, CardTitle, CodeInput, Button, Input } from "@src/components/common";
import { Layout } from "@src/components/common/Layout/Layout";
import { QRCodeScan } from "@src/components/common/QRScan/QRCodeScan";
import { useCheckTable } from "@src/hooks/table";
import { useSignInCustomer } from "@src/hooks/user";
import { TableAccessCheckResponse } from "@src/models/table";
import clsx from "clsx";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";

export const ClaimTablePage = () => {
  const { mutate: mutateCustomer, isLoading: isLoadingCustomer } = useSignInCustomer();
  const { mutate: mutateAvailability, isLoading: isLoadingAvailability, isError: isErrorAvailability, data: tableAvailabilityData, error: errorAvailability } = useCheckTable();

  const [claimMethod, setClaimMethod] = useState("input");
  const [code, setCode] = useState<string | null>(null);
  const [lastCheckedCode, setLastCheckedCode] = useState<string | null>(null);
  const [table, setTable] = useState<TableAccessCheckResponse | null>(null);

  const tableCodeLength = 4;

  const handleSubmit = ({ displayName }: { displayName: string }) => {
    mutateCustomer({ tableId: String(code || table.id), displayName: displayName });
  };

  const handleOnResult = (result: any, error: any) => {
    if (result) {
      setCode(result?.text);
    }

    if (error) {
      // console.info(error);
    }
  };

  const resetTable = () => {
    setCode(null);
    setLastCheckedCode(null);
    setTable(null);
  };

  useEffect(() => {
    if (code !== null && code.length === tableCodeLength && lastCheckedCode !== code) {
      setLastCheckedCode(code);
      mutateAvailability(Number(code));
    } else if (isErrorAvailability) {
      resetTable();
    }

    if (code !== null && code.length === tableCodeLength && tableAvailabilityData) {
      setTable(tableAvailabilityData);
    } else if (!code || !tableAvailabilityData) {
      setTable(null);
    }

  }, [code, isErrorAvailability, errorAvailability, lastCheckedCode, mutateAvailability, tableAvailabilityData, table]);

  return (
    <Layout noHeader noFooter className="py-5">
      <div className="row d-flex h-100 align-items-center justify-content-center">
        <div className="d-flex col-12 col-lg-6 flex-column justify-content-center">
          <Formik initialValues={{ displayName: '' }} onSubmit={handleSubmit}>
            <Form className="d-flex flex-column gap-3">
              {(!table || isLoadingAvailability) &&
                <Card
                  header={
                    <CardTitle
                      title={claimMethod === 'scan' ? 'Scan a table QR code' : 'Claim with a table code'}
                      subTitle="The code is located on a sticker on the table"
                    />
                  }
                  body={
                    <div className="d-flex flex-column gap-3">
                      {claimMethod === 'scan' &&
                        <div>
                          <QRCodeScan onResult={handleOnResult} />
                        </div>
                      }
                      {claimMethod === 'input' &&
                        <div>
                          <CodeInput
                            name="tableId"
                            id="tableId"
                            type="number"
                            autoComplete="off"
                            className="d-block"
                            value={code || ''}
                            setValue={setCode}
                            length={tableCodeLength}
                            required
                          />
                        </div>
                      }
                      <div className="btn-group">
                        <Button
                          type="button"
                          onClick={() => setClaimMethod('scan')}
                          outline={claimMethod !== 'scan'}
                        >
                          Scan QR
                        </Button>
                        <Button
                          type="button"
                          onClick={() => setClaimMethod('input')}
                          outline={claimMethod !== 'input'}
                        >
                          Input Code
                        </Button>
                      </div>
                    </div>
                  }
                  className="width-auto"
                />
              }
              {table && !isLoadingAvailability &&
                <Card
                  className={clsx('px-2 text-light', [tableAvailabilityData.requestsEnabled ? 'bg-warning' : 'bg-success'])}

                  body={
                    <div className="d-flex justify-content-between align-items-center gap-3">
                      <div className="d-flex align-items-center gap-4">
                        <h3 className="m-0 section-heading">{String(table.id).padStart(4, '0')}</h3>
                        {/*<h3 className="m-0 section-heading">{table.number}</h3>*/}
                        <div>
                          <strong>{table.displayName}</strong>
                          {table.requestsEnabled && <div>You have to <strong>request access</strong> before joining this table.</div>}
                          {table.seatsTaken !== undefined && table.seatsTaken === 1 && <div><strong>{table.seatsTaken} other person</strong> is waiting for you at this table!</div>}
                          {table.seatsTaken !== undefined && table.seatsTaken > 1 && <div><strong>{table.seatsTaken} other people</strong> are waiting for you at this table!</div>}
                          {(!table.seatsTaken || table.seatsTaken === 0) && <div>Table is available and ready for you!</div>}
                        </div>
                      </div>
                      <div>
                        <Button
                          variant="light"
                          size="sm"
                          onClick={resetTable}
                          type="button"
                        >
                          Change
                        </Button>
                      </div>
                    </div>
                  }
                />
              }
              <Card
                body={
                  <div className="d-flex flex-column gap-3">
                    <div>
                      <Input
                        type="text"
                        name="displayName"
                        id="displayName"
                        placeholder="Your name"

                        required />
                    </div>
                    <div className="btn-group">
                      {(!table || (table && !table.requestsEnabled)) &&
                        <Button
                          type="submit"
                          disabled={isLoadingCustomer || isLoadingAvailability}
                          isLoading={isLoadingCustomer || isLoadingAvailability}
                        >
                          Take me to menu
                        </Button>
                      }
                      {table && table.requestsEnabled &&
                        <Button
                          type="submit"
                          disabled={isLoadingCustomer || isLoadingAvailability}
                          isLoading={isLoadingCustomer || isLoadingAvailability}
                        >
                          Request access
                        </Button>
                      }
                    </div>
                  </div>
                }
              />
            </Form>
          </Formik>
        </div>
      </div>
    </Layout>
  );
}