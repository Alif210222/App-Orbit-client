// ✅ ProductReview.jsx - Moderator's product review table (with React Query & enhanced UI)

import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Link } from 'react-router';
import { toast } from 'react-toastify';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import Loading from '../../Components/Loading/Loading';

const ProductReview = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['all-products'],
    queryFn: async () => {
      const res = await axiosSecure.get('/reviewProducts');
      const sorted = res.data.sort((a, b) => {
        const order = { pending: 0, accepted: 1, rejected: 2 };
        return order[a.product_status] - order[b.product_status];
      });
      return sorted;
    },
  });


  console.log(products)


  const handleStatusUpdate = async (id, status) => {
    try {
      const res = await axiosSecure.patch(`/update-status/${id}`, {
        product_status: status,
      });
      if (res.data.modifiedCount > 0) {
       Swal.fire({
                                   title: "updated!",
                                   text: "product status updated.",
                                   icon: "success"
                                   });
        queryClient.invalidateQueries({ queryKey: ['all-products'] });
      }
    } catch (err) {
      toast.error('Status update failed');
    }
  };



  const handleMakeFeatured = async (id,status) => {
    try {
      const res = await axiosSecure.patch(`/make-featured/${id}`,{
         featured_status: status,
      });
      if (res.data.modifiedCount > 0) {
         Swal.fire({
                                   title: "updated!",
                                   text: "Featured status updated.",
                                   icon: "success"
                                   });
        queryClient.invalidateQueries({ queryKey: ['all-products'] });
      }
    } catch (err) {
      toast.error('Failed to mark as featured');
    }
  };



  if (isLoading) return <Loading></Loading>

  return (
    <div className="max-w-7xl mt-10 px-4 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Product Review Queue</h2>
      <div className="overflow-x-auto rounded-lg bg-white/10 backdrop-blur-md shadow-md border border-white/20">
        <table className="table w-full text-white bg-white/20">
          <thead>
            <tr className="text-left text-white bg-white/20">
              <th>#</th>
              <th>Product Name</th>
              <th>Status</th>
              <th>Details</th>
              <th>Featured</th>
              <th>Accept</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id} className="hover:bg-white/5">
                <td>{index + 1}</td>
                <td>{product.productName}</td>
                <td className="capitalize">{product.product_status}</td>
                <td>
                  <Link to={`/productDetails/${product._id}`} className="btn btn-sm btn-info">
                    View
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => handleMakeFeatured(product._id,"featured")}
                    className="btn btn-sm btn-warning"
                     disabled={product.featured_status === 'featured'}
                  >
                    Feature
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleStatusUpdate(product._id, 'accepted')}
                    className="btn btn-sm btn-success"
                    disabled={product.product_status === 'accepted'}
                  >
                    Accept
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleStatusUpdate(product._id, 'rejected')}
                    className="btn btn-sm btn-error"
                    disabled={product.product_status === 'rejected'}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductReview;
