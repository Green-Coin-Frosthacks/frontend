import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";

// Custom Tooltip Component tailored for the Wave Chart
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: "#fff",
        padding: "8px 12px",
        border: "1px solid #E5E7EB",
        borderRadius: "6px",
        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
      }}>
        <p style={{ margin: 0, fontSize: "12px", fontWeight: "bold", color: "#374151" }}>
          Day {payload[0].payload.name}
        </p>
        <p style={{ margin: 0, fontSize: "12px", color: "#27ae60" }}>
          Value: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

const WaveChart = ({ data, dataKey, yAxisLabel, highlightPoints = [] }) => {
  return (
    <div style={{ width: "100%", height: 350 }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{ top: 20, left: 15, right: 10, bottom: 5 }}
        >
          <CartesianGrid 
            vertical={false} 
            stroke="#e5e7eb5c" 
            strokeDasharray="0" 
          />
          
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9CA3AF", fontSize: 11 }}
            dy={10}
          />
          
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9CA3AF", fontSize: 11 }}
            width={40}
            label={{
              value: yAxisLabel,
              angle: -90,
              position: "insideLeft",
              offset: -3,
              style: { textAnchor: "middle", fill: "#9CA3AF", fontSize: 12, fontWeight: 300 },
            }}
          />

          {/* Integration of the Custom Tooltip */}
          <Tooltip 
            content={<CustomTooltip />} 
            cursor={{ stroke: '#27ae60', strokeWidth: 1, strokeDasharray: '3 3' }} 
          />

          <defs>
            <linearGradient id="colorOrange" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#27ae60" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#27ae60" stopOpacity={0} />
            </linearGradient>
          </defs>

          <Area
            type="monotone"
            dataKey={dataKey}
            stroke="#27ae60"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorOrange)"
            animationDuration={1500}
          />

          {highlightPoints.map((point, index) => (
            <ReferenceDot
              key={index}
              x={point.x}
              y={point.y}
              r={5}
              fill="black"
              stroke="none"
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WaveChart;