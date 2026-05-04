import React from "react";
import { Helmet } from "react-helmet-async";
import FeaturesSection from "../components/landing/FeaturesSection";

export default function Features() {
  return (
    <>
      <Helmet>
        <title>Features | Turain URL Shortener</title>
        <meta name="description" content="Explore Turain's powerful features including advanced analytics, custom branding, dynamic QR codes, and team collaboration tools." />
        <meta property="og:title" content="Turain Features" />
        <meta property="og:description" content="Everything you need to manage and optimize your links." />
      </Helmet>
      {/* Add top padding so it doesn't collide with the fixed navbar */}
      <div className="pt-24 min-h-[80vh]">
        <FeaturesSection />
      </div>
    </>
  );
}
