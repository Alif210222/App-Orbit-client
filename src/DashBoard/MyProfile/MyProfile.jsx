import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // ✅ Get user data for get subscription status
  const { data: profile = {}, isLoading } = useQuery({
    queryKey: ['profile', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });



  const isSubscribed = profile?.membership_status === 'verified';
  const subscriptionAmount = 50;




  // ✅ Mutation to update membership status
  const updateMembership = useMutation({
    mutationFn: async () => {
      const res = await axiosSecure.patch(`/user/${user?.email}`, {
        membership_status: 'verified',
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['profile']);
    },
  });

  const handleSubscribe = () => {
    // ⚠️ Simulating successful payment
    // You’ll call this after Stripe payment is completed successfully
    updateMembership.mutate();
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
          <span className="mt-4 inline-block px-4 py-2 rounded-full text-sm bg-green-600">
            Status: Verified
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
    </div>
  );
};

export default MyProfile;
