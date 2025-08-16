// HomeStatsSection.jsx
import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";


const cardsData = [
  {
    title: "Total Users",
    count: 2450,
    img: "https://i.ibb.co/sdcqZJPx/card1.png",
  },
  {
    title: "Products Sold",
    count: 15890,
    img: "https://i.ibb.co/r2hwszdG/card-2.png",
  },
  {
    title: "Positive Reviews",
    count: 9450,
    img: "https://i.ibb.co/Mk7DdYTX/card-3.png",
  },
  {
    title: "Partners Joined",
    count: 320,
    img: "https://i.ibb.co/N2zw6WJX/card-4.png",
  },
];

const HomeCard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-14 mb-10">

    <div className="text-center mb-12 mt-4">
        <h2 className="text-4xl font-bold text-white">Our Platform Impact</h2>
        <p className="text-gray-300 mt-2 text-lg">
          See what makes AppOrbit a trusted and dynamic marketplace.
        </p>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardsData.map((card, index) => (
          <StatCard key={index} title={card.title} count={card.count} img={card.img} />
        ))}
      </div>
    </div>
  );
};

const StatCard = ({ title, count, img }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="glass-card p-6 h-[330px] rounded-2xl shadow-lg text-center text-white backdrop-blur-md bg-black/25 border border-amber-700"
    >
      <h3 className="text-xl font-semibold mb-14 ">{title}</h3>
      <div className="text-4xl font-bold text-amber-300  mb-18">
        {inView && <CountUp end={count} duration={10} />}
      </div>
      <img src={img} alt={title} className="w-36 h-16 mx-auto mt-6" />
    </motion.div>
  );
};

export default HomeCard;
