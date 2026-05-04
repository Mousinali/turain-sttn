import React, { useState } from "react";
import { Link } from "react-router-dom";
import DynamicButton from "../ui/DynamicButton";

// Advance UX refined SaaS Hero section with specific viewport sizing and spacing hierarchy.
export default function HeroSection() {
  const [url, setUrl] = useState("");

  const handleShorten = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    // Redirect to login or dashboard with the intent, as per original logic.
    window.location.href = `/login?intent=${encodeURIComponent(url)}`;
  };

  return (
    <section id="home" className="relative pt-40 md:pt-40 overflow-hidden bg-[#0A0B0E]">
      {/* Refined and subtle ambient glows for advanced UX feeling */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-600/5 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="absolute top-[-150px] right-0 w-[500px] h-[500px] bg-emerald-400/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
      
      {/* Overall content container - Increased max width for more expansive layout */}
      <div className="max-w-7xl mx-auto px-8 relative z-10 text-center">

        {/* Refactored Headline - Extra bold, specific line height and massive desktop size */}
        <div className="max-w-[1000px] mx-auto mb-8">
          <h1 className="text-6xl md:text-6xl font-semibold leading-[1.05] text-white">
            Take Control of<br />
            Your <span className="text-emerald-400">Digital Links</span>
          </h1>
        </div>

        {/* Refined Subheadline - Increased max width, slightly larger size, better spacing */}
        <div className="max-w-2xl mx-auto mb-12">
          <p className="text-lg text-gray-400 font-medium leading-relaxed">
            The ultimate platform for modern businesses to shorten links, track analytics, and optimize their digital presence. Fast, secure, and incredibly powerful.
          </p>
        </div>

        {/* Functional URL Shortener Form - Refined styling and spacing */}
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleShorten} className="relative flex items-center p-3 rounded-full bg-[#111216] border border-gray-800 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]">
            <div className="flex-1 flex items-center px-7 gap-3">
              <i className="ri-link text-2xl text-gray-600"></i>
              <input
                type="url"
                required
                placeholder="Enter your long URL here (e.g. https://your-domain.com)"
                className="w-full bg-transparent border-none text-white placeholder:text-gray-500! focus:outline-none focus:ring-0 text-lg py-4"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <div className="hidden sm:block">
              <DynamicButton
                type="submit"
                label="Shorten Now"
                className="w-48! h-14! rounded-full text-lg!"
              />
            </div>
          </form>
          {/* Mobile Button - Refined styling */}
          <div className="sm:hidden mt-6">
            <DynamicButton
              label="Shorten Now"
              onClick={handleShorten}
              className="w-full h-14! rounded-full text-lg!"
            />
          </div>
        </div>

        {/* Refined Dashboard Mockup Section - Crucially, expanded sizing for expansive feel */}
        <div className="mt-12 md:mt-20 relative max-w-[1200px] mx-auto  rounded-t-[24px] bg-[#0A0B0E] border border-gray-800/80 shadow-[0_40px_100px_-20px_rgba(16,185,129,0.25)] ring-1 ring-white/10 group overflow-hidden">
          
          {/* browser window controls for added mockup feeling */}
          {/* <div className="absolute top-7 left-6 flex gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
          </div> */}

          {/* refined inner framed glow from the asset file */}
          <div className="absolute inset-0 bg-emerald-500/5 rounded-[32px] blur-[80px] pointer-events-none transition-opacity duration-300 group-hover:opacity-80"></div>
          
          <img 
            src="/landing.png" // Confirmed file from image_1.png asset
            alt="Your Refined Turain Dashboard"
            className="w-full h-auto opacity-90 object-covertransition-transform duration-500"
          />
        </div>
      </div>
    </section>
  );
}