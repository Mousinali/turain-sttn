import React from "react";
import { Helmet } from "react-helmet-async";
import LandingNavbar from "../components/landing/LandingNavbar";
import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import PricingSection from "../components/landing/PricingSection";
import FooterSection from "../components/landing/FooterSection";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#050505] bg-grid-pattern text-white selection:bg-emerald-500/30 font-sans scroll-smooth">
      <Helmet>
        <title>STTN | Enterprise URL Shortener & Link Management</title>
        <meta name="description" content="Turain is the ultimate platform for modern businesses to shorten links, track analytics, and optimize their digital presence. Fast, secure, and powerful." />
        <meta name="keywords" content="url shortener, link management, custom domains, link analytics, qr codes" />
        <meta property="og:title" content="Turain | Expand Your Reach" />
        <meta property="og:description" content="Shorten URLs, track clicks, and manage your brand links securely." />
        <meta property="og:type" content="website" />
      </Helmet>

      <LandingNavbar />
      
      <main>
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
      </main>

      <FooterSection />
    </div>
  );
}