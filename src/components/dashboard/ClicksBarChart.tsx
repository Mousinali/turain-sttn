import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Custom tooltip for the Bar Chart to match dark mode
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900/90 backdrop-blur-md border border-gray-700/50 p-3 rounded-lg shadow-2xl transform transition-all duration-200">
        <p className="text-gray-400 text-sm mb-1 font-medium">{label}</p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
          <p className="text-green-400 font-bold text-lg">
            {payload[0].value} <span className="text-sm font-medium text-green-500/80">clicks</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

interface ClicksBarChartProps {
  data: { name: string; clicks: number }[];
}

export default function ClicksBarChart({ data }: ClicksBarChartProps) {
  return (
    <div className="lg:col-span-2 bg-[#111216] border border-gray-800/60 hover:border-gray-700/60 transition-colors duration-300 rounded-xl p-6 shadow-sm group relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute top-0 left-1/4 w-1/2 h-32 bg-green-500/5 rounded-full blur-[60px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div className="mb-6 relative z-10 flex items-center justify-between">
        <div>
          <h3 className="text-white font-medium flex items-center gap-2">
            Clicks over time
          </h3>
          <p className="text-sm text-gray-400 mt-1 transition-colors group-hover:text-gray-300">Last 7 days performance</p>
        </div>
        <div className="p-2 bg-gray-800/30 rounded-lg border border-gray-700/30">
          <i className="ri-bar-chart-2-fill text-green-500/70 text-lg"></i>
        </div>
      </div>
      
      <div className="h-64 w-full relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#374151"
              opacity={0.4}
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
            />
            <Tooltip
              cursor={{ fill: "rgba(31, 41, 55, 0.4)", radius: 4 }}
              content={<CustomTooltip />}
            />
            {/* Using a custom active shape or standard styling */}
            <Bar 
              dataKey="clicks" 
              fill="url(#colorClicks)" 
              radius={[4, 4, 0, 0]} 
              className="transition-all duration-300 hover:brightness-110"
              maxBarSize={48}
            />
            <defs>
              <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34d399" stopOpacity={1} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0.7} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
