import React from 'react';
import { createBrowserRouter } from "react-router";
import HomeLayout from '../Layout/HomeLayout';
import Home from '../Components/Home';
import Login from '../Page/Login';
import Register from '../Page/Register';
import Error from '../Page/Error';
import AddTransaction from '../Page/AddTransaction';
import MyTransactions from '../Page/MyTransaction';
import Reports from '../Page/Reports';
import TransactionDetails from '../Page/TransactionDetails';
import UpdateTransaction from '../Page/UpdateTransaction';
import MyProfile from '../Page/MyProfile';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        index: true,
        path: '/',
        Component: Home
      },
      {
       path: '/add-transaction',
       Component: AddTransaction
      },
      {
        path: '/my-transactions',
        Component: MyTransactions
      },
       {
        path: '/transaction/:id',
        Component: TransactionDetails
      },
       {
        path: '/transaction/update/:id',
        Component: UpdateTransaction
      },
      {
        path: '/reports',
        Component: Reports
      },
      {
        path: '/my-profile',
        Component: MyProfile
      },
      {
        path: '/login',
        Component: Login
      },
      {
        path: '/register',
        Component: Register
      },
      {
        path: '/*',
        Component: Error
      }
    ],
    
  },
  
]);

export default router;