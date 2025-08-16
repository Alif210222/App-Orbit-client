import { FaCalendarAlt, FaPercent, FaTag, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CouponSlider = () => {
  const [index, setIndex] = useState(0);
  const visibleCount = 2;
  const [coupons, setCoupons] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await axiosSecure.get("/homepageCoupons");
        setCoupons(res.data);
        // console.log(res.data)
      } catch (error) {
        console.error("Failed to fetch coupons", error);
      }
    };
    fetchCoupons();
  }, [axiosSecure]);

  const next = () => {
    setIndex((prev) => (prev + 1) % coupons.length);
  };

  const prev = () => {
    setIndex((prev) =>
      (prev - 1 + coupons.length) % coupons.length
    );
  };

const getVisibleCoupons = () => {
  if (!coupons || coupons.length === 0) return [];
  const visible = [];
  for (let i = 0; i < visibleCount; i++) {
    visible.push(coupons[(index + i) % coupons.length]);
  }
  return visible;
};

  return (
    <div className="relative mt-24 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-3 text-center  text-white">All Coupons</h2>
      <p className="text-center mb-14 text-gray-400">When you verify your account, you can get some discounts by using this coupon card. </p>

      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="flex gap-6"
            initial={{ x: 150, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -150, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {getVisibleCoupons().map((coupon , idx ) => coupon && (
              <div
                key={coupon._id || idx}
                className="w-full md:w-1/2 bg-gradient-to-br from-purple-600 to-blue-500 text-white p-6 rounded-xl shadow-xl hover:scale-105 transition-transform duration-300"
              >
                <h4 className="text-2xl font-bold flex items-center gap-2 mb-2">
                  <FaTag className="text-yellow-300" />
                  {coupon.code}
                </h4>
                <p className="text-sm mb-2 italic">{coupon.description}</p>
                <p className="flex items-center gap-2 mb-1">
                  <FaCalendarAlt className="text-white/80" />
                  <span className="text-sm">Expires: {coupon.expiryDate}</span>
                </p>
                <p className="flex items-center gap-2 mt-4 text-lg font-semibold border border-green-400 bg-green-100/20 text-green-200 px-3 py-2 rounded-lg w-fit">
                  <FaPercent className="text-green-300" />
                  <span>{coupon.discount}% OFF</span>
                </p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Always-enabled Navigation Buttons */}
      <div className="flex justify-center my-16 gap-4">
        <button
          onClick={prev}
          className="p-3 rounded-full shadow-lg text-white bg-amber-600/30 hover:bg-amber-700/30 cursor-pointer transition"
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={next}
          className="p-3 rounded-full shadow-lg text-white bg-amber-600/30 hover:bg-amber-700/30 cursor-pointer transition"
        >
          <FaArrowRight />
        </button>
      </div>

      {/* No coupons fallback */}
      {coupons.length === 0 || !coupons && (
        <div className="mt-10 bg-amber-100 text-black rounded-2xl text-center p-4 shadow-md">
          No Coupon Available
        </div>
      )}
    </div>
  );
};

export default CouponSlider;
