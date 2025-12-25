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

interface WeeklyPlan {
  totalSOplanW1: number;
  totalSOplanW2: number;
  totalSOplanW3: number;
  totalSOplanW4: number;
  totalSOplanW5: number;
  focusSOplanW1: number;
  focusSOplanW2: number;
  focusSOplanW3: number;
  focusSOplanW4: number;
  focusSOplanW5: number;
}

interface NewRechartsProps {
  plans: WeeklyPlan[];
}

const NewRecharts = ({ plans }: NewRechartsProps) => {
  if (!plans || plans.length === 0) {
    return (
      <div style={{ height: 200, color: "gray" }}>Загрузка графиков...</div>
    );
  }
  const currentPlan = plans[0];

  const data = [
    { name: "w49", plan: currentPlan.totalSOplanW1, fact: 400 },
    { name: "w50", plan: currentPlan.totalSOplanW2, fact: 300 },
    { name: "w51", plan: currentPlan.totalSOplanW3, fact: 200 },
    { name: "w52", plan: currentPlan.totalSOplanW4, fact: 100 },
  ];

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
