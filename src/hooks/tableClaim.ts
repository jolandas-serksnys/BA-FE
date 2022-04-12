import { useAuth } from "@src/contexts/authContext";
import { URL as TableClaimURL } from "@src/models/tableClaim";
import api from "@src/utils/api";
import { useQuery } from "react-query";
import { generatePath } from "react-router-dom";

export const tableClaimQueryKey = 'table-claim';

export const model = () => ({
  getClaimed: () => {
    return api.get(TableClaimURL.CLAIMED).then((response) => response?.data);
  },
  toggleAccessRequests: () => {
    return api.post(TableClaimURL.TOGGLE_ACCESS_REQUESTS).then((response) => response?.data);
  },
  toggleSeatsLimit: (id: number) => {
    return api.post(generatePath(TableClaimURL.TOGGLE_SEATS_BYPASS, { id: `${id}` })).then((response) => response?.data);
  },
});

export const useGetClaimedTableData = () => {
  const { user } = useAuth();

  return useQuery(tableClaimQueryKey, model().getClaimed, { enabled: user !== null && !user.isEmployee });
};