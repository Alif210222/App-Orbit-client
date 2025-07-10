import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navber/Navbar';
import {ToastContainer } from "react-toastify";

const Root = () => {



    return (
        <div className='bg-gradient-to-br from-[#0a0400] via-[#231101] to-[#020018]'>
            <Navbar></Navbar>


            <div className=''>
            <Outlet></Outlet>
            </div>

             <ToastContainer />
            
        </div>
    );
};

export default Root;