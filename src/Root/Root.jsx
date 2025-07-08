import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navber/Navbar';
import {ToastContainer } from "react-toastify";

const Root = () => {



    return (
        <div className=''>
            <Navbar></Navbar>


            <div className=''>
            <Outlet></Outlet>
            </div>

             <ToastContainer />
            
        </div>
    );
};

export default Root;