import React from 'react';
import { createBrowserRouter } from "react-router";
import HomeLayout from '../Layout/HomeLayout';
import DashboardLayout from '../Layout/DashboardLayout';
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
import About from '../Page/About';
import Contacts from '../Page/Contacts';
import Blog from '../Page/Blog';
import Explore from '../Page/Explore';
import Dashboard from '../Page/Dashboard';


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
        path: '/login',
        Component: Login
      },
      {
        path: '/register',
        Component: Register
      },
      {
        path: '/blog',
        Component: Blog
      },
      {
        path: '/explore',
        Component: Explore
      },
      {
        path: '/about',
        Component: About
      },
      {
        path: '/contact',
        Component: Contacts
      },
      
      
    ],
  },
  {
    path: "/",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: '/dashboard',
        Component: Dashboard
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
      }
    ],
  },
  {
        path: '/*',
        Component: Error
      }
]);

export default router;