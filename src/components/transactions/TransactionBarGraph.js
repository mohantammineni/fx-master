import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts';

const data = {
  week: [
    { name: 'Mon', value: 10 },
    { name: 'Tue', value: 20 },
    { name: 'Wed', value: 30 },
    { name: 'Thu', value: 40 },
    { name: 'Fri', value: 50 },
    { name: 'Sat', value: 60 },
    { name: 'Sun', value: 70 }
  ],
  month: [
    { name: 'Week 1', value: 30 },
    { name: 'Week 2', value: 20 },
    { name: 'Week 3', value: 50 },
    { name: 'Week 4', value: 75 }
  ],
  year: [
    { name: 'Jan', value: 30 },
    { name: 'Feb', value: 20 },
    { name: 'Mar', value: 50 },
    { name: 'Apr', value: 75 },
    { name: 'May', value: 60 },
    { name: 'Jun', value: 90 },
    { name: 'Jul', value: 100 },
    { name: 'Aug', value: 70 },
    { name: 'Sep', value: 50 },
    { name: 'Oct', value: 40 },
    { name: 'Nov', value: 80 },
    { name: 'Dec', value: 60 }
  ],
  all: [
    { name: '2020', value: 300 },
    { name: '2021', value: 400 },
    { name: '2022', value: 500 },
    { name: '2023', value: 600 }
  ]
};

const BarGraphCard = () => {
  const [selectedFilter, setSelectedFilter] = useState('year');

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const maxTickValue = Math.ceil(Math.max(...data[selectedFilter].map(d => d.value)) / 25) * 25;
  const yAxisTicks = [0, 25, 50, 75, 100].concat(maxTickValue > 100 ? maxTickValue : []);

  return (
    <div className="h-full">
      <div className="bg-[#012646] text-white rounded-3xl p-6 h-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-semibold">Transaction</h2>
          <div className="flex space-x-2">
            {['week', 'month', 'year', 'all'].map(filter => (
              <button
                key={filter}
                onClick={() => handleFilterChange(filter)}
                className={`px-4 py-1 text-sm ${
                  selectedFilter === filter ? 'bg-custom-blue-400 text-custom-neutral-900' : 'bg-[#212A44] text-custom-ivory-500'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data[selectedFilter]} barSize={18}>
              <XAxis dataKey="name" stroke="#FCFBF9" />
              <YAxis ticks={yAxisTicks} stroke="#FCFBF9" />
              <Tooltip />
              {yAxisTicks.map((tick) => (
                <ReferenceLine y={tick} stroke="#FCFBF9" strokeDasharray="0 0" key={tick} />
              ))}
              <Bar dataKey="value" fill="#40DEFF" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default BarGraphCard;
