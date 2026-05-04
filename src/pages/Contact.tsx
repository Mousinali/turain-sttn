import React from "react";
import { Helmet } from "react-helmet-async";

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact Us | Turain URL Shortener</title>
        <meta name="description" content="Get in touch with the Turain support and sales team. We're here to help you scale your link management." />
      </Helmet>
      <div className="pt-32 pb-24 min-h-[80vh] max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Contact Us</h1>
          <p className="text-xl text-gray-400">Have questions? We're here to help.</p>
        </div>
        
        <div className="p-8 md:p-12 bg-[#111216] border border-gray-800 rounded-3xl shadow-2xl">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">First Name</label>
                <input type="text" className="w-full bg-[#050505] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#53D35F]" placeholder="John" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Last Name</label>
                <input type="text" className="w-full bg-[#050505] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#53D35F]" placeholder="Doe" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
              <input type="email" className="w-full bg-[#050505] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#53D35F]" placeholder="john@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
              <textarea rows={4} className="w-full bg-[#050505] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#53D35F]" placeholder="How can we help you?"></textarea>
            </div>
            <button type="button" className="w-full py-4 rounded-full bg-[#53D35F] text-black font-bold hover:bg-[#41BF4D] transition-colors shadow-[0_0_20px_rgba(83,211,95,0.2)]">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
