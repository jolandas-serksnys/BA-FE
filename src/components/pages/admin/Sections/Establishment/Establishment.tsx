import { Button, Card, SectionHeader } from "@src/components/common";
import { useGetEstablishement } from "@src/hooks/establishment";
import React, { useState } from "react";
import { EstablishmentModal } from "./EstablishmentModal";

export const Establishment = () => {
  const [showModal, setShowModal] = useState(false);
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
                  <td className="text-end pe-4">Description</td>
                  <td><strong>{data.description}</strong></td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <Button
                      onClick={() => setShowModal(true)}
                      className="mt-3"
                      size="sm"
                    >
                      Change establishment details
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          }
        />
      }
      {showModal &&
        <EstablishmentModal onClose={() => setShowModal(false)} />
      }
    </>
  );
};