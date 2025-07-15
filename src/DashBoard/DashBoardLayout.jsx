import React from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import { FaHome, FaBox, FaHistory,FaStarHalfAlt , FaUserEdit,  FaCube, FaChartPie, FaUsers, FaPercentage } from 'react-icons/fa';
import logo from "../assets/logo.png"
import useUserRole from '../hooks/useUserRole';
import { useLocation, useNavigate } from 'react-router';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';


const DashBoardLayout = () => {

    const {role,isLoading} = useUserRole()

    // console.log(role)

// user go to their defailt route 
    const location = useLocation();
const navigate = useNavigate();

useEffect(() => {
  if (!isLoading && location.pathname === "/dashboard") {
    if (role === "user") {
      navigate("/dashboard/myProfile", { replace: true });
    } else if (role === "moderator") {
      navigate("/dashboard/productReview", { replace: true });
    } else if (role === "admin") {
      navigate("/dashboard/statistics", { replace: true });
    }
  }
}, [isLoading, role, location.pathname, navigate]);




    return (
       <div className="drawer lg:drawer-open  bg-gradient-to-br from-[#5f2701] via-[#311701] to-[#100700] ">
                          <Helmet>
                                <title> Dashboard| App Orbit</title>
                           </Helmet>

  <input id="my-drawer-2" type="checkbox" className="drawer-toggle " />
  <div className="drawer-content min-h-screen flex flex-col bg-gradient-to-br from-[#060127] via-[#0f0800] to-[#231001] ">

            {/* Navbar */}
    <div className="navbar  w-full lg:hidden">
      <div className="flex-none ">
        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 22"
            className="inline-block h-6 w-8  mt-10 stroke-current text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      <div className="mx-2 flex-1 px-2 mt-10 text-lg text-white">Dashboard</div>
      
    </div>
 
<div className=''>


    {/* Page content here */}
      <Outlet></Outlet>
    {/* Page content here */}
</div>

 </div>
  <div className="drawer-side ">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>

    

    <ul className="menu w-64  space-y-2   bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-8 text-white border border-white/20         ">
         {/* logo */}

         <Link to="/" className="btn btn-ghost text-3xl text-white "><span>
                <img src={logo} className='w-26 h-10 ' alt="" />
                  
        </span > AppOrbit</Link>


       <ul className='p-1 bg-amber-50'></ul>

      <li className='text-white text-xl mt-6'>
        <NavLink to="/" >
          <FaHome className="inline mr-2" />
          Home
        </NavLink>
      </li>

      {/* user section  */}


     {
        !isLoading && role === "user"  && <>
        
         <li className='text-white text-lg font-medium'>
        <NavLink to="/dashboard/myProfile"  className={({isActive})=> isActive ? "text-orange-400 " :"" }>
          <FaUserEdit className="inline mr-2" />
          My Profile
        </NavLink>
      </li>
      <li className='text-white text-lg font-medium'>
        <NavLink to="/dashboard/addProduct" className={({isActive})=> isActive ? "text-orange-400 " :"" }>
          <FaBox className="inline mr-2" />
          Add Product
        </NavLink>
      </li>
      <li className='text-white text-lg font-medium'>
        <NavLink to="/dashboard/myProduct" className={({isActive})=> isActive ? "text-orange-400 " :"" }>
          < FaCube className="inline mr-2" />
           My Product
        </NavLink>
      </li >
        
        </> 
     }

       
      

   {/* moderator section  */}

   {
     !isLoading && role === "moderator" && 
     <>
     <li className='text-white text-lg font-medium'>
        <NavLink to="/dashboard/productReview" className={({isActive})=> isActive ? "text-orange-400 " :"" }>
          <FaStarHalfAlt className="inline mr-2" />
         Product Review Queue
        </NavLink>
        </li >
        <li className='text-white text-lg font-medium'>
        <NavLink to="/dashboard/reportedProduct" className={({isActive})=> isActive ? "text-orange-400 " :"" }>
          <FaCube className="inline mr-2" />
           Reported Product 
        </NavLink>
        </li >
     
     </>
   }

       

    {/* admin section  */}

      {
        !isLoading && role === "admin" && 
        <>
        
     <li className='text-white text-lg font-medium'>
        <NavLink to="/dashboard/statistics"  className={({isActive})=> isActive ? "text-orange-400 " :"" }>
          <FaChartPie className="inline mr-2" />
           Statistics Page
        </NavLink>
   </li >

   <li className='text-white text-lg font-medium'>
        <NavLink to="/dashboard/manageUser" className={({isActive})=> isActive ? "text-orange-400 " :"" }>
          <FaUsers className="inline mr-2" />
           Manage User
        </NavLink>
   </li >
   <li className='text-white text-lg font-medium'>
        <NavLink to="/dashboard/manageCoupon" className={({isActive})=> isActive ? "text-orange-400 " :"" }>
          < FaPercentage className="inline mr-2" />
           Manage Coupon
        </NavLink>
   </li >
        
        </>
      }

  


      







      {/* riders route  */}

      {/* {
        !isLoading && role === "rider" &&  
        <>
           

        
        </>
      } */}




 {/* admin route  */}
 {/* { !isLoading && role === "admin" &&  
 <>
       
     
 
 </>
  
 } */}

      
    
    </ul>
  </div>
</div>
    );
};

export default DashBoardLayout;