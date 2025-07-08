import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navber/Navbar';

const Root = () => {



    return (
        <div className=''>
            <Navbar></Navbar>


            <div className=''>
            <Outlet></Outlet>
            </div>
            
        </div>
    );
};

export default Root;