import React from 'react';
import Banner from '../../Components/Navber/Banner/Banner';
import FeaturedProduct from '../../Components/FeaturedPoduct/FeaturedProduct';
import TrendingProducts from '../../Components/TrendingProducts/TrendingProducts';

import CouponSlider from '../../Components/CouponSlider/CouponSlider';
import HomeCard from '../../Components/HomeCard/HomeCard';
import OurServices from '../../Components/OurServiceSection/OurService';
import FAQSection from '../../DashBoard/FAQSection/FAQSection';
import {Helmet} from "react-helmet";


const Homepage = () => {
    return (
        <div className='bg-gradient-to-br from-[#0a0400] via-[#231101] to-[#020018]'>
              
              <Helmet>
                   <title>Home | App Orbit</title>
              </Helmet>


           <Banner></Banner>

           <HomeCard></HomeCard>


           <FeaturedProduct></FeaturedProduct>


           <TrendingProducts></TrendingProducts>

           
           <CouponSlider></CouponSlider>


           <FAQSection></FAQSection>


           <OurServices></OurServices>
        </div>
    );
};

export default Homepage;