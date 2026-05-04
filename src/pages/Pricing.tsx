import React from "react";
import { Helmet } from "react-helmet-async";
import PricingSection from "../components/landing/PricingSection";

export default function Pricing() {
  return (
    <>
      <Helmet>
        <title>Pricing | Turain URL Shortener</title>
        <meta name="description" content="Simple, transparent pricing for Turain. Choose from Free, Pro, or Enterprise plans to scale your link management." />
        <meta property="og:title" content="Turain Pricing" />
      </Helmet>
      <div className="pt-24 min-h-[80vh]">
        <PricingSection />
      </div>
    </>
  );
}
