import React from "react";
import { MemoryRouter } from "react-router-dom";
import { InitialEntry } from 'history';

export const withMemoryRouter = (component: JSX.Element, initialEntries?: InitialEntry[] | undefined) => (
  <MemoryRouter initialEntries={initialEntries}>{component}</MemoryRouter>
);