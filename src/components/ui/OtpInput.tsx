import React, { useRef, useEffect } from 'react';
import toast from 'react-hot-toast';

interface OtpInputProps {
  otp: string[];
  setOtp: (otp: string[]) => void;
}

export default function OtpInput({ otp, setOtp }: OtpInputProps) {
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // 1. Reset Monitor: When the OTP is cleared externally (e.g., on error), focus the first box
  useEffect(() => {
    const isAllEmpty = otp.every(digit => digit === "");
    if (isAllEmpty) {
      otpRefs.current[0]?.focus();
    }
  }, [otp]); // Fires whenever the otp array changes

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    // Only allow numbers
    if (value !== "" && !/^\d*$/.test(value)) {
      toast.error("Only numbers are allowed", {
        style: {
          background: '#111216',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.1)',
        },
        iconTheme: {
          primary: '#ef4444',
          secondary: '#fff',
        },
      });
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex justify-between gap-4">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => { otpRefs.current[index] = el; }}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          value={digit}
          onChange={(e) => handleOtpChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className={`
            w-full h-20 text-center text-3xl font-bold 
            bg-white/[0.03] border rounded-2xl text-white outline-none 
            transition-all duration-300
            ${
              digit
                ? "border-green-500/40 bg-green-500/[0.05] shadow-[0_0_25px_rgba(34,197,94,0.15)]"
                : "border-white/10 hover:border-white/20 focus:border-white/30"
            }
            focus:ring-8 focus:ring-green-500/5 focus:-translate-y-1.5
          `}
        />
      ))}
    </div>
  );
}