import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../Context/AuthContext';
import { Link } from 'react-router'; // ✅ use 'react-router-dom'
import Swal from 'sweetalert2';
import Loading from '../../Components/Loading/Loading';

const MyProduct = () => {
  const { user,loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    data,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['my-products', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email && !loading ,
  });

  const products = Array.isArray(data) ? data : [];

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this product!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/deleteProduct/${id}`).then((res) => {
            // console.log(res.data)
          if (res.data?.deletedCount > 0) {
            Swal.fire({
              title: 'Deleted!',
              text: 'Your product has been deleted.',
              icon: 'success',
            });
            refetch(); // ✅ This is correct here
          }
        });
      }
    });
  };

  if (isLoading) return <Loading></Loading>
  if (isError) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="max-w-7xl mt-10 p-6">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">My Products</h2>

      <div className="overflow-x-auto rounded-lg bg-white/10 backdrop-blur-md shadow-lg border border-white/20">
        <table className="table text-white w-full">
          <thead>
            <tr className="text-lg text-white bg-white/20">
              <th>#</th>
              <th>Product Name</th>
              <th>Votes</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr key={product._id}>
                  <td>{index + 1}</td>
                  <td className="capitalize">{product.productName}</td>
                  <td>{product.vote_count || 0}</td>
                  <td>
                    <span
                      className={`px-3 py-2 rounded-xl text-sm font-medium capitalize ${
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
                      onClick={() => handleDelete(product._id)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-white">
                  No products added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProduct;
