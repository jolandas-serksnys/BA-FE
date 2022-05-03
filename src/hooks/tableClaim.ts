import { useAuth } from "@src/contexts/authContext";
import { AssistanceRequest, URL as TableClaimURL } from "@src/models/tableClaim";
import api from "@src/utils/api";
import { useQuery } from "react-query";
import { generatePath } from "react-router-dom";

export const tableClaimQueryKey = 'table-claim';
export const assistanceRequestsQueryKey = 'assistance-requests';

export const model = () => {
  const establishmentId = process.env.ESTABLISHMENT_ID || '1';

  return ({
    getClaimed: () => {
      return api.get(TableClaimURL.CLAIMED).then((response) => response?.data);
    },
    toggleAccessRequests: () => {
      return api.post(TableClaimURL.TOGGLE_ACCESS_REQUESTS).then((response) => response?.data);
    },
    toggleSeatsLimit: (id: number) => {
      return api.post(generatePath(TableClaimURL.TOGGLE_SEATS_BYPASS, { id: `${id}` })).then((response) => response?.data);
    },
    requestAssistance: (type: string, message?: string) => {
      return api.post(TableClaimURL.ASSISTANCE, { type, message }).then((response) => response?.data);
    },
    getAssistanceRequests: () => {
      return api.get<AssistanceRequest[]>(generatePath(TableClaimURL.ASSISTANCE_REQUESTS, { establishmentId })).then((response) => response?.data);
    },
    dismissAssistanceRequest: (id: number) => {
      return api.post(generatePath(TableClaimURL.DISMISS_ASSISTANCE_REQUEST, { establishmentId, id: `${id}` })).then((response) => response?.data);
    },
  })
};

export const useGetClaimedTableData = () => {
  const { user } = useAuth();
  return useQuery(tableClaimQueryKey, model().getClaimed, { enabled: user !== null && !user.isEmployee });
};

export const useGetAssistanceRequests = () => {
  return useQuery(assistanceRequestsQueryKey, model().getAssistanceRequests);
}