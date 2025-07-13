import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const ReportedContents = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch reported products
  const { data: reportedProducts = [], isLoading } = useQuery({
    queryKey: ['reported-products'],
    queryFn: async () => {
      const res = await axiosSecure.get('/reported-products');
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This product will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e3342f',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/deleteReportProduct/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire('Deleted!', 'The product has been removed.', 'success');
          queryClient.invalidateQueries(['reported-products']);
        }
      }
    });
  };

  if (isLoading) return <p className="text-white text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 text-white">
      <h2 className="text-3xl font-bold text-center mb-8">Reported Contents</h2>
      <div className="overflow-x-auto rounded-lg bg-white/10 backdrop-blur-md shadow-md border border-white/20">
        <table className="table w-full text-white">
          <thead>
            <tr className="bg-white/10 text-white">
              <th>#</th>
              <th>Product Name</th>
              <th>Owner</th>
              <th>Status</th>
              <th>Details</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {reportedProducts.map((product, index) => (
              <tr key={product._id} className="hover:bg-white/10">
                <td>{index + 1}</td>
                <td className="capitalize">{product.productName}</td>
                <td>{product.ownerName}</td>
                <td className="capitalize text-red-400">{product.report_status}</td>
                <td>
                  <Link
                    to={`/productDetails/${product._id}`}
                    className="btn btn-sm btn-info"
                  >
                    View
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {reportedProducts.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6">
                  No reported content found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportedContents;
