import React from "react";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../queryClient";

export const withQueryClient = (component: JSX.Element) => (
  <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>
);
