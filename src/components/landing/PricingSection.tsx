import React, { useState } from "react";
import { Link } from "react-router-dom";

const pricingPlans = [
  {
    name: "Free",
    description: "Perfect for individuals and small projects getting started.",
    price: "0",
    features: [
      "Up to 50 short links/month",
      "Basic click analytics",
      "Standard support",
      "Community access",
    ],
    cta: "Start for free",
    highlighted: false,
  },
  {
    name: "Pro",
    description: "Ideal for professionals and growing businesses needing more power.",
    price: "29",
    features: [
      "Up to 10,000 short links/month",
      "Advanced geographic analytics",
      "Custom branded domains",
      "QR Code generation",
      "Priority email support",
    ],
    cta: "Get Pro",
    highlighted: true,
  },
  {
    name: "Enterprise",
    description: "Custom solutions for large scale organizations and teams.",
    price: "99",
    features: [
      "Unlimited short links",
      "Real-time streaming API",
      "SSO & advanced security",
      "Dedicated account manager",
      "24/7 phone & SLA support",
    ],
    cta: "Contact Sales",
    highlighted: false,
  }
];

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="py-24 relative border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sttn font-semibold tracking-wider uppercase text-sm mb-3">Simple Pricing</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">Scale as you grow</h3>
          <p className="text-gray-400 text-lg mb-8">
            Choose the perfect plan for your needs. No hidden fees, cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${!isAnnual ? 'text-white' : 'text-gray-500'}`}>Monthly</span>
            <button 
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-14 h-7 rounded-full bg-gray-800 transition-colors focus:outline-none"
            >
              <div className={`absolute top-1 left-1 w-5 h-5 rounded-full ${isAnnual ? 'bg-sttn translate-x-7' : 'bg-gray-500 translate-x-0'} transition-transform`}></div>
            </button>
            <span className={`text-sm font-medium ${isAnnual ? 'text-white' : 'text-gray-500'}`}>
              Annually <span className="text-green-400 ml-1 text-xs px-2 py-0.5 rounded-full bg-green-500/10">Save 20%</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index}
              className={`relative rounded-3xl p-8 bg-[#050505] border ${plan.highlighted ? 'border-sttn-hover shadow-[0_0_40px_rgba(83,211,95,0.15)]' : 'border-gray-800'} transition-all duration-300 hover:border-gray-700`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full bg-sttn text-black text-xs font-bold uppercase tracking-wider">
                  Most Popular
                </div>
              )}

              <h4 className="text-2xl font-bold text-white mb-2">{plan.name}</h4>
              <p className="text-gray-400 text-sm mb-6 h-10">{plan.description}</p>
              
              <div className="mb-8">
                <span className="text-4xl font-extrabold text-white">
                  ${isAnnual && plan.price !== "0" ? Math.floor(parseInt(plan.price) * 0.8) : plan.price}
                </span>
                <span className="text-gray-500 ml-2">/mo</span>
                {isAnnual && plan.price !== "0" && <p className="text-xs text-sttn mt-1">Billed annually</p>}
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3 text-gray-300">
                    <i className="ri-checkbox-circle-fill text-sttn mt-0.5"></i>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/login"
                className={`block w-full py-3 px-4 rounded-xl text-center font-bold transition-all ${
                  plan.highlighted 
                    ? 'bg-sttn hover:bg-sttn-hover text-black shadow-lg shadow-sttn-hover/25' 
                    : 'bg-gray-800 hover:bg-gray-700 text-white'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
