// ✅ FeaturedProducts.jsx - Display featured product cards (with fetch)

import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate, Link } from 'react-router';
import { FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure()


  
  useEffect(() => {
    fetch('http://localhost:4000/featured-products')
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setFeaturedProducts(sorted.slice(0, 8));
      });
  }, []);




 const handleUpvote = async (productId) => {

     console.log("vote click")

    if (!user) return navigate('/login');

    try {
      const res = await axiosSecure.patch(`/upvote/${productId}`, {
        userEmail: user.email,
      });

      if (res.data.modifiedCount > 0) {
        setFeaturedProducts( (prev) =>
          prev.map((p) =>
            p._id === productId
              ? { ...p, vote_count: (p.vote_count || 0) + 1, voted: true }
              : p
          )
        );
      }
    } catch (err) {
      console.error('Upvote failed', err);
    }
  };


  return (
    <div className="max-w-7xl mx-auto px-4 py-10 ">                    
      <h2 className="text-3xl font-bold text-center text-white mb-16">
        Featured Products
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 ">
        {featuredProducts.map((product) => (
          <div
            key={product._id}
            className="bg-gradient-to-br from-[#1a0461] via-[#000000] to-[#431b01] rounded-xl shadow-lg overflow-hidden w-70 h-96 text-center"
          >
            <div className='flex justify-center p-3'>
            <img
              src={product.image}
              alt={product.productName}
              className="w-40 h-40 object-cover rounded-full "
            />
             </div>
            <div className="p-4 text-white">
              <Link
                to={`/productDetails/${product._id}`}
                className="text-xl font-semibold capitalize hover:underline "
              >
                {product.productName}
              </Link>

              <div className="mt-6 flex flex-wrap gap-2 ">
                {product.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-orange-500 text-xs px-2 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex justify-between items-center ">

                <button
                  onClick={() => handleUpvote(product._id)}
                  className="flex items-center gap-1 text-white bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-lg disabled:opacity-50"
                  disabled={user?.email === product.ownerEmail || product.voted}
                >
                  <FaHeart className="text-lg" /> {product.vote_count || 0}
                </button>

                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
