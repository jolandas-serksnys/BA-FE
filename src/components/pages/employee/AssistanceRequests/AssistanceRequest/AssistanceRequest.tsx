import { IconAlert } from "@src/components/icons";
import { assistanceRequestsQueryKey, model } from "@src/hooks/tableClaim";
import { AssistanceRequest as Model } from "@src/models/tableClaim";
import { queryClient } from "@src/utils";
import clsx from "clsx";
import React from "react";

interface Props {
  data: Model;
}

export const AssistanceRequest = ({ data }: Props) => {
  const formatDate = (date: string) => {
    const dateObj = new Date(date);

    const hours = `${dateObj.getHours()}`.padStart(2, '0');
    const minutes = `${dateObj.getMinutes()}`.padStart(2, '0');

    return `${hours}:${minutes}`;
  };

  const dismiss = async () => {
    await model().dismissAssistanceRequest(data.id);
    await queryClient.invalidateQueries(assistanceRequestsQueryKey);
  }

  let requestClass = '';
  switch (data.type) {
    case 'PAYCARD':
      requestClass = 'alert-primary';
      break;
    case 'PAYCASH':
      requestClass = 'alert-success';
      break;
    default:
      requestClass = 'alert-warning';
  }

  return (
    <div className={clsx('alert border-0 shadow-sm', requestClass)}>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <div className="me-3">
            <IconAlert />
          </div>
          <div>
            <strong>{data.tableClaim?.table.displayName}</strong>
            <div className="d-flex gap-3">
              {data.type !== 'OTHER' &&
                <strong>
                  {data.type === 'PAYCARD' && 'Payment card'}
                  {data.type === 'PAYCASH' && 'Payment cash'}
                </strong>
              }
              <div className="text-muted">{formatDate(data.createdAt)}</div>
              {data.message && <div className="text-muted">{data.message}</div>}
            </div>
          </div>
        </div>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={dismiss}
        />
      </div>
    </div>
  );
};