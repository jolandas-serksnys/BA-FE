import { Card, SectionHeader } from "@src/components/common";
import { useGetEstablishement } from "@src/hooks/establishment";
import React from "react";

export const Establishment = () => {
  const { data } = useGetEstablishement();

  return (
    <>
      <SectionHeader title="Establishment" />
      {data &&
        <Card
          header="Details"
          body={
            <table className="w-100">
              <tbody>
                <tr>
                  <td className="text-end pe-4">Title</td>
                  <td><strong>{data.title}</strong></td>
                </tr>
                <tr>
                  <td className="text-end pe-4">Describtion</td>
                  <td><strong>{data.description}</strong></td>
                </tr>
              </tbody>
            </table>
          }
        />
      }
    </>
  );
};