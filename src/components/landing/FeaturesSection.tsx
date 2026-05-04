import React from "react";

const features = [
  {
    icon: "ri-bar-chart-box-line",
    title: "Advanced Analytics",
    description: "Track clicks, geographic data, referrers, and device types in real-time with our intuitive dashboard.",
    color: "sttn"
  },
  {
    icon: "ri-links-line",
    title: "Custom Branded Links",
    description: "Build trust and increase click-through rates by using your own custom domain name for all your short links.",
    color: "sttn"
  },
  {
    icon: "ri-qr-code-line",
    title: "Dynamic QR Codes",
    description: "Instantly generate customizable, trackable QR codes for your links to bridge the gap between offline and online.",
    color: "sttn"
  },
  {
    icon: "ri-shield-check-line",
    title: "Secure & Reliable",
    description: "Enterprise-grade infrastructure ensures 99.99% uptime. HTTPS encryption and active link monitoring included.",
    color: "sttn"
  },
  {
    icon: "ri-team-line",
    title: "Team Collaboration",
    description: "Invite team members, assign roles, and manage links collaboratively within a secure workspace.",
    color: "sttn"
  },
  {
    icon: "ri-code-box-line",
    title: "Developer API",
    description: "Integrate Turain directly into your app or workflow using our robust, well-documented REST API.",
    color: "sttn"
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">Why Choose Turain?</h3>
          <p className="text-gray-400 text-lg">
            Benefits designed to provide a seamless, secure, and accessible experience for all users.
          </p>
        </div>

        {/* 1px border grid container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-800 border border-gray-800">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group p-8 lg:p-12 bg-[#050505] hover:bg-[#0a0a0a] transition-all duration-300 relative"
            >
              {/* Hover Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-900 border border-gray-800 mb-6 group-hover:border-sttn-hover/50 transition-colors">
                  <i className={`${feature.icon} text-xl text-gray-400 group-hover:text-sttn transition-colors`}></i>
                </div>
                <h4 className="text-lg font-semibold text-white mb-3">
                  {feature.title}
                </h4>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
