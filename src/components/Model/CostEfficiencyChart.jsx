import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: '2025',
    ongs: 500000,
    fondos: 1440000,
    fee: 1540000,
  },
  {
    name: '2026',
    ongs: 1200000,
    fondos: 3440000,
    fee: 830000,
  },
  {
    name: '2027',
    ongs: 2500000,
    fondos: 7000000,
    fee: 500000,
  },
];

const CostEfficiencyChart = ({ labels }) => {
  const [isMounted] = useState(() => typeof window !== 'undefined');

  if (!isMounted) {
    return <div style={{ width: '100%', height: '100%' }} />;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 50,
          right: 30,
          left: 20,
          bottom: 20,
        }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="#ffffff30"
        />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fill: 'white', fontSize: 16 }}
        />
        <YAxis hide={true} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1E1E1E',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
          }}
          itemStyle={{ color: 'white' }}
        />
        <Legend
          verticalAlign="top"
          align="left"
          layout="horizontal"
          iconType="line"
          wrapperStyle={{
            paddingBottom: '20px',
            fontSize: '14px',
            color: 'white',
            textTransform: 'capitalize',
          }}
          iconSize={20}
          formatter={value => {
            if (value === 'fondos') return labels.fondos;
            if (value === 'ongs') return labels.ongs;
            if (value === 'fee') return labels.fee;
            return value;
          }}
        />
        <Line
          type="monotone"
          dataKey="fondos"
          stroke="#90EE90"
          strokeWidth={3}
          dot={false}
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="ongs"
          stroke="#FFA500"
          strokeWidth={3}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="fee"
          stroke="#FF69B4"
          strokeWidth={3}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CostEfficiencyChart;
