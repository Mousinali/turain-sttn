import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface MonthlyQuotaChartProps {
  used: number;
  total: number;
  planName?: string;
  daysRemaining?: number;
}

export default function AdvancedQuotaChart({ 
  used, 
  total, 
  planName = "Pro Plan",
  daysRemaining = 12 
}: MonthlyQuotaChartProps) {
  const [isHovered, setIsHovered] = useState(false);
  const percentage = Math.round((used / total) * 100);
  
  const theme = useMemo(() => {
    // Critical stays Rose for safety, but Warning and Healthy now use the Screenshot Green
    if (percentage >= 90) return {
      name: 'critical',
      colors: { start: '#f43f5e', end: '#fb7185', bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/20', glow: 'bg-rose-500/20' },
      icon: <i className="ri-error-warning-line text-rose-400 text-[16px]"></i>
    };

    // Changed from Yellow/Amber to the Emerald Green from the screenshot
    return {
      name: 'healthy',
      colors: { 
        start: '#34d399', // Emerald 400
        end: '#10b981',   // Emerald 500
        bg: 'bg-emerald-500/10', 
        text: 'text-emerald-400', 
        border: 'border-emerald-500/20', 
        glow: 'bg-emerald-500/20' 
      },
      icon: <i className="ri-flashlight-line text-emerald-400 text-[16px]"></i>
    };
  }, [percentage]);

  const quotaData = [
    { name: "Used", value: used },
    { name: "Remaining", value: total - used },
  ];

  return (
    <div 
      className="relative flex flex-col w-full max-w-sm p-6 overflow-hidden transition-all duration-500 bg-[#111216] rounded-2xl ring-1 ring-white/10 shadow-2xl group hover:ring-white/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Glow */}
      <div className={`absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[80px] pointer-events-none transition-all duration-700 ease-out ${theme.colors.glow} ${isHovered ? 'opacity-60 scale-110' : 'opacity-20'}`} />

      {/* Header Section */}
      <div className="relative z-10 flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold tracking-wide text-gray-100">
              Monthly Quota
            </h3>
          </div>
        </div>

        {/* Plan Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md shadow-sm">
          {theme.icon}
          <span className="text-xs font-semibold tracking-wide text-transparent bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text">
            {planName}
          </span>
        </div>
      </div>

      {/* Chart Section */}
      <div className="relative z-10 w-full h-44">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <defs>
              <linearGradient id="dynamicGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={theme.colors.start} />
                <stop offset="100%" stopColor={theme.colors.end} />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <Pie
              data={quotaData}
              cx="50%"
              cy="100%"
              startAngle={180}
              endAngle={0}
              innerRadius={78}
              outerRadius={92}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
              cornerRadius={12}
            >
              {quotaData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={index === 0 ? "url(#dynamicGradient)" : "#1F222A"} 
                  filter={index === 0 && isHovered ? "url(#glow)" : ""}
                  className="transition-all duration-500 ease-out outline-none"
                  style={{
                    transformOrigin: 'center bottom',
                    transform: index === 0 && isHovered ? 'scale(1.02)' : 'scale(1)',
                  }}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Inner Chart Content */}
        <div className="absolute flex flex-col items-center w-full transform -translate-x-1/2 bottom-2 left-1/2">
          <div className="flex items-start gap-1">
            <span className="text-5xl font-bold tracking-tighter text-white font-mono drop-shadow-lg">
              {percentage}
            </span>
            <span className={`text-xl font-semibold mt-1 ${theme.colors.text}`}>
              %
            </span>
          </div>
        </div>
      </div>

      {/* Footer / Stats Bar */}
      <div className="relative z-10 flex items-center justify-between p-3 mt-4 transition-colors duration-300 rounded-xl bg-white/[0.02] border border-white/[0.05] group-hover:bg-white/[0.04]">
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider mb-0.5">Usage</span>
          <div className="text-sm">
            <span className="font-medium text-gray-200">{used.toLocaleString()}</span>
            <span className="text-gray-500"> / {total.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="w-px h-8 bg-white/[0.08]" />
        
        <div className="flex flex-col items-end">
          <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider mb-0.5">Resets In</span>
          <span className="text-sm font-medium text-gray-300">{daysRemaining} days</span>
        </div>
      </div>
    </div>
  );
}