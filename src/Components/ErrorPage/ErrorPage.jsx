import React from 'react';
import errorImg from "../../assets/errorImg.jpg"
import { Link } from 'react-router';


const ErrorPage = () => {
    return (
        <div>
            <div>
                  <div className='flex flex-col items-center mt-6'>
                   

                    <div className='flex  justify-center   '>
                          <img src={errorImg} alt="error img" className='rounded-2xl h-[500px] w-[500px]' />
                    </div>

                    <h1 className='text-xl font-bold text-red-600 mt-6 '>This page is not available at this moment.</h1>
                    <Link to="/"><button className='btn bg-orange-500 text-white mt-4 text-lg'> Back to home</button></Link>

                    
                  </div>
             </div>
        </div>
    );
};

export default ErrorPage;