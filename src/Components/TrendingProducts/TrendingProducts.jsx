import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import { FaHeart } from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { motion } from 'framer-motion';

const TrendingProducts = () => {
  const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    fetch('https://app-orbit-server.vercel.app/trending-products')
      .then(res => res.json())
      .then(data => {
        const sorted = data
          .sort((a, b) => (b.vote_count || 0) - (a.vote_count || 0))
          .slice(0, 6); // top 6 products
        setProducts(sorted);
      });
  }, []);

  const handleUpvote = async (productId) => {
    if (!user) return navigate('/login');

    try {
      const res = await axiosSecure.patch(`/upvote/${productId}`, {
        userEmail: user.email,
      });

      if (res.data.modifiedCount > 0) {
        setProducts(prev =>
          prev.map(p =>
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
    <div className="max-w-7xl mx-auto px-4 py-10">
     <motion.h2
        className="text-3xl font-bold text-center text-white mt-30 mb-16"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Trending Products
      </motion.h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {products.map((product, index ) => (
          <motion.div key={product._id} 
           initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          className="bg-gradient-to-br from-[#5c2203] via-[#1b1d26] to-[#04081c] border border-white/20 rounded-xl shadow-lg overflow-hidden   text-white hover:scale-105 transition-transform duration-300   ">
          
           <div className='p-6'>
            
            <div className='flex justify-between'>
      {/* text */}
        <div className='space-y-4'>

            <div className="p-2">
              <Link
                to={`/productDetails/${product._id}`}
                className="text-xl font-semibold hover:underline capitalize block"
              >
                {product.productName}
              </Link>
           </div>

           <div className='w-52 text-gray-300'>
            {product.description}
           </div>
        

        
              {/* <div className="mt-2 flex  flex-wrap gap-2">
                {product.tags.map((tag, idx) => (
                  <span key={idx} className="bg-orange-500 text-xs px-2 py-1 rounded-full">#{tag}</span>
                ))}
              </div> */}

        </div>

   {/* image      */}
           <div className='flex justify-center p-3'>
            <img
              src={product.image || 'https://via.placeholder.com/400x200?text=No+Image'}
              alt={product.productName}
              className="w-20 h-20 object-cover rounded-full "
            />
        </div>


     </div>

     {/* button bottom */}
              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => handleUpvote(product._id)}
                  className="flex items-center gap-1 text-amber-700 border-1 border-amber-600 hover:bg-amber-600/20 px-3 py-1.5 rounded-lg disabled:opacity-50"
                  disabled={user?.email === product.ownerEmail || product.voted}
                >
                  <FaHeart className="text-lg" /> {product.vote_count || 0}
                </button>

                <img
                  src={product.ownerImage || 'https://i.ibb.co/4pDNDk1/default-user.png'}
                  alt={product.ownerName}
                  className="w-10 h-10 rounded-full border-1 border-amber-600 p-1"
                  title={product.ownerName}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-16">
        <Link
          to="/product"
          className="bg-amber-600/30 hover:bg-amber-700/30 cursor-pointer text-gray-300 font-semibold px-6 py-3 rounded-lg shadow-md"
        >
          Show All Products
        </Link>
      </div>
    </div>
  );
};

export default TrendingProducts;
