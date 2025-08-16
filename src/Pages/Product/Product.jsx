// ✅ ProductsPage.jsx - Search, Pagination, Display Cards

import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import { FaHeart } from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet';
import { motion } from "framer-motion";
import Loading from '../../Components/Loading/Loading';


const Product = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const limit = 6;

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, currentPage]);

  const fetchProducts = async () => {
    try {
      const res = await axiosSecure.get(`/alProducts?search=${searchTerm}&page=${currentPage}&limit=${limit}`);
      setProducts(res.data.products);
      setTotalPages(res.data.total);
    } catch (error) {
      console.error('Fetching products failed:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // reset to first page on new search
  };

  const handleUpvote = async (productId) => {
    if (!user) return navigate('/login');

    try {
      const res = await axiosSecure.patch(`/upvote/${productId}`, {
        userEmail: user.email,
      });

      if (res.data.modifiedCount > 0) {
        setProducts((prev) =>
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

   if ( !products) {
  return <Loading></Loading>;
}

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-screen">
            <Helmet>
                   <title>Products | App Orbit</title>
              </Helmet>


      <h2 className="text-3xl font-bold text-center text-white mb-8">
        All Products
      </h2>

      <input
        type="text"
        placeholder="Search by tag..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full text-white md:w-1/2 mx-auto block mt-20 mb-14 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <motion.div
            key={product._id}
             
            className="bg-white/5 backdrop-blur-md border border-white/20 rounded-xl shadow-lg overflow-hidden text-white"
          >
            <Link
            
             to={`/productDetails/${product._id}`} >
                    <img
                    src={product.image || 'https://via.placeholder.com/300'}
                    alt={product.productName}
                    className="w-full h-48 object-cover"
                  />
            </Link>
           

            <div className="p-4">
              <Link
                to={`/productDetails/${product._id}`}
                className="text-xl font-semibold hover:underline capitalize"
              >
              <span className='text-amber-800'>Product Name :</span>   {product.productName}
              </Link>

              <div className="mt-4 mb-8 flex flex-wrap gap-2 text-amber-700"> Tag : 
                {product.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-[#582d0f] text-white  text-xs px-3 py-2 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              

              <div className="mt-4 flex justify-between items-center">


                <div >
                  <Link to={`/productDetails/${product._id}`}  >
                  <button className='border-1 border-amber-600 p-2 rounded-lg cursor-pointer hover:text-amber-700'>Details</button>
                  </Link>
                </div>

                <div className='flex gap-3'>

                
                <button
                  onClick={() => handleUpvote(product._id)}
                  className="flex items-center gap-1 text-amber-700 border-1 border-amber-800 hover:bg-amber-600/20 px-3 py-1.5 rounded-lg disabled:opacity-50"
                  disabled={user?.email === product.ownerEmail || product.voted}
                >
                  <FaHeart className="text-lg" /> {product.vote_count || 0}
                </button>

                <img
                  src={product.ownerImage || 'https://via.placeholder.com/40'}
                  alt={product.ownerName}
                  className="w-10 h-10 rounded-full border-2 p-1 border-amber-800"
                  title={product.ownerName}
                />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-20 flex justify-center gap-2">
        {[0,1,2,3].map((num) => (
          <button
            key={num}
            onClick={() => setCurrentPage(num + 1)}
            className={`px-4 py-2 rounded-md font-medium border transition ${
              currentPage === num + 1 ? 'bg-blue-600 text-white' : 'bg-white text-black'
            }`}
          >
            {num + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Product;
