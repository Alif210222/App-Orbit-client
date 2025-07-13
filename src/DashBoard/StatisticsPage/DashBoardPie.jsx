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

    <div className='min-h-screen '>

  
    <div className="max-w-4xl  mx-auto  px-4 text-white">
      <h2 className="text-3xl font-bold text-center mt-20 mb-">Dashboard Summary</h2>
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

      </ResponsiveContainer>

        {/* Summary Cards - now below chart */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center mt-10">
          <div className="bg-green-400 text-black font-bold p-4 rounded-2xl shadow-md">
            Accepted Products: <span className="block text-2xl">{data.accepted}</span>
          </div>
          <div className="bg-amber-300 text-black font-bold p-4 rounded-2xl shadow-md">
            Pending Products: <span className="block text-2xl">{data.pending}</span>
          </div>
          <div className="bg-orange-400 text-black font-bold p-4 rounded-2xl shadow-md">
            Total Reviews: <span className="block text-2xl">{data.reviews}</span>
          </div>
          <div className="bg-[#8884d8] text-black font-bold p-4 rounded-2xl shadow-md">
            Total Users: <span className="block text-2xl">{data.users}</span>
          </div>
        </div>

      
    </div>

      
    </div>
  );
};

export default DashboardPie;
