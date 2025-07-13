import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useUserRole = () => {
      const {user,loading} = useContext(AuthContext)
      const axiosSecure = useAxiosSecure()

      const {data:roleData ,isLoading } = useQuery({
            queryKey:["user-role" , user?.email],
              enabled: !!user?.email && !loading, // wait until user is loaded
            queryFn: async() => {
                const res = await axiosSecure.get(`/userRole/${user.email}/role`);
                
                return res.data;
            },
            retry:false,   //avoid retrying if user not found
      })




          const role = roleData?.role || "user" ;

        //   const isModerator = role === "moderator";
        //   const isAdmin = role === "admin"



    return {role,isLoading,user};
};

export default useUserRole;