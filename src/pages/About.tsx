import React from "react";
import { Helmet } from "react-helmet-async";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us | Turain URL Shortener</title>
        <meta name="description" content="Learn more about Turain, our mission, and the team behind the ultimate platform for modern link management." />
      </Helmet>
      <div className="pt-32 pb-24 min-h-[80vh] max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">About Turain</h1>
        <p className="text-xl text-gray-400 leading-relaxed mb-12">
          We believe that every link tells a story. Turain was founded with a simple mission: to give modern businesses the ultimate tool to shorten, track, and manage their digital presence.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-[#111216] border border-gray-800 rounded-3xl">
            <h3 className="text-2xl font-bold text-white mb-4">Innovation</h3>
            <p className="text-gray-400">Constantly pushing the boundaries of what a simple link can do.</p>
          </div>
          <div className="p-8 bg-[#111216] border border-gray-800 rounded-3xl">
            <h3 className="text-2xl font-bold text-white mb-4">Security</h3>
            <p className="text-gray-400">Enterprise-grade protection to keep your brand and users safe.</p>
          </div>
          <div className="p-8 bg-[#111216] border border-gray-800 rounded-3xl">
            <h3 className="text-2xl font-bold text-white mb-4">Reliability</h3>
            <p className="text-gray-400">99.99% uptime guarantees so your links never let you down.</p>
          </div>
        </div>
      </div>
    </>
  );
}
