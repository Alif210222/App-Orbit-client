import axios from 'axios';
import React, { use } from 'react';
import { AuthContext } from '../Context/AuthContext';

const axiosSecure = axios.create({
                    baseURL:`https://app-orbit-server.vercel.app`
});


const useAxiosSecure = () => {

      const {user} = use(AuthContext)

      axiosSecure.interceptors.request.use(config =>{
          config.headers.Authorization = `Bearer ${user?.accessToken}`
          return config;
      }, error =>{
          return Promise.reject(error)
      })


    return axiosSecure;
};

export default useAxiosSecure;