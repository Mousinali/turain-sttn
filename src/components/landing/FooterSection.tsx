import React from "react";
import { Link } from "react-router-dom";

export default function FooterSection() {
  return (
    <footer id="about" className="bg-[#050505] pt-20 pb-10 border-t border-gray-800/80">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* About Us */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-sttn flex items-center justify-center text-black font-extrabold text-lg shadow-lg shadow-sttn-hover/20">
                T
              </div>
              <span className="text-white text-xl font-bold tracking-tight">Turain</span>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-sm mb-6">
              Turain is the platform for modern businesses to shorten, track, and manage their links. Our mission is to provide an enterprise-grade URL shortener accessible to everyone.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:text-black hover:bg-sttn transition-all">
                <i className="ri-twitter-x-line text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:text-black hover:bg-sttn transition-all">
                <i className="ri-github-fill text-xl"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:text-black hover:bg-sttn transition-all">
                <i className="ri-linkedin-fill text-xl"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-6">Product</h4>
            <ul className="space-y-4">
              <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Integrations</a></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div id="contact" className="col-span-1">
            <h4 className="text-white font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <i className="ri-map-pin-line text-sttn mt-1"></i>
                <span className="text-gray-400">123 SaaS Boulevard,<br/>Tech District, CA 94103</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="ri-mail-line text-sttn"></i>
                <a href="mailto:support@turain.com" className="text-gray-400 hover:text-white transition-colors">support@turain.com</a>
              </li>
              <li className="flex items-center gap-3">
                <i className="ri-phone-line text-sttn"></i>
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-gray-800/80 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Turain Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
