import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Success', value: 400 },
  { name: 'Cancelled', value: 300 },
  { name: 'Declined', value: 300 },
  { name: 'Ready to Send', value: 200 },
  { name: 'Pending KYC', value: 100 },
];

const COLORS = ['#63BA21', '#FF4B55', '#F59E0B', '#6366F1', '#F6EE3B'];

const DonutGraph = () => {
  return (
    <div className="h-full">
      <div className="bg-[#012646] text-white rounded-3xl p-6 h-full">
        <h2 className="text-xl font-semibold mb-4">Transaction Status</h2>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                layout="vertical"
                align="right"
                verticalAlign="middle"
                formatter={(value) => (
                  <span className="text-[#FCFBF9]">
                    {value}
                  </span>
                )}
                iconType="circle" // Rounded icon
                iconSize={12} // Adjust size for better appearance
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DonutGraph;
