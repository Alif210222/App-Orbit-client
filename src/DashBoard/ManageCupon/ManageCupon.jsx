import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { FaPercent, FaCalendarAlt, FaTag } from 'react-icons/fa';

const ManageCupon = () => {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset, setValue } = useForm();
  const [coupons, setCoupons] = useState([]);
  const [editingCoupon, setEditingCoupon] = useState(null);

  const fetchCoupons = async () => {
    const res = await axiosSecure.get('/coupons');
    setCoupons(res.data);
  };

  useEffect(() => {
    fetchCoupons();
  }, []);


  const onSubmit = async (data) => {
    if (editingCoupon) {
      const res = await axiosSecure.patch(`/coupons/${editingCoupon._id}`, data);
      if (res.data.modifiedCount > 0) {
        toast.success('Coupon updated successfully');
        setEditingCoupon(null);
        reset();
        fetchCoupons();
      }
    } else {
      const res = await axiosSecure.post('/coupons', data);
      if (res.data.insertedId) {
        toast.success('Coupon added successfully');
        reset();
        fetchCoupons();
      }
    }
  };

  const handleEdit = (coupon) => {
    setEditingCoupon(coupon);
    setValue('code', coupon.code);
    setValue('expiryDate', coupon.expiryDate);
    setValue('description', coupon.description);
    setValue('discount', coupon.discount);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this coupon!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/coupons/${id}`);
        if (res.data.deletedCount > 0) {
          toast.success('Coupon deleted');
          fetchCoupons();
        }
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center underline">Manage Coupons</h2>

      {/* Table */}
      <div className="overflow-x-auto mb-10 bg-white/10 rounded-lg shadow-lg">
        <table className="table w-full text-white">
          <thead>
            <tr className= ' text-white bg-white/10'>
              <th>#</th>
              <th>Coupon Code</th>
              <th>Expiry Date</th>
              <th>Discount</th>
              
              <th className=''>Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon, index) => (
              <tr key={coupon._id}>
                <td>{index + 1}</td>
                <td>{coupon.code}</td>
                <td>{coupon.expiryDate}</td>
                <td>{coupon.discount}%</td>
               
                <td className="flex gap-2 ">
                  <button onClick={() => handleEdit(coupon)} className="btn btn-sm btn-info">Edit</button>
                  <button onClick={() => handleDelete(coupon._id)} className="btn btn-sm btn-error">Delete</button>
                </td>
              </tr>
            ))} 
            
          </tbody>
         
        </table>
            {
                coupons.length === 0 && <p className='text-center p-3 '>No Coupon Available  </p>
            }
      </div>

      {/* Slider cards */}
      <h2 className="text-3xl font-bold mb-6 text-center underline mt-24">All Coupons</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 px-4">
  {coupons.map((coupon) => (
    <div
      key={coupon._id}
      className="bg-gradient-to-br from-purple-600 to-blue-500 text-white p-6 rounded-xl shadow-xl hover:scale-105 transition-transform duration-300"
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

  {/* Optional: Message when no coupons */}
  {coupons.length === 0 && (
    <div className="col-span-full bg-amber-100 text-black rounded-2xl text-center p-4 shadow-md">
      No Coupon Available
    </div>
  )}
</div>

      

      {/* Add/Edit Coupon Form */}
       <h3 className={`text-3xl font-bold mb-4 rounded-2xl  text-center ${editingCoupon? "bg-[#5a73f1]" : "bg-[#48b846]" }   p-2 mt-30`} >{editingCoupon ? 'Edit' : 'Add'} Coupon</h3>
      <div className="bg-white/10 p-6 rounded-lg shadow-lg">
       
        <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">Coupon Code</label>
            <input {...register('code', { required: true })} placeholder='Add coupon code ' className="w-full px-4 py-2 rounded text-white  border-1 border-white" />
          </div>
          <div>
            <label className="block font-medium mb-1">Expiry Date</label>
            <input type="date" {...register('expiryDate', { required: true })} className="w-full px-4 py-2 rounded text-white border-1 border-white" />
          </div>
          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Description</label>
            <textarea {...register('description')} placeholder='Add coupon description' className="w-full px-4 py-2 rounded text-white border-1 border-white" rows="3"></textarea>
          </div>
          <div>
            <label className="block font-medium mb-2">Discount (%)</label>
            <input type="number" {...register('discount', { required: true })} placeholder='Add your discount amount' className="w-full px-4 py-2 rounded text-white border-1 border-white" />
          </div>
          <div className="md:col-span-2 text-center mt-4">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded text-white font-semibold">
              {editingCoupon ? 'Update Coupon' : 'Add Coupon'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageCupon;
