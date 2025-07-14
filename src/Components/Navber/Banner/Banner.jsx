import React from 'react';
import { motion } from "framer-motion";
import {
  FaAtom,
  FaRocket,
  FaCogs,
  FaShieldAlt,
  FaTools,
  FaUserCheck,
  FaChartBar,
  FaTags,
} from "react-icons/fa";
import './AnimatedBorder.css';



const Banner = () => {
  return (
    <div className="px-4 mt-4">
      <div className=" relative p-[4px] rounded-2xl bg-gradient-to-r from-[#7d3d11] via-[#2e1e13] to-[#326a9a] animate-borderMove shadow-xl overflow-hidden">

        {/* Rotating Corner Icons (Hidden on mobile) */}

       <motion.div
  className="text-6xl text-[#537d7e] absolute top-10 left-10"
  animate={{ rotate: 360 }}
  transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
>
  <FaAtom></FaAtom>
</motion.div>

           <motion.div
  className="text-6xl text-[#537d7e] absolute top-8 right-8"
  animate={{ rotate: 360 }}
  transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
>
  <FaAtom></FaAtom>
</motion.div>

 
      
      

        {/* Main Banner Content */}
        <div className="relative min-h-[720px] flex items-center justify-center text-center rounded-[calc(1rem-3px)]   px-4">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-5xl font-medium text-white mb-10">
              Transform your business with the power{" "}
              <span className="text-transparent font-bold bg-clip-text bg-gradient-to-r from-[#c05006] via-[#454067] to-[#1f0fd0]">
                of tech products.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-14">
              In a world where cyberattacks are becoming more sophisticated,
              your business deserves the best protection. Our expert team
              leverages cutting-edge technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-black text-lg border-2 border-amber-700 text-white font-semibold px-8 py-3 rounded-full hover:bg-amber-700 transition duration-700">
                Explore this site
              </button>
              <button className="bg-transparent text-lg bg-gradient-to-r from-[#752f00] via-[#401f02] to-[#1f109f] text-white font-semibold px-7 py-3 rounded-full hover:bg-amber-700 transition">
                Join Now
              </button>
            </div>
          </motion.div>

          {/* Bottom Inside Cards */}
          <div className="hidden md:block absolute bottom-6 w-full px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-4 rounded-xl text-white shadow-md">
                <FaTools className="text-4xl text-amber-400" />
                <p className="font-semibold">Custom Tools</p>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-4 rounded-xl text-white shadow-md">
                <FaUserCheck className="text-4xl text-green-400" />
                <p className="font-semibold">Verified Users</p>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-4 rounded-xl text-white shadow-md">
                <FaChartBar className="text-4xl text-blue-400" />
                <p className="font-semibold">Real Stats</p>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-4 rounded-xl text-white shadow-md">
                <FaTags className="text-4xl text-pink-400" />
                <p className="font-semibold">Best Offers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
