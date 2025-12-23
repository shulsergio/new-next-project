"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Данные
const data = [
  { name: "w49", plan: 100, fact: 400 },
  { name: "w50", plan: 200, fact: 300 },
  { name: "w51", plan: 300, fact: 200 },
  { name: "w52", plan: 400, fact: 100 },
];

const NewRecharts = () => {
  return (
    <div style={{ width: "100%", height: 200 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Bar dataKey="plan" fill="#8884d8" radius={[3, 3, 0, 0]} />
          <Bar dataKey="fact" fill="#82ca9d" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NewRecharts;
