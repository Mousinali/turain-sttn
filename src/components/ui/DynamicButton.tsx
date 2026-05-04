import React from 'react';

interface DynamicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  isLoading?: boolean;
}

export default function DynamicButton({
  label = "Continue",
  isLoading = false,
  className = "",
  disabled,
  ...props 
}: DynamicButtonProps) {
  
  const isDisabled = disabled || isLoading;

  return (
    <div className={`relative`}>
      <button
        disabled={isDisabled}
        className={`group relative flex h-[56px] ${className} w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-none outline-none transition-all duration-300 active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.3)] ${
          isDisabled ? "opacity-50 cursor-not-allowed active:scale-100 " : ""
        }`}
        style={{
          background: `radial-gradient(65.28% 65.28% at 50% 100%, rgba(52, 211, 153, 0.8) 0%, rgba(52, 211, 153, 0) 100%), #059669`
        }}
        {...props} 
      >
        {/* Floating Points Animation */}
        {!isDisabled && (
          <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
            {[10, 30, 25, 44, 50, 75, 88, 58, 98, 65].map((left, i) => (
              <i
                key={i}
                className="animate-floating-points absolute bottom-[-10px] h-[2px] w-[2px] rounded-full bg-white"
                style={{
                  left: `${left}%`,
                  opacity: [1, 0.7, 0.8, 0.6, 1, 0.5, 0.9, 0.8, 0.6, 1][i],
                  animationDuration: `${[2.35, 2.5, 2.2, 2.05, 1.9, 1.5, 2.2, 2.25, 2.6, 2.5][i]}s`,
                  animationDelay: `${[0.2, 0.5, 0.1, 0, 0, 1.5, 0.2, 0.2, 0.1, 0.2][i]}s`
                }}
              />
            ))}
          </div>
        )}

        {/* Glossy Overlay Effects */}
        <div className="absolute inset-[1px] z-0 rounded-[calc(1rem-1px)] bg-gradient-to-b from-white/20 to-transparent transition-opacity duration-500 group-hover:opacity-40" />

        {/* Button Label & Icon */}
        <span className="relative z-20 flex items-center justify-center gap-[8px] text-base font-bold leading-normal text-white transition-colors duration-200">
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
            {label}
              </>
          )}
        </span>
      </button>

      {/* Global styles for this component's animations */}
      <style>{`
        @keyframes floating-points {
          0% { transform: translateY(0); }
          85% { opacity: 0; }
          100% { transform: translateY(-55px); opacity: 0; }
        }
        .animate-floating-points {
          animation: floating-points infinite ease-in-out;
        }
        @keyframes dasharray {
          from { stroke-dasharray: 0 100; }
          to { stroke-dasharray: 68 0; }
        }
        .group:hover .animate-dash {
          animation: dasharray 1s linear forwards;
          fill: white;
        }
      `}</style>
    </div>
  );
}