import { useAuth } from "@src/contexts/authContext";
import { URL as TableClaimURL } from "@src/models/tableClaim";
import api from "@src/utils/api";
import { useMutation, useQuery } from "react-query";
import { generatePath } from "react-router-dom";

export const tableClaimQueryKey = 'table-claim';

const checkAvailability = (id: number) => {
  return api.get(generatePath(TableClaimURL.AVAILABILIY, { id: String(id) })).then((response) => response?.data);
};

const getClaimedTableData = () => {
  return api.get(TableClaimURL.CLAIMED).then((response) => response?.data);
};

export const useCheckAvailability = () => {
  return useMutation(checkAvailability);
};

export const useGetClaimedTableData = () => {
  const { user } = useAuth();

  return useQuery(tableClaimQueryKey, getClaimedTableData, { enabled: user !== null && !user.isEmployee });
};