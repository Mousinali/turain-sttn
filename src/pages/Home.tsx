import React from "react";
import { Helmet } from "react-helmet-async";
import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import PricingSection from "../components/landing/PricingSection";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>STTN | Enterprise URL Shortener & Link Management</title>
        <meta name="description" content="STTN is the ultimate platform for modern businesses to shorten links, track analytics, and optimize their digital presence. Fast, secure, and powerful." />
        <meta name="keywords" content="url shortener, link management, custom domains, link analytics, qr codes" />
        <meta property="og:title" content="STTN | Expand Your Reach" />
        <meta property="og:description" content="Shorten URLs, track clicks, and manage your brand links securely." />
        <meta property="og:type" content="website" />
      </Helmet>
      <HeroSection />

      <FeaturesSection />

      <PricingSection />
    </>
  );
}
