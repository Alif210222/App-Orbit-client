import React, { useEffect, useState } from 'react';
import { FaStar, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ReviewSlider = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get(`/reviews/${productId}`)
      .then(res => setReviews(res.data))
      .catch(err => console.error('Failed to fetch reviews', err));
  }, [productId, axiosSecure]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  if (!reviews.length) {
    return <p className="text-white text-center mt-6">No reviews yet.</p>;
  }

  const review = reviews[currentIndex];

  return (
    <div className="max-w-xl mx-auto mt-12 bg-gradient-to-br from-[#32323c] via-[#44372a] to-[#632e05] rounded-xl p-6 shadow-md text-white text-center">
    
      <div className="flex flex-col items-center mb-4">
        <img
          src={review.reviewerImage}
          alt={review.reviewerName}
          className="w-16 h-16 rounded-full border-2 border-white mb-2"
        />
        <h3 className="text-xl font-semibold">{review.reviewerName}</h3>
        <div className="flex justify-center text-yellow-400 mt-1">
          {Array.from({ length: review.rating }).map((_, i) => (
            <FaStar key={i} />
          ))}
        </div>
      </div>

      <p className="text-gray-200 italic mb-6 max-w-md mx-auto">
        “{review.reviewText}”
      </p>

      <div className="flex justify-center items-center gap-6">
        <button
          onClick={handlePrev}
          className="bg-gray-700 hover:bg-gray-600 p-2 rounded-full"
        >
          <FaArrowLeft />
        </button>
        <span className="text-sm text-gray-300">
          {currentIndex + 1} of {reviews.length}
        </span>
        <button
          onClick={handleNext}
          className="bg-gray-700 hover:bg-gray-600 p-2 rounded-full"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default ReviewSlider;
