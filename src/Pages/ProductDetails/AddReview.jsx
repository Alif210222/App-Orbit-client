// components/PostReviewForm.jsx
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Context/AuthContext';
import { useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AddReview = () => {
  const { user } = useContext(AuthContext);
  const { id: productId } = useParams(); // from URL
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    const reviewData = {
      reviewerName: user.displayName,
      reviewerImage: user.photoURL,
      reviewText: data.reviewText,
      rating: parseInt(data.rating),
      productId,
      createdAt: new Date().toISOString(),
    };

    console.log(reviewData)

    try {
      const res = await axiosSecure.post('/reviews', reviewData);
      if (res.data.insertedId) {
        Swal.fire({
          icon: 'success',
          title: 'Review Submitted',
          timer:2500,
          showConfirmButton: false,
        });
        reset();
      }
    } catch (error) {
      console.error('Error posting review:', error);
    }
  };

  return (
    <div className="bg-white/10 text-white border border-white/20 p-6 rounded-lg mt-8">
   
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Reviewer Name */}
        <div>
          <label className="block mb-1">Reviewer Name</label>
          <input
            type="text"
            value={user?.displayName || ''}
            readOnly
            className="w-full px-4 py-2 rounded bg-white/20 text-white"
          />
        </div>

        {/* Reviewer Image */}
        <div>
          <label className="block mb-1">Reviewer Image</label>
          <input
            type="text"
            value={user?.photoURL || ''}
            readOnly
            className="w-full px-4 py-2 rounded bg-white/20 text-white"
          />
        </div>

        {/* Review Description */}
        <div>
          <label className="block mb-1">Review</label>
          <textarea
            {...register("reviewText", { required: "Review is required" })}
            className="w-full px-4 py-2 rounded bg-white/20 text-white"
            rows="4"
            placeholder="Write your review..."
          />
          {errors.reviewText && (
            <p className="text-red-300 text-sm mt-1">{errors.reviewText.message}</p>
          )}
        </div>

        {/* Rating */}
        <div>
          <label className="block mb-1">Rating (1 to 5)</label>
          <input
            type="number"
            {...register("rating", {
              required: "Rating is required",
              min: 1,
              max: 5,
            })}
            className="w-full px-4 py-2 rounded bg-white/20 text-white"
          />
          {errors.rating && (
            <p className="text-red-300 text-sm mt-1">{errors.rating.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600 px-6 py-2 rounded-lg font-semibold"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default AddReview;
