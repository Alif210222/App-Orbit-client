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
    <div className="max-w-4xl mx-auto py-10 px-4 text-white">
      <h2 className="text-3xl font-bold text-center mb-8">Dashboard Summary</h2>
      <ResponsiveContainer width="100%" height={400}>
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
    </div>
  );
};

export default DashboardPie;
