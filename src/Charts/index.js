import React from 'react';
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from 'recharts';
import { data } from './test';


function Charts() {
  return (
    <LineChart
      width={730}
      height={250}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="record_date"  />
      <YAxis  />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="total_cases" stroke="#8884d8" />
      <Line type="monotone" dataKey="active_cases" stroke="#82ca9d" />
    </LineChart>
  );
}

export default Charts