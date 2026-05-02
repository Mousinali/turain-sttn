import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import toast, { Toaster } from "react-hot-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import DynamicButton from "../components/ui/DynamicButton";

// --- Mock Data ---
const clickData = [
  { name: "Mon", clicks: 420 },
  { name: "Tue", clicks: 680 },
  { name: "Wed", clicks: 850 },
  { name: "Thu", clicks: 590 },
  { name: "Fri", clicks: 920 },
  { name: "Sat", clicks: 410 },
  { name: "Sun", clicks: 300 },
];

const quotaData = [
  { name: "Used", value: 840, color: "#22c55e" }, // Green 500
  { name: "Remaining", value: 160, color: "#1f2937" }, // Gray 800
];

const mockLinks = [
  {
    id: 1,
    originalUrl: "https://github.com/google/gemini/releases/tag/v1.0.0",
    shortUrl: "sttn.ly/gemini",
    clicks: 1245,
    status: "Active",
    date: "May 01, 2026",
    tags: ["Dev", "AI"],
  },
  {
    id: 2,
    originalUrl: "https://react.dev/reference/react/hooks",
    shortUrl: "sttn.ly/react",
    clicks: 890,
    status: "Active",
    date: "Apr 28, 2026",
    tags: ["Framework"],
  },
  {
    id: 3,
    originalUrl: "https://tailwindcss.com/docs/flex-basis",
    shortUrl: "sttn.ly/tw",
    clicks: 432,
    status: "Paused",
    date: "Apr 25, 2026",
    tags: ["Design"],
  },
];

