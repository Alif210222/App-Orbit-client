import React from 'react';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Root from '../Root/Root';
import Homepage from '../Pages/Homepage/Homepage';
import Product from '../Pages/Product/Product';
import About from '../Pages/About/About';
import Register from '../Pages/Authentication/Register';
import Login from '../Pages/Authentication/Login';
import DashBoardLayout from '../DashBoard/DashBoardLayout';
import AddProduct from '../DashBoard/AddProduct/AddProduct';



 export  const router = createBrowserRouter([
  {
    path: "/",
   Component:Root,
   children:[
    {
       index:true,
       Component:Homepage
    },
    {
        path:"product",
        Component:Product
    },
    {
        path:"about",
        Component:About
    },
    {
      path:"register",
      Component:Register
    },
    {
      path:"login",
      Component:Login
    
    }
   ]
  },
  {
    path:"/dashboard",
    Component:DashBoardLayout,
    children:[
      {
        path:"addProduct",
        Component:AddProduct
      }
    ]
    
    
  }
]);


