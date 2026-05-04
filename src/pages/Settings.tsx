import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import SettingsSkeleton from "../components/skeletons/SettingsSkeleton";

type TabType = "Profile" | "API" | "Billing";

export default function Settings() {
  const [activeTab, setActiveTab] = useState<TabType>("Profile");
  const [apiKeyVisible, setApiKeyVisible] = useState(false);
  const [apiKey] = useState("sk_live_94a2b8e3c1d5f6g7h8i9j0k");
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    toast.success("API Key copied to clipboard", {
      style: {
        background: "#1f2937",
        color: "#fff",
        border: "1px solid #374151",
      },
    });
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile settings saved", {
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
          <title>Settings</title>
        </Helmet>
        <SettingsSkeleton />
      </>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in-up duration-500 max-w-5xl mx-auto">
      <Helmet>
        <title>Settings</title>
      </Helmet>

      {/* --- Header --- */}
      <div>
        <h1 className="text-2xl font-semibold text-white">Settings</h1>
        <p className="text-gray-400 text-sm mt-1">
          Manage your account preferences, API keys, and billing.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* --- Sidebar Navigation --- */}
        <aside className="w-full md:w-64 shrink-0">
          <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
            {(["Profile", "API", "Billing"] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-green-500/10 text-green-400 border border-green-500/20"
                    : "text-gray-400 hover:text-white hover:bg-[#111216]"
                }`}
              >
                {tab === "Profile" && <i className="ri-user-settings-line text-lg"></i>}
                {tab === "API" && <i className="ri-key-2-line text-lg"></i>}
                {tab === "Billing" && <i className="ri-bank-card-line text-lg"></i>}
                {tab}
              </button>
            ))}
          </nav>
        </aside>

        {/* --- Main Content Area --- */}
        <div className="flex-1 space-y-6">
          {/* Profile Tab */}
          {activeTab === "Profile" && (
            <div className="bg-[#111216] border border-gray-800/60 rounded-xl p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg font-medium text-white mb-6">Profile Settings</h2>
              
              <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-800/60">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-green-500 to-blue-500 p-1">
                  <div className="w-full h-full rounded-full bg-[#111216] flex items-center justify-center text-2xl text-white font-medium border-2 border-[#111216]">
                    SM
                  </div>
                </div>
                <div>
                  <button className="px-4 py-2 bg-gray-900 border border-gray-800 hover:border-gray-700 text-white rounded-lg text-sm font-medium transition-colors mb-2">
                    Change Avatar
                  </button>
                  <p className="text-xs text-gray-500">
                    JPG, GIF or PNG. Max size of 800K.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-5 max-w-2xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">First Name</label>
                    <input
                      type="text"
                      defaultValue="Sk"
                      className="w-full px-4 py-2.5 bg-[#0a0b0e] border border-gray-800 rounded-lg text-white text-sm outline-none focus:border-green-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Last Name</label>
                    <input
                      type="text"
                      defaultValue="Mousinali"
                      className="w-full px-4 py-2.5 bg-[#0a0b0e] border border-gray-800 rounded-lg text-white text-sm outline-none focus:border-green-500 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Email Address</label>
                  <input
                    type="email"
                    defaultValue="skmousin@example.com"
                    className="w-full px-4 py-2.5 bg-[#0a0b0e] border border-gray-800 rounded-lg text-gray-500 text-sm outline-none cursor-not-allowed"
                    disabled
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Your email address cannot be changed directly. Contact support if needed.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Timezone</label>
                  <select className="w-full px-4 py-2.5 bg-[#0a0b0e] border border-gray-800 rounded-lg text-white text-sm outline-none focus:border-green-500 transition-all appearance-none pr-10">
                    <option>Asia/Kolkata (IST)</option>
                    <option>America/New_York (EST)</option>
                    <option>Europe/London (GMT)</option>
                  </select>
                </div>

                <div className="pt-4 flex justify-end">
                  <button type="submit" className="px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* API Tab */}
          {activeTab === "API" && (
            <div className="space-y-6">
              <div className="bg-[#111216] border border-gray-800/60 rounded-xl p-6 sm:p-8 shadow-sm">
                <h2 className="text-lg font-medium text-white mb-2">API Access</h2>
                <p className="text-sm text-gray-400 mb-6">
                  Manage your secret API keys to authenticate requests from your applications.
                </p>

                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-800 rounded-lg bg-[#0a0b0e]">
                    <div className="mb-4 sm:mb-0">
                      <p className="text-sm font-medium text-white flex items-center gap-2">
                        Production Key
                        <span className="text-[10px] bg-green-500/10 text-green-400 px-2 py-0.5 rounded uppercase font-bold tracking-wider border border-green-500/20">Active</span>
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <code className="text-sm text-gray-400 font-mono tracking-wider">
                          {apiKeyVisible ? apiKey : "sk_live_••••••••••••••••••••••••"}
                        </code>
                        <button
                          onClick={() => setApiKeyVisible(!apiKeyVisible)}
                          className="text-gray-500 hover:text-white transition-colors"
                        >
                          <i className={`ri-eye-${apiKeyVisible ? "off-" : ""}line`}></i>
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={copyApiKey} className="px-3 py-1.5 bg-gray-900 border border-gray-800 hover:border-gray-700 text-white rounded-md text-sm transition-colors flex items-center gap-1.5">
                        <i className="ri-file-copy-line"></i> Copy
                      </button>
                      <button className="px-3 py-1.5 bg-gray-900 border border-gray-800 hover:border-red-500/50 hover:text-red-400 text-gray-400 rounded-md text-sm transition-colors">
                        Revoke
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-800/60 flex justify-end">
                  <button className="px-4 py-2 bg-white text-black hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                    <i className="ri-add-line text-lg"></i> Create new secret key
                  </button>
                </div>
              </div>

              <div className="bg-[#111216] border border-gray-800/60 rounded-xl p-6 shadow-sm">
                <h3 className="text-md font-medium text-white mb-2">API Documentation</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Learn how to integrate Turain Shortener into your application using our REST API.
                </p>
                <a href="#" className="text-green-400 hover:text-green-300 text-sm font-medium flex items-center gap-1">
                  View full documentation <i className="ri-arrow-right-line"></i>
                </a>
              </div>
            </div>
          )}

          {/* Billing Tab */}
          {activeTab === "Billing" && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-green-500/10 via-[#111216] to-[#111216] border border-green-500/20 rounded-xl p-6 sm:p-8 shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div>
                    <h2 className="text-lg font-medium text-white flex items-center gap-2">
                      Pro Team Plan <span className="bg-green-500 text-black text-xs font-bold px-2 py-0.5 rounded">CURRENT</span>
                    </h2>
                    <p className="text-sm text-gray-400 mt-1">
                      $49.00 / month. Next billing date is Jun 1, 2026.
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-white text-black hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">
                    Manage Billing
                  </button>
                </div>

                <div className="pt-6 border-t border-gray-800/60">
                  <h3 className="text-sm font-medium text-white mb-4">Usage this billing cycle</h3>
                  
                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-gray-400">Links Created</span>
                        <span className="text-white font-medium">840 <span className="text-gray-500">/ 1,000</span></span>
                      </div>
                      <div className="w-full bg-gray-900 rounded-full h-2 border border-gray-800">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "84%" }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-gray-400">Tracked Clicks</span>
                        <span className="text-white font-medium">42.8k <span className="text-gray-500">/ 100k</span></span>
                      </div>
                      <div className="w-full bg-gray-900 rounded-full h-2 border border-gray-800">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: "42.8%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#111216] border border-gray-800/60 rounded-xl p-6 shadow-sm flex items-start gap-4">
                 <div className="p-3 bg-gray-900 rounded-lg text-gray-400 border border-gray-800 shrink-0">
                    <i className="ri-information-line text-xl"></i>
                 </div>
                 <div>
                    <h3 className="text-white font-medium mb-1">Need more capacity?</h3>
                    <p className="text-sm text-gray-400 mb-3">
                      Upgrade to the Enterprise plan for unlimited links, advanced analytics, and custom SLAs.
                    </p>
                    <button className="text-green-400 hover:text-green-300 text-sm font-medium">
                      Contact Sales
                    </button>
                 </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
