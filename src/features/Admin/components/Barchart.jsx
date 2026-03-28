import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";

// Same style tooltip as WaveChart
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#fff",
          padding: "8px 12px",
          border: "1px solid #E5E7EB",
          borderRadius: "6px",
          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "12px",
            fontWeight: "bold",
            color: "#374151",
          }}
        >
          Date {payload[0].payload.name}
        </p>
        <p
          style={{
            margin: 0,
            fontSize: "12px",
            color: "#27ae60",
          }}
        >
          Value: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

function Barchart({
  data,
  dataKey,
  yAxisLabel,
  highlightPoints = [],
}) {
  return (
    <div style={{ width: "100%", height: 350 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 20, left: 15, right: 10, bottom: 5 }}
        >
          {/* Clean grid like WaveChart */}
          <CartesianGrid
            vertical={false}
            stroke="#e5e7eb5c"
            strokeDasharray="0"
          />

          {/* X Axis */}
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9CA3AF", fontSize: 11 }}
            dy={10}
          />

          {/* Y Axis */}
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
              style: {
                textAnchor: "middle",
                fill: "#9CA3AF",
                fontSize: 12,
                fontWeight: 300,
              },
            }}
          />

          {/* Tooltip */}
          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              fill: "rgba(39,174,96,0.05)",
            }}
          />

          {/* Bars (single clean bar like wave line) */}
          <Bar
            dataKey={dataKey}
            fill="#27ae60"
            radius={[4, 4, 0, 0]}
            barSize={40}
          />

          {/* Optional highlight points */}
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
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Barchart;