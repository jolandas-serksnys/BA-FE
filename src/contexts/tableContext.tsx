import { useGetClaimedTableData } from "@src/hooks/tableClaim";
import { Table } from "@src/models/table";
import { TableClaim } from "@src/models/tableClaim";
import React, { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { useAuth } from "./authContext";

interface TableContextInterface {
  table: Table | null;
  tableClaim: TableClaim | null;
  tableUpdates: boolean;
  setUpdates: (updates?: boolean) => void;
  isLoading: boolean;
}

const tableContextDefaultValues: TableContextInterface = {
  table: null,
  tableClaim: null,
  tableUpdates: false,
  setUpdates: () => ({}),
  isLoading: true
};

export const TableContext = createContext<TableContextInterface>(tableContextDefaultValues);

export const useTable = () => useContext(TableContext);

interface Props {
  children: ReactNode;
}

export const TableProvider = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [table, setTableState] = useState<Table | null>(null);
  const [tableClaim, setTableClaimState] = useState<TableClaim | null>(null);
  const [tableUpdates, setTableUpdates] = useState(false);

  const { user } = useAuth();
  const { data, isLoading: tableClaimIsLoading } = useGetClaimedTableData();

  useEffect(() => {
    if (user !== null && !user.isEmployee) {
      if (!tableClaimIsLoading && data) {
        const { table, tableClaim } = data;
        setTableState(table);
        setTableClaimState(tableClaim);
        setIsLoading(false);
      }
    }
  }, [user, data, isLoading, table, tableClaim]);

  const setUpdates = (updates?: boolean) => setTableUpdates(updates ? true : false);

  const value = {
    table,
    tableClaim,
    tableUpdates,
    setUpdates,
    isLoading
  };

  if (isLoading && user && !user.isEmployee) {
    return <>Loading...</>;
  }

  return (
    <TableContext.Provider value={value}>
      {children}
    </TableContext.Provider>
  );
};