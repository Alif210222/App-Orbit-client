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
import MyProduct from '../DashBoard/MyProduct/MyProduct';
import MyProfile from '../DashBoard/MyProfile/MyProfile';
import UpdateProduct from '../DashBoard/MyProduct/UpdateProduct';
import ProductReview from '../DashBoard/ProductReview/ProductReview';




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
       path:"/update-product/:id",
       Component:UpdateProduct,
       
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
      },
      {
        path:"myProduct",
        Component:MyProduct
      },
      {
        path:"myProfile",
        Component:MyProfile
      },
     
      {
        path:"productReview",
        Component:ProductReview
      },
     
    ]
    
    
  }
]);


