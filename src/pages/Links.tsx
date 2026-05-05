import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import DynamicButton from "../components/ui/DynamicButton";
import LinkActionMenu from "../components/ui/LinkActionMenu";
import CreateLinkModal from "../components/ui/CreateLinkModal";
import LinksSkeleton from "../components/skeletons/LinksSkeleton";

// --- Mock Data ---
const mockLinks = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  originalUrl: `https://example.com/very-long-url-path-${i + 1}`,
  shortUrl: `sttn.ly/lk${i + 1}a`,
  clicks: Math.floor(Math.random() * 5000),
  status: i % 4 === 0 ? "Paused" : "Active",
  date: `May ${String(Math.floor(Math.random() * 30) + 1).padStart(2, "0")}, 2026`,
  tags: i % 2 === 0 ? ["Campaign", "Social"] : ["Internal"],
}));

export default function Links() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
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

  const filteredLinks = mockLinks.filter((link) => {
    const matchesSearch =
      link.originalUrl.includes(searchTerm) || link.shortUrl.includes(searchTerm);
    const matchesStatus = statusFilter === "All" || link.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (pageLoading) {
    return (
      <>
        <Helmet>
          <title>Links</title>
        </Helmet>
        <LinksSkeleton />
      </>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in-up duration-500 max-w-7xl mx-auto">
      <Helmet>
        <title>Links</title>
      </Helmet>

      {/* --- Create Link Modal --- */}
      <CreateLinkModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* --- Header --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white">All Links</h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage, organize, and track all your shortened URLs.
          </p>
        </div>
        <DynamicButton
          label="Create New Link"
          className="w-full sm:w-48 h-11! rounded-lg"
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      {/* --- Toolbar --- */}
      <div className="bg-[#111216] border border-gray-800/60 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <div className="absolute top-1/2 -translate-y-1/2 left-3 flex items-center text-gray-500">
            <i className="ri-search-line"></i>
          </div>
          <input
            type="text"
            placeholder="Search links or original URLs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#0a0b0e] border border-gray-800 rounded-lg text-white text-sm outline-none focus:border-green-500 transition-all placeholder:text-gray-500"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#0a0b0e] border border-gray-800 text-white text-sm rounded-lg px-4 py-2.5 outline-none focus:border-green-500 transition-all appearance-none pr-10 relative cursor-pointer"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%239CA3AF\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.75rem center',
              backgroundSize: '1rem'
            }}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Paused">Paused</option>
          </select>
          
          <button className="flex items-center gap-2 bg-[#0a0b0e] border border-gray-800 hover:border-gray-700 text-white px-4 py-2.5 rounded-lg text-sm transition-colors">
            <i className="ri-filter-3-line"></i> More Filters
          </button>
        </div>
      </div>

      {/* --- Data Table --- */}
      <div className="bg-[#111216] border border-gray-800/60 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-hidden">
          <table className="w-full text-left text-sm block sm:table">
            <thead className="hidden sm:table-header-group">
              <tr className="bg-gray-900/30 border-b border-gray-800/60 block sm:table-row">
                <th className="py-4 px-6 font-medium text-gray-400 w-1/3">Short Link</th>
                <th className="py-4 px-6 font-medium text-gray-400 w-1/3">Original URL</th>
                <th className="py-4 px-6 font-medium text-gray-400">Clicks</th>
                <th className="py-4 px-6 font-medium text-gray-400">Status</th>
                <th className="py-4 px-6 font-medium text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="block sm:table-row-group divide-y divide-gray-800/60">
              {filteredLinks.length > 0 ? (
                filteredLinks.map((link) => (
                  <tr key={link.id} className="hover:bg-gray-800/20 transition-colors group block sm:table-row relative p-4 sm:static sm:p-0">
                    <td className="block sm:table-cell py-1 sm:py-4 px-2 sm:px-6">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white">{link.shortUrl}</span>
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
                      <p className="text-gray-400 truncate max-w-[280px]" title={link.originalUrl}>
                        {link.originalUrl}
                      </p>
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                         <i className="ri-calendar-line sm:hidden"></i> {link.date}
                      </p>
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
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-900 border border-gray-800 mb-4">
                      <i className="ri-links-line text-xl text-gray-500"></i>
                    </div>
                    <h3 className="text-white font-medium mb-1">No links found</h3>
                    <p className="text-gray-500 text-sm">
                      Try adjusting your search or filters.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* --- Pagination --- */}
        <div className="px-6 py-4 border-t border-gray-800/60 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium text-white">1</span> to <span className="font-medium text-white">{Math.min(10, filteredLinks.length)}</span> of <span className="font-medium text-white">{filteredLinks.length}</span> results
          </p>
          <div className="flex items-center gap-2">
            <button className="p-2 border border-gray-800 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" disabled>
              <i className="ri-arrow-left-s-line"></i>
            </button>
            <button className="p-2 border border-gray-800 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
              <i className="ri-arrow-right-s-line"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
