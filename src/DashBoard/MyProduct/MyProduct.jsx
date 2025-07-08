import React, { use } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Context/AuthContext';
import { Link } from 'react-router';

const MyProduct = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch products
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['my-products', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });





  // Delete mutation
//   const deleteMutation = useMutation({
//     mutationFn: async (id) => {
//       return await axiosSecure.delete(`/products/${id}`);
//     },
//     onSuccess: () => {
//       toast.success('Product deleted successfully');
//       queryClient.invalidateQueries(['my-products', user?.email]);
//     },
//     onError: () => {
//       toast.error('Failed to delete product');
//     },
//   });

  if (isLoading) return <p className="text-center text-white mt-10">Loading your products...</p>;

  return (
    <div className="max-w-7xl  mt-10 p-4 border-2 ">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">My Products</h2>

      <div className="overflow-x-auto rounded-lg bg-white/10 backdrop-blur-md shadow-lg border border-white/20">
        <table className="table text-white w-full">
          <thead >
            <tr className="text-lg text-white bg-white/20">
              <th>#</th>
              <th>Product Name</th>
              <th>Votes</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody className=''>
            {products.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>{product.productName}</td>
                <td>{product.votes || 0}</td>
                <td>
                  <span
                    className={`px-3   py-2 rounded-xl text-sm font-medium ${
                      product.product_status === 'accepted'
                        ? 'bg-green-600'
                        : product.product_status === 'rejected'
                        ? 'bg-red-500'
                        : 'bg-amber-600'
                    }`}
                  >
                    {product.product_status}
                  </span>
                </td>
                <td className="flex gap-3 justify-center mt-2">
                  <Link
                    to={`/update-product/${product._id}`}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => deleteMutation.mutate(product._id)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-white">No products added yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProduct;
