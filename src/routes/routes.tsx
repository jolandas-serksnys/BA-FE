import { AdminPage } from "@src/components/pages/admin";
import { DishesPage } from "@src/components/pages/admin/Category";
import { AddonsPage } from "@src/components/pages/admin/Dish/Container";
import { ClaimTablePage, MenuPage, OrdersPage as CustomerOrdersPage } from "@src/components/pages/client";
import { BillPage } from "@src/components/pages/client/Bill";
import { SignInPage, SignUpPage } from "@src/components/pages/employee";
import { AssistanceRequestsPage } from "@src/components/pages/employee/AssistanceRequests";
import { EmployeePage } from "@src/components/pages/employee/Employee";
import { OrdersPage as EmployeeOrdersPage } from "@src/components/pages/employee/Orders";
import {
  AdminGuard,
  EmployeeGuard,
  GuestGuard,
  UserGuard
} from "@src/guards";
import React from "react";
import { Route, Routes as RoutesMain } from "react-router-dom";

export const Routes = () => (
  <RoutesMain>
    <Route path='/' element={<GuestGuard><ClaimTablePage /></GuestGuard>} />
    <Route path='/menu' element={<UserGuard><MenuPage /></UserGuard>} />
    <Route path='/orders' element={<UserGuard><CustomerOrdersPage /></UserGuard>} />
    <Route path='/bill' element={<UserGuard><BillPage /></UserGuard>} />

    <Route path='/e' element={<EmployeeGuard><EmployeePage /></EmployeeGuard>} />
    <Route path='/e/sign-in' element={<GuestGuard><SignInPage /></GuestGuard>} />
    <Route path='/e/sign-up' element={<GuestGuard><SignUpPage /></GuestGuard>} />
    <Route path='/e/orders' element={<EmployeeGuard><EmployeeOrdersPage /></EmployeeGuard>} />
    <Route path='/e/requests' element={<EmployeeGuard><AssistanceRequestsPage /></EmployeeGuard>} />

    <Route path='/e/admin' element={<AdminGuard><AdminPage /></AdminGuard>} />
    <Route path='/e/admin/category/:id/dishes' element={<AdminGuard><DishesPage /></AdminGuard>} />
    <Route path='/e/admin/category/:categoryId/dishes/:id' element={<AdminGuard><AddonsPage /></AdminGuard>} />
  </RoutesMain>
);