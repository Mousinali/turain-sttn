import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import AnalysisSkeleton from "../components/skeletons/AnalysisSkeleton";

// --- Mock Data ---
const monthlyData = Array.from({ length: 30 }).map((_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  return {
    date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    clicks: Math.floor(Math.random() * 500) + 100 + i * 10,
    unique: Math.floor(Math.random() * 300) + 50 + i * 5,
  };
});

const referrersData = [
  { name: "Twitter", value: 4500 },
  { name: "GitHub", value: 3200 },
  { name: "Google", value: 2800 },
  { name: "LinkedIn", value: 1900 },
  { name: "Direct", value: 1500 },
];

const devicesData = [
  { name: "Desktop", value: 55, color: "#10b981" },
  { name: "Mobile", value: 35, color: "#34d399" },
  { name: "Tablet", value: 10, color: "#a7f3d0" },
];

const locationsData = [
  { country: "United States", code: "US", percentage: 42 },
  { country: "United Kingdom", code: "UK", percentage: 15 },
  { country: "Germany", code: "DE", percentage: 12 },
  { country: "India", code: "IN", percentage: 8 },
  { country: "Canada", code: "CA", percentage: 6 },
];

export default function Analysis() {
  const [timeRange, setTimeRange] = useState("30d");
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Custom tooltips
  const AreaTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 border border-gray-800 p-3 rounded-lg shadow-xl">
          <p className="text-gray-400 text-sm mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm font-medium">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-white">
                {entry.name}: {entry.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  if (pageLoading) {
    return (
      <>
        <Helmet>
          <title>Analysis</title>
        </Helmet>
        <AnalysisSkeleton />
      </>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in-up duration-500 max-w-7xl mx-auto">
      <Helmet>
        <title>Analysis</title>
      </Helmet>

      {/* --- Header --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white">Analytics</h1>
          <p className="text-gray-400 text-sm mt-1">
            Deep dive into your link performance and audience.
          </p>
        </div>
        <div className="flex bg-[#0a0b0e] border border-gray-800 p-1 rounded-lg">
          {["7d", "30d", "90d", "1y"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                timeRange === range
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* --- Key Metrics --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#111216] border border-gray-800/60 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 text-gray-400 mb-2">
            <i className="ri-cursor-line text-lg"></i>
            <h3 className="text-sm font-medium">Total Clicks</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-semibold text-white">84,392</p>
            <span className="text-sm font-medium text-green-400">+12.5%</span>
          </div>
        </div>

        <div className="bg-[#111216] border border-gray-800/60 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 text-gray-400 mb-2">
            <i className="ri-user-line text-lg"></i>
            <h3 className="text-sm font-medium">Unique Visitors</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-semibold text-white">32,105</p>
            <span className="text-sm font-medium text-green-400">+8.2%</span>
          </div>
        </div>

        <div className="bg-[#111216] border border-gray-800/60 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 text-gray-400 mb-2">
            <i className="ri-timer-line text-lg"></i>
            <h3 className="text-sm font-medium">Avg. Engagement</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-semibold text-white">1m 24s</p>
            <span className="text-sm font-medium text-red-400">-2.1%</span>
          </div>
        </div>

        <div className="bg-[#111216] border border-gray-800/60 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-3 text-gray-400 mb-2">
            <i className="ri-global-line text-lg"></i>
            <h3 className="text-sm font-medium">Top Location</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-semibold text-white">US</p>
            <span className="text-sm font-medium text-gray-500">42% of traffic</span>
          </div>
        </div>
      </div>

      {/* --- Main Chart --- */}
      <div className="bg-[#111216] border border-gray-800/60 rounded-xl p-6 shadow-sm">
        <div className="mb-6">
          <h3 className="text-white font-medium">Traffic Overview</h3>
          <p className="text-sm text-gray-400">Total clicks vs unique visitors</p>
        </div>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorUnique" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
              <XAxis
                dataKey="date"
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
              <Tooltip content={<AreaTooltip />} />
              <Area
                type="monotone"
                dataKey="clicks"
                name="Total Clicks"
                stroke="#10b981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorClicks)"
              />
              <Area
                type="monotone"
                dataKey="unique"
                name="Unique Visitors"
                stroke="#3b82f6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorUnique)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* --- Bottom Row --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Referrers */}
        <div className="bg-[#111216] border border-gray-800/60 rounded-xl p-6 shadow-sm">
          <h3 className="text-white font-medium mb-1">Top Referrers</h3>
          <p className="text-sm text-gray-400 mb-6">Where your traffic comes from</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={referrersData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#374151" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 12 }} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 12 }} width={70} />
                <Tooltip
                  cursor={{ fill: "#1f2937" }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-gray-900 border border-gray-800 p-2 rounded shadow-xl text-sm text-white">
                          {payload[0].payload.name}: <span className="text-green-400">{payload[0].value}</span>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="value" fill="#10b981" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Devices */}
        <div className="bg-[#111216] border border-gray-800/60 rounded-xl p-6 shadow-sm flex flex-col">
          <h3 className="text-white font-medium mb-1">Devices</h3>
          <p className="text-sm text-gray-400 mb-6">Traffic by device type</p>
          <div className="flex-1 flex flex-col justify-center items-center relative">
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={devicesData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {devicesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-gray-900 border border-gray-800 p-2 rounded shadow-xl text-sm text-white">
                            {payload[0].payload.name}: {payload[0].value}%
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Legend inside the box */}
            <div className="flex justify-center gap-4 mt-4 w-full">
              {devicesData.map((device) => (
                <div key={device.name} className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: device.color }}></div>
                  <span className="text-sm text-gray-400">{device.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Locations List */}
        <div className="bg-[#111216] border border-gray-800/60 rounded-xl p-6 shadow-sm">
          <h3 className="text-white font-medium mb-1">Locations</h3>
          <p className="text-sm text-gray-400 mb-6">Traffic by country</p>
          
          <div className="space-y-4">
            {locationsData.map((loc) => (
              <div key={loc.code}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm text-gray-300 flex items-center gap-2">
                    {/* Placeholder for flag */}
                    <span className="text-xs bg-gray-800 px-1.5 py-0.5 rounded text-gray-400 font-mono">{loc.code}</span>
                    {loc.country}
                  </span>
                  <span className="text-sm font-medium text-white">{loc.percentage}%</span>
                </div>
                <div className="w-full bg-gray-800/50 rounded-full h-1.5">
                  <div
                    className="bg-green-500 h-1.5 rounded-full"
                    style={{ width: `${loc.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 text-sm text-gray-400 hover:text-white border border-gray-800 hover:bg-gray-800/50 rounded-lg transition-colors">
            View full report
          </button>
        </div>
      </div>
    </div>
  );
}
