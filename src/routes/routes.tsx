import React from "react";
import { ClaimTablePage, MenuPage, OrdersPage as CustomerOrdersPage } from '@src/components/pages/client';
import { Route, Routes as RoutesMain } from 'react-router-dom';
import { UserGuard, AdminGuard, EmployeeGuard, GuestGuard } from '@src/guards';
import { SignInPage, SignUpPage } from '@src/components/pages/employee';
import { AdminPage } from '@src/components/pages/admin';
import { EmployeePage } from '@src/components/pages/employee/Employee';
import { DishesPage } from "@src/components/pages/admin/Category";
import { OrdersPage as EmployeeOrdersPage } from "@src/components/pages/employee/Orders";

export const Routes = () => (
  <RoutesMain>
    <Route path='/' element={<GuestGuard><ClaimTablePage /></GuestGuard>} />
    <Route path='/menu' element={<UserGuard><MenuPage /></UserGuard>} />
    <Route path='/orders' element={<UserGuard><CustomerOrdersPage /></UserGuard>} />

    <Route path='/e' element={<EmployeeGuard><EmployeePage /></EmployeeGuard>} />
    <Route path='/e/sign-in' element={<GuestGuard><SignInPage /></GuestGuard>} />
    <Route path='/e/sign-up' element={<GuestGuard><SignUpPage /></GuestGuard>} />
    <Route path='/e/orders' element={<EmployeeGuard><EmployeeOrdersPage /></EmployeeGuard>} />

    <Route path='/e/admin' element={<AdminGuard><AdminPage /></AdminGuard>} />
    <Route path='/e/admin/category/:id/dishes' element={<AdminGuard><DishesPage /></AdminGuard>} />
  </RoutesMain>
);