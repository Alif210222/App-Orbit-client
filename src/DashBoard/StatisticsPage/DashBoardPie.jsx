// DashboardPie.jsx
import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const DashboardPie = () => {
  const axiosSecure = useAxiosSecure();

  const { data = {}, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/dashboard-stats');
      return res.data;
    }
  });

  if (isLoading) return <p className="text-white text-center mt-20">Loading...</p>;

  const chartData = [
    { name: 'Accepted Products', value: data.accepted },
    { name: 'Pending Products', value: data.pending },
    { name: 'Total Reviews', value: data.reviews },
    { name: 'Total Users', value: data.users },
  ];

  return (

    <div className=' '>

  
    <div className="max-w-4xl  mx-auto py-10 px-4 text-white">
      <h2 className="text-3xl font-bold text-center mb-8">Dashboard Summary</h2>
      <ResponsiveContainer width="100%" height={400} >
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={130}
            fill="#8884d8"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>

      <div className='hidden md:hidden lg:flex gap-6 text-center    mt-10 space-y-4 '>
         <p className='text-black p-3 bg-green-400 font-bold  w-50 h-12 rounded-2xl'>Accepted Products : {data.accepted}</p>
         <p className='text-black p-3 bg-amber-300 font-bold  w-50  h-12  rounded-2xl'>Pending Products : {data.pending}</p>
         <p className='text-black p-3 bg-orange-400 font-bold  w-50   h-12 rounded-2xl'>Total Reviews : {data.reviews} </p>
         <p className='text-black p-3 bg-[#8884d8] font-bold  w-50   h-12 rounded-2xl'>Total Users : {data.users}</p>
       </div>

      </ResponsiveContainer>

      
    </div>

      
    </div>
  );
};

export default DashboardPie;
