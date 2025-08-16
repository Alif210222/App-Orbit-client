import React, { useState } from "react";
import { motion } from "framer-motion";

const reviews = [
  {
    id: 1,
    name: "John Doe",
    photo: "https://i.ibb.co/B58s0SwQ/user-4.jpg",
    text: "This platform is amazing! I found exactly what I needed.",
    rating: 5,
  },
  {
    id: 2,
    name: "Emily Smith",
    photo: "https://i.ibb.co/Xd54h07/user-3.jpg",
    text: "Great user experience and fast delivery.",
    rating: 4,
  },
  {
    id: 3,
    name: "Michael Lee",
    photo: "https://i.ibb.co/V5G610D/user-5.jpg",
    text: "Very easy to use, I recommend it to everyone.",
    rating: 5,
  },
  {
    id: 4,
    name: "Sophia Johnson",
    photo: "https://i.ibb.co/B58s0SwQ/user-4.jpg",
    text: "Good service, will definitely use again.",
    rating: 4,
  },
  {
    id: 5,
    name: "David Kim",
    photo: "https://i.ibb.co/Xd54h07/user-3.jpg",
    text: "Fantastic experience!",
    rating: 5,
  },
  {
    id: 6,
    name: "Anna Brown",
    photo: "https://i.ibb.co/B58s0SwQ/user-4.jpg",
    text: "Very smooth and reliable platform.",
    rating: 5,
  },
];

const cardVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const UserReviews = () => {
  const [startIndex, setStartIndex] = useState(0);
  const total = reviews.length;

  const handleNext = () => {
    setStartIndex((prev) => (prev + 3) % total);
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 3 + total) % total);
  };

  const visibleReviews = [
    reviews[startIndex],
    reviews[(startIndex + 1) % total],
    reviews[(startIndex + 2) % total],
  ];

  return (
    <section className="py-16 bg-white/5 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          What Our Users Say
        </h2>

        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handlePrev}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg"
          >
            ← Previous
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg"
          >
            Next →
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {visibleReviews.map((review, index) => (
            <motion.div
              key={review.id}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl shadow-lg"
            >
              <div className="flex items-center mb-4">
                <img
                  src={review.photo}
                  alt={review.name}
                  className="w-12 h-12 rounded-full border-2 border-white mr-4"
                />
                <div>
                  <h4 className="font-semibold">{review.name}</h4>
                  <div className="flex">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-300">{review.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserReviews;
