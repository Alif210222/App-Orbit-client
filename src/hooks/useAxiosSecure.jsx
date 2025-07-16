import axios from 'axios';
import React, { use, useMemo } from 'react';
import { AuthContext } from '../Context/AuthContext';
// import { getToken } from '../Context/AuthProvider';

// const axiosSecure = axios.create({
//                     baseURL:`https://app-orbit-server.vercel.app`
// });


const useAxiosSecure = () => {
      const {token} = use(AuthContext)


      const axiosSecure = useMemo(() => {
    const instance = axios.create({
      baseURL: 'https://app-orbit-server.vercel.app', // your API base URL
    });


   instance.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return instance;
  }, [token]); // re-create when token changes

  return axiosSecure;
};


export default useAxiosSecure;



