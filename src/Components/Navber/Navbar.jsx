import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import logo from "../../assets/logo.png"
import { AuthContext } from '../../Context/AuthContext';

const Navbar = () => {
     const {user,logOut,loading} = use(AuthContext)

    


         const links = < >
          <li className='  text-white   text-lg lg:mr-3 '><NavLink className={({isActive})=> isActive ? "text-orange-400 " :"" } to='/'>Home</NavLink></li>
          <li className='  text-white   text-lg lg:mr-3 '><NavLink className={({isActive})=> isActive ? "text-orange-400" : "" } to="/product">Products</NavLink></li>
          <li className='  text-white   text-lg lg:mr-3 '><NavLink className={({isActive})=> isActive ? "text-orange-400" : "" } to="/about" >About us</NavLink></li>

          {
            user && (
               <li className='text-white   text-lg lg:mr-3'>
               <NavLink to="/dashboard" className={({isActive})=> isActive ? "text-orange-400" : "" }>Dashboard</NavLink>
        </li>
            )
          }
         
         
         </>



    return (
     <div className="navbar bg-gradient-to-r from-[#0a0400] via-[#321900]   to-[#070000] shadow-sm px-2 md:px-20 py-4  fixed top-0 z-50">
   <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden ">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white " fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-black/35 rounded-box z-1 mt-3 w-30 md:w-52 p-2 shadow">
       {
        links
       }
      </ul>
    </div>
    <Link to="/" className="btn btn-ghost text-xl md:text-3xl text-white"><span>
          <img src={logo} className='w-6 h-6 md:w-10 md:h-10' alt="" />
         
         </span > AppOrbit</Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal   backdrop-blur-md bg-white/10  border-white/20 shadow-md rounded-md px-6 py-2 text-white">
     {
        links
     }
    </ul>
  </div>
  <div className="navbar-end space-x-2.5">

{
  !user && <div className=' flex gap-2 md:gap-3'>
      <button className=" px-3 md:px-6 py-1 md:py-3 md:text-lg font-medium shadow-2xl   rounded-xl  backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20"> <NavLink  to="/login"  >Login</NavLink>   </button>
      <button className=" px-3 md:px-4 py-1 md:py-3 md:text-lg font-medium shadow-2xl   rounded-xl  backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20" > <NavLink to="/register">Registration</NavLink></button>
  
  </div>
}
       
 {user && (
    <div className="dropdown dropdown-end">
      <div className='text-center'>
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar border border-white/20 hover:border-white"
      >
        <div className="w-12 rounded-full">
          <img src={user.photoURL || "/default-user.png"} alt="User Profile" />
        </div>
        
      </div>
       
       <p className=' text-amber-600 font-medium'>My Profile</p>
        </div>
      <ul
        tabIndex={0}
        className="mt-3 z-[1] p-3 shadow-lg menu menu-sm dropdown-content bg-white/10 text-white backdrop-blur-md rounded-box w-52 border border-white/20"
      >
        <li className="font-semibold">
          <span>Hello, {user.displayName || "User"}</span>
        </li>
        <li className='font-bold hover:text-amber-600'>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
        <li className='font-bold hover:text-amber-600'>
          <button onClick={logOut}>Logout</button>
        </li>
      </ul>
    </div>
  )}
    
  </div>
</div>
    );
};

export default Navbar;