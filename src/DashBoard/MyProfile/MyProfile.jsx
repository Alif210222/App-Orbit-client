import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Key);

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const { data: profile = {}, isLoading,refetch } = useQuery({
    queryKey: ['profile', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/membershipUser/${user?.email}`);
      console.log(res.data)
      return res.data;

      
    },
    enabled: !!user?.email,
  });


  const isSubscribed = profile?.membership_status === 'verified';
  const subscriptionAmount = 50;

  const handleSubscribe = () => {
    setIsOpen(true); // open modal
  };




  return (
    <div>
      <h2 className="text-3xl text-white font-bold mt-20 mb-6 text-center">My Profile</h2>
      <div className="max-w-3xl mx-auto mt-10 bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-lg shadow-lg text-white">
        <div className="flex flex-col items-center text-center">
          <img
            src={user?.photoURL || 'https://i.ibb.co/0j1SPpT/default-avatar.png'}
            alt="User"
            className="w-32 h-32 rounded-full border-4 border-white mb-4"
          />
          <h2 className="text-2xl font-bold">{user?.displayName}</h2>
          <p className="text-gray-300 mt-2">{user?.email}</p>

          {isSubscribed ? (
            <span className="mt-4 inline-block px-4 py-2 font-medium rounded-full text-lg bg-green-600">
             Membership Status: Verified
            </span>
          ) : (
            <button
              onClick={handleSubscribe}
              className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition"
            >
              Subscribe: ${subscriptionAmount}
            </button>
          )}
        </div>
      </div>

      {/* Payment Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-lg max-w-md w-full relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-3 text-xl text-gray-600 hover:text-red-600"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-4">Complete Subscription</h3>
            <Elements stripe={stripePromise}>
              <CheckoutForm
                price={subscriptionAmount}
                user={user}
                closeModal={() => {
                  setIsOpen(false);
                  queryClient.invalidateQueries(['profile']);
                  refetch()
                }}
              />
            </Elements>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
