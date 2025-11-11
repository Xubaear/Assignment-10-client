import React from 'react';
import { createBrowserRouter } from "react-router";
import HomeLayout from '../Layout/HomeLayout';
import Home from '../Components/Home';
import Login from '../Page/Login';
import Register from '../Page/Register';
import Error from '../Page/Error';
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
        path: '/*',
        Component: Error
      }
    ]
  },
  
]);

export default router;