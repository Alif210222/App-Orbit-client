import React from 'react';
import Banner from '../../Components/Navber/Banner/Banner';
import FeaturedProduct from '../../Components/FeaturedPoduct/FeaturedProduct';
import TrendingProducts from '../../Components/TrendingProducts/TrendingProducts';

import CouponSlider from '../../Components/CouponSlider/CouponSlider';

const Homepage = () => {
    return (
        <div className='bg-gradient-to-br from-[#0a0400] via-[#231101] to-[#020018]'>
           <Banner></Banner>


           <FeaturedProduct></FeaturedProduct>


           <TrendingProducts></TrendingProducts>

           
           <CouponSlider></CouponSlider>
        </div>
    );
};

export default Homepage;