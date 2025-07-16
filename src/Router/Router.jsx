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
import ReportedProduct from '../DashBoard/ReportedProduct/ReportedProduct';
import ManageUser from '../DashBoard/AdminSection/ManageUser';
import ProductDetails from '../Pages/ProductDetails/ProductDetails';
import StatisticsPage from '../DashBoard/StatisticsPage/StatisticsPage';
import ErrorPage from '../Components/ErrorPage/ErrorPage';
import PrivetRoute from '../Routes/PrivetRoute';
import ManageCupon from '../DashBoard/ManageCupon/ManageCupon';




 export  const router = createBrowserRouter([
  {
    path: "/",
   Component:Root,
   errorElement:<ErrorPage></ErrorPage>,
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
        path:"productDetails/:id", 
        element:<PrivetRoute><ProductDetails></ProductDetails></PrivetRoute>,
        // Component:ProductDetails
    },
      {
       path:"update-product/:id",
       element:<PrivetRoute><UpdateProduct></UpdateProduct></PrivetRoute>,
      //  Component:UpdateProduct,
       
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
    element:<PrivetRoute><DashBoardLayout></DashBoardLayout></PrivetRoute>,
    // Component:DashBoardLayout,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
      {
        path:"addProduct",
       element:<PrivetRoute><AddProduct></AddProduct></PrivetRoute>
      },
      {
        path:"myProduct",
        element:<PrivetRoute><MyProduct></MyProduct></PrivetRoute>
      },
      {
        path:"myProfile",
       element:<PrivetRoute><MyProfile></MyProfile></PrivetRoute>
      },
     
      // moderator route
      {
        path:"productReview",
       element:<PrivetRoute><ProductReview></ProductReview></PrivetRoute>
      },
     
      {
        path:"reportedProduct",
        element:<PrivetRoute><ReportedProduct></ReportedProduct></PrivetRoute>
      },
 
       // admin route
      {
        path:"manageUser",
      element:<PrivetRoute><ManageUser></ManageUser></PrivetRoute>
      },
      {
        path:"statistics",
        element:<PrivetRoute><StatisticsPage></StatisticsPage></PrivetRoute>
      },
      {
        path:"manageCoupon",
        element:<PrivetRoute><ManageCupon></ManageCupon></PrivetRoute>
      }
     
    ]
    
    
  }
]);


