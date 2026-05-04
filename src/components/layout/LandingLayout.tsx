import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import LandingNavbar from "../landing/LandingNavbar";
import FooterSection from "../landing/FooterSection";

export default function LandingLayout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center gap-6">
        {/* Ambient glow */}
        <div className="absolute w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Logo with pulse */}
        <div className="relative z-10 flex flex-col items-center gap-5">
          <img
            src="/sttn-logo.svg"
            alt="STTN"
            className="h-10 animate-pulse"
          />

          {/* Loading bar */}
          <div className="w-48 h-[2px] bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-transparent via-[#53D35F] to-transparent rounded-full"
              style={{
                animation: "skeleton-shimmer 1.2s ease-in-out infinite",
              }}
            />
          </div>

          <p className="text-gray-500 text-xs font-medium tracking-widest uppercase">
            Loading
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] bg-grid-pattern text-white selection:bg-sttn/30 font-sans scroll-smooth flex flex-col">
      <LandingNavbar />
      <main className="flex-1 animate-fade-in-up">
        <Outlet />
      </main>
      <FooterSection />
    </div>
  );
}
