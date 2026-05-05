import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import ClicksBarChart from "../components/dashboard/ClicksBarChart";
import MonthlyQuotaChart from "../components/dashboard/MonthlyQuotaChart";
import DynamicButton from "../components/ui/DynamicButton";
import LinkActionMenu from "../components/ui/LinkActionMenu";
import CreateLinkModal from "../components/ui/CreateLinkModal";
import DashboardSkeleton from "../components/skeletons/DashboardSkeleton";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

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

  if (pageLoading) {
    return (
      <>
        <Helmet>
          <title>Dashboard | STTN</title>
        </Helmet>
        <DashboardSkeleton />
      </>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in-up duration-500 max-w-7xl mx-auto relative z-10">
      <Helmet>
        <title>Dashboard | STTN</title>
      </Helmet>

      {/* --- Create Link Modal --- */}
      <CreateLinkModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* --- Ambient Overlay Background --- */}
      <div 
        className="absolute -top-6 -left-6 lg:-top-12 lg:-left-12 right-0 h-[400px] bg-cover bg-center bg-no-repeat opacity-[0.05] pointer-events-none mix-blend-screen z-[-1] rounded-3xl overflow-hidden"
        style={{ backgroundImage: 'url("/login-overlay.png")' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A0B0E]"></div>
      </div>

      {/* --- Header --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white">Overview</h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage your links and view performance analytics.
          </p>
        </div>
        <DynamicButton
          label="Create New Link"
          className="w-full sm:w-48 h-11! rounded-lg"
          onClick={() => setIsModalOpen(true)}
        />
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
        <ClicksBarChart data={clickData} />
        <MonthlyQuotaChart used={840} total={1000} planName="Pro Plan" />
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

        <div className="overflow-hidden">
          <table className="w-full text-left text-sm block sm:table">
            <thead className="hidden sm:table-header-group">
              <tr className="bg-gray-900/30 border-b border-gray-800/60 block sm:table-row">
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
            <tbody className="block sm:table-row-group divide-y divide-gray-800/60">
              {mockLinks.map((link) => (
                <tr
                  key={link.id}
                  className="hover:bg-gray-800/20 transition-colors group block sm:table-row relative p-4 sm:static sm:p-0"
                >
                  <td className="block sm:table-cell py-1 sm:py-4 px-2 sm:px-6">
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
                  </td>
                  <td className="block sm:table-cell py-1 sm:py-4 px-2 sm:px-6">
                    <p
                      className="text-gray-400 truncate max-w-[280px]"
                      title={link.originalUrl}
                    >
                      {link.originalUrl}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1"><i className="ri-calendar-line sm:hidden"></i> {link.date}</p>
                  </td>
                  {/* Mobile Only: Clicks and Status */}
                  <td className="flex items-center justify-between sm:hidden py-3 px-2 mt-1">
                    <div className="flex items-center gap-2">
                      <i className="ri-bar-chart-2-line text-gray-500"></i>
                      <span className="text-white font-medium">
                        {link.clicks.toLocaleString()}
                      </span>
                      <span className="text-gray-500 text-[11px] font-medium uppercase tracking-wider ml-1">Clicks</span>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${
                        link.status === "Active"
                          ? "bg-green-500/10 text-green-400 border border-green-500/20"
                          : "bg-gray-800/50 text-gray-400 border border-gray-700/50"
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${link.status === "Active" ? "bg-green-400" : "bg-gray-500"}`}
                      />
                      {link.status}
                    </span>
                  </td>

                  {/* Desktop Only: Clicks */}
                  <td className="hidden sm:table-cell py-4 px-6">
                    <span className="text-white font-medium">
                      {link.clicks.toLocaleString()}
                    </span>
                  </td>

                  {/* Desktop Only: Status */}
                  <td className="hidden sm:table-cell py-4 px-6">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${
                        link.status === "Active"
                          ? "bg-green-500/10 text-green-400 border border-green-500/20"
                          : "bg-gray-800/50 text-gray-400 border border-gray-700/50"
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${link.status === "Active" ? "bg-green-400" : "bg-gray-500"}`}
                      />
                      {link.status}
                    </span>
                  </td>
                  <td className="block sm:table-cell py-3 sm:py-4 px-2 sm:px-6 text-right mt-3 sm:mt-0 border-t border-gray-800/60 sm:border-none">
                    <LinkActionMenu />
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
