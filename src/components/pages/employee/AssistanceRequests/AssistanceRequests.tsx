import { SectionHeader } from "@src/components/common";
import { Layout } from "@src/components/common/Layout";
import { useGetAssistanceRequests } from "@src/hooks/tableClaim";
import React from "react";
import { AssistanceRequest } from "./AssistanceRequest";

export const AssistanceRequestsPage = () => {
  const { data, isLoading, isError } = useGetAssistanceRequests();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error!</div>;
  }

  return (
    <>
      <Layout>
        <SectionHeader title="Assistance requests" />
        {data &&
          <div className="d-flex flex-column gap-2">
            {data.map((request) => (
              <AssistanceRequest key={request.id} data={request} />
            ))}
          </div>
        }
      </Layout>
    </>
  )
};