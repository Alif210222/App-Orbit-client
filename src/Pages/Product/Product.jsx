// ✅ ProductsPage.jsx - Search, Pagination, Display Cards

import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import { FaHeart } from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet';
import { motion } from "framer-motion";


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
        className="w-full text-white md:w-1/2 mx-auto block mb-6 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <motion.div
            key={product._id}
             
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg overflow-hidden text-white"
          >
            <img
              src={product.image || 'https://via.placeholder.com/300'}
              alt={product.productName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <Link
                to={`/productDetails/${product._id}`}
                className="text-xl font-semibold hover:underline capitalize"
              >
                {product.productName}
              </Link>

              <div className="mt-2 flex flex-wrap gap-2">
                {product.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-orange-500 text-xs px-2 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => handleUpvote(product._id)}
                  className="flex items-center gap-1 text-white bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-lg disabled:opacity-50"
                  disabled={user?.email === product.ownerEmail || product.voted}
                >
                  <FaHeart className="text-lg" /> {product.vote_count || 0}
                </button>

                <img
                  src={product.ownerImage || 'https://via.placeholder.com/40'}
                  alt={product.ownerName}
                  className="w-8 h-8 rounded-full border-2 border-white"
                  title={product.ownerName}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center gap-2">
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
