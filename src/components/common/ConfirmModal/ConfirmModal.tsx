import { Button, CardTitle } from "@src/components/common";
import React, { ReactNode } from "react"
import { Modal } from "react-bootstrap";

interface Props {
  title: string;
  subTitle: string;
  children: ReactNode;
  onConfirm: () => void;
  onClose: () => void;
  isLoading: boolean;
}

export const ConfirmModal = ({ title, subTitle, onConfirm, onClose, children, isLoading }: Props) => (
  <Modal
    show
    onHide={onClose}
    backdrop="static"
    keyboard={false}
    size="xl"
    dialogClassName="modal-dialog-bottom"
    animation={false}
  >
    <CardTitle
      title={title}
      subTitle={subTitle}
    />
    <>
      <div className="p-4 px-5">
        {children}
      </div>

      <div className="pb-2 sticky-bottom">
        <div className="d-flex gap-2 flex-equal-2 p-2 mx-3 rounded shadow-sm bg-white">
          <Button variant="gray" onClick={onClose}>
            Close
          </Button>
          <Button
            type="submit"
            onClick={onConfirm}
            isLoading={isLoading}
            disabled={isLoading}
          >
            Confirm
          </Button>
        </div>
      </div>
    </>
  </Modal>
);