export default function Dashboard() {
  const [url, setUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Link copied to clipboard", {
      style: {
        background: "#1f2937",
        color: "#fff",
        border: "1px solid #374151",
      },
      iconTheme: { primary: "#22c55e", secondary: "#fff" },
    });
  };

  const handleShorten = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    toast.loading("Generating link...", { id: "create-link" });

    setTimeout(() => {
      toast.success("Link created successfully", { id: "create-link" });
      setUrl("");
      setCustomAlias("");
      setIsLoading(false);
    }, 1000);
  };

  // Custom tooltip for the Bar Chart to match dark mode
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 border border-gray-800 p-3 rounded-lg shadow-xl">
          <p className="text-gray-400 text-sm mb-1">{label}</p>
          <p className="text-green-400 font-semibold">
            {payload[0].value} clicks
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Toaster position="top-right" />

      {/* --- Header --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white">Overview</h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage your links and view performance analytics.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right mr-2 hidden sm:block">
            <p className="text-xs text-gray-500 font-medium">
              Current Workspace
            </p>
            <p className="text-sm font-medium text-white flex items-center justify-end gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span> Pro
              Team
            </p>
          </div>
        </div>
      </div>

      {/* --- Top Stats Row --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#111216] border border-gray-800/60 rounded-xl p-5 shadow-sm">
          <p className="text-gray-400 text-sm font-medium">Total Clicks</p>
          <div className="mt-2 flex items-baseline gap-2">
            <p className="text-3xl font-semibold text-white">42,892</p>
            <span className="text-sm font-medium text-green-400 bg-green-400/10 px-2 py-0.5 rounded-md">
              +12.5%
            </span>
          </div>
        </div>
        <div className="bg-[#111216] border border-gray-800/60 rounded-xl p-5 shadow-sm">
          <p className="text-gray-400 text-sm font-medium">Active Links</p>
          <div className="mt-2 flex items-baseline gap-2">
            <p className="text-3xl font-semibold text-white">128</p>
            <span className="text-sm font-medium text-gray-500">
              of 840 total
            </span>
          </div>
        </div>
        <div className="bg-[#111216] border border-gray-800/60 rounded-xl p-5 shadow-sm">
          <p className="text-gray-400 text-sm font-medium">Avg. Click Rate</p>
          <div className="mt-2 flex items-baseline gap-2">
            <p className="text-3xl font-semibold text-white">24.8%</p>
            <span className="text-sm font-medium text-green-400 bg-green-400/10 px-2 py-0.5 rounded-md">
              +2.1%
            </span>
          </div>
        </div>
      </div>

      {/* --- Charts Row --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Bar Chart (7 Days) */}
        <div className="lg:col-span-2 bg-[#111216] border border-gray-800/60 rounded-xl p-6 shadow-sm">
          <div className="mb-6">
            <h3 className="text-white font-medium">Clicks over time</h3>
            <p className="text-sm text-gray-400">Last 7 days performance</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={clickData}
                margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#374151"
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
                  cursor={{ fill: "#1f2937" }}
                  content={<CustomTooltip />}
                />
                {/* Different shades of green using an array of colors or a gradient. Here we use a solid premium green */}
                <Bar dataKey="clicks" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Half Circle Quota Chart */}
        <div className="bg-[#111216] border border-gray-800/60 rounded-xl p-6 shadow-sm flex flex-col items-center relative">
          <div className="w-full mb-2 text-left">
            <h3 className="text-white font-medium">Monthly Quota</h3>
            <p className="text-sm text-gray-400">Link creation limit</p>
          </div>

          <div className="h-48 w-full relative mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={quotaData}
                  cx="50%"
                  cy="100%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {quotaData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text inside the donut */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center w-full">
              <p className="text-3xl font-semibold text-white">84%</p>
              <p className="text-sm text-gray-500 font-medium">
                840 / 1000 links
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Create Link Tool --- */}
      <div className="bg-[#111216] border border-gray-800/60 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-medium text-white mb-1">
          Create short link
        </h2>
        <p className="text-sm text-gray-400 mb-5">
          Paste a long URL to generate a trackable short link.
        </p>

        <form onSubmit={handleShorten} className="space-y-4 max-w-4xl">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <div className="absolute top-1/2 -translate-y-1/2 left-3 flex items-center text-gray-400">
                <i className="ri-link"></i>
              </div>
              <input
                type="url"
                placeholder="https://example.com/very-long-url-path"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#0a0b0e] border border-gray-800 rounded-lg text-white text-sm outline-none focus:border-green-500 focus:ring-0.5 focus:ring-green-500 transition-all placeholder:text-gray-500!"
                required
              />
            </div>

            <DynamicButton
              label="Shorten"
              className="w-full sm:w-32 h-11! rounded-lg"
              type="submit"
              isLoading={isLoading}
            />
          </div>
        </form>
      </div>

      {/* --- Data Table --- */}
      <div className="bg-[#111216] border border-gray-800/60 rounded-xl overflow-hidden shadow-sm">
        <div className="px-6 py-5 border-b border-gray-800/60 flex items-center justify-between">
          <h2 className="text-white font-medium">Recent Links</h2>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-md text-sm text-gray-400 hover:text-white transition-colors">
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-gray-900/30 border-b border-gray-800/60">
                <th className="py-3 px-6 font-medium text-gray-400 w-1/3">
                  Short Link
                </th>
                <th className="py-3 px-6 font-medium text-gray-400 w-1/3">
                  Original URL
                </th>
                <th className="py-3 px-6 font-medium text-gray-400">Clicks</th>
                <th className="py-3 px-6 font-medium text-gray-400">Status</th>
                <th className="py-3 px-6 font-medium text-gray-400 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {mockLinks.map((link) => (
                <tr
                  key={link.id}
                  className="hover:bg-gray-800/20 transition-colors group"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white">
                        {link.shortUrl}
                      </span>
                      <button
                        onClick={() => copyToClipboard(link.shortUrl)}
                        className="text-gray-500 hover:text-white transition-colors p-1 rounded"
                        title="Copy link"
                      >
                        <i className="ri-file-copy-line"></i>
                      </button>
                    </div>
                    <div className="flex gap-1.5 mt-1.5">
                      {link.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-gray-500 bg-gray-900 border border-gray-800 px-1.5 py-0.5 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p
                      className="text-gray-400 truncate max-w-[250px]"
                      title={link.originalUrl}
                    >
                      {link.originalUrl}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{link.date}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-white font-medium">
                      {link.clicks.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium ${
                        link.status === "Active"
                          ? "bg-green-500/10 text-green-400"
                          : "bg-gray-800 text-gray-400"
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${link.status === "Active" ? "bg-green-400" : "bg-gray-500"}`}
                      />
                      {link.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="p-1.5 text-gray-400 hover:text-white transition-colors"
                        title="QR Code"
                      >
                        <i className="ri-qr-code-line"></i>
                      </button>
                      <button
                        className="p-1.5 text-gray-400 hover:text-white transition-colors"
                        title="Edit"
                      >
                        <i className="ri-edit-line"></i>
                      </button>
                      <button
                        className="p-1.5 text-gray-400 hover:text-red-400 transition-colors"
                        title="Delete"
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
