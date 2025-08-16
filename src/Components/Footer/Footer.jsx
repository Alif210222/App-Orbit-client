import React from 'react';
import { Link } from 'react-router';
import logo from "../../assets/logo.png"
import { FaEnvelope, FaPhoneAlt, FaWhatsapp, FaLinkedin, FaTwitter, FaInstagram, FaMapMarkerAlt,FaGithub } from 'react-icons/fa';


const Footer = () => {
    return (
        <footer className="footer footer-horizontal footer-center bg-[#2e1b08] text-base-content rounded p-10">
         <div>
            <Link to="/"> 
            <a className="btn btn-ghost text-3xl text-white"><span>
                      <img src={logo} className='w-10 h-10' alt="" />
                     
                     </span > AppOrbit</a>
            </Link>
         </div>

  <nav className="grid grid-flow-col text-white gap-4">
    <Link to="/" className="link link-hover font-semibold">Home</Link>
  <Link to="/product" className="link link-hover font-semibold">Products</Link>
   <Link to="/about" className="link link-hover font-semibold">About us</Link>
  
  </nav>

   {/* socia links  */}
  <nav>
    <div className="grid grid-flow-col gap-4">
       <a href="https://x.com/AlifSarkerRony1" target="_blank" rel="noreferrer">
              <FaTwitter className="text-sky-500 text-2xl hover:scale-110 transition" />
            </a>
      <a href="https://www.linkedin.com/in/alif-sarker-rony-aa50802a7/" target="_blank" rel="noreferrer">
              <FaLinkedin className="text-blue-600 text-2xl hover:scale-110 transition" />
            </a>
       <a href="https://github.com/Alif210222" target="_blank" rel="noopener noreferrer">
                        <FaGithub className="text-3xl text-white hover:text-black transition " title="GitHub" />
        </a>
    </div>

  </nav>

  <p className='btn bg-amber-800/20'>support@app-orbit.com</p>
  <aside>
    <p className='text-white font-bold'>Copyright © {new Date().getFullYear()} - All right reserved by ACME Industries Ltd</p>
  </aside>
</footer>
    );
};

export default Footer;