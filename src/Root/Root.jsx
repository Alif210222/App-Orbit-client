import React from 'react';
import { Outlet, ScrollRestoration } from 'react-router';
import Navbar from '../Components/Navber/Navbar';
import Footer from '../Components/Footer/Footer';


const Root = () => {



    return (
        <div className='bg-gradient-to-br from-[#0a0400] via-[#231101] to-[#020018]'>
            <Navbar></Navbar>


            <div className=''>
            <Outlet></Outlet>
            </div>

           
            <Footer></Footer>

            <ScrollRestoration></ScrollRestoration>
        </div>
    );
};

export default Root;