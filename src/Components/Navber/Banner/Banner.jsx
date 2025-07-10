import React from 'react';
import { motion } from "framer-motion";
import bannerOne from "../../../assets/about1.png"

const Banner = () => {
    return (
      <div className='bg-gradient-to-br from-[#0a0400] via-[#231101] to-[#020018] relative'>
        
        {/* <motion.div className='absolute  ml-20 mt-20' 
        initial={{ opacity: 0, y: 60 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.9, ease: "easeOut" }}
        
        >
            <img src={bannerOne} alt="" />
        </motion.div> */}

   
        <div className="min-h-screen  flex items-center justify-center text-center px-6">
       
 
  <motion.div className="max-w-3xl"
              initial={{ opacity: 0, y: 80 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.9, ease: "easeOut" }}
  >
  

    <h1 className="text-4xl md:text-5xl font-medium text-white mb-6 ">
      Transform your business with the power <span className='class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#c05006] via-[#454067] to-[#1f0fd0] '>of tech products. </span> 
    </h1>
    <p className="text-lg md:text-xl text-gray-400 mb-8">
      In a world where cyberattacks are becoming more sophisticated, your business deserves the best protection.
      Our expert team leverages cutting-edge technology.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button className="bg-black text-lg border-2 border-amber-700 text-white font-semibold px-8 py-3 rounded-full hover:bg-amber-700 transition duration-700">
        Explore this site
      </button>
      <button className="bg-transparent text-lg  bg-gradient-to-r from-[#752f00] via-[#401f02] to-[#1f109f] text-white font-semibold px-7 py-3 rounded-full  hover:bg-amber-700   transition">
        Join Now
      </button>
    </div>
  </motion.div>
</div>
  </div>

    );
};

export default Banner;