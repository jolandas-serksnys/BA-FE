import { Button } from "@src/components/common";
import { useAuth } from "@src/contexts/authContext";
import { Customer } from "@src/models/customer";
import React from "react"
import { Modal } from "react-bootstrap";
import { Header } from "./CustomerSignOut.style";

interface Props {
  onClose: () => void;
}

export const CustomerSignOut = ({ onClose }: Props): JSX.Element => {
  const { user: userGeneric, signOut } = useAuth();
  const user = userGeneric as Customer;

  return (
    <Modal
      show
      onHide={onClose}
      backdrop="static"
      keyboard={false}
      size="xl"
      dialogClassName="modal-dialog-bottom"
    >
      <Header className="bg-primary text-light">
        <h2 className="section-heading">{user.displayName}</h2>
      </Header>
      <div className="pb-2 sticky-bottom">
        <div className="d-flex gap-2 flex-equal-2 p-2 mx-3 rounded shadow-sm bg-white">
          <Button onClick={onClose} variant="gray">
            Close
          </Button>
          <Button onClick={signOut}>
            Sign Out
          </Button>
        </div>
      </div>
    </Modal>
  );
}