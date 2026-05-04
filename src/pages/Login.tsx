import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

import DynamicButton from "../components/ui/DynamicButton";
import OtpInput from "../components/ui/OtpInput";

export default function Login() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(59);
  const [canResend, setCanResend] = useState(false);

  // Live Timer Effect
  useEffect(() => {
    if (step === "otp" && timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (timeLeft === 0) {
      setCanResend(true);
    }
  }, [timeLeft, step]);

  const handleResend = () => {
    if (!canResend) return;

    // Simulate Resend API
    toast.success("New code sent to your phone!", {
      style: {
        background: "#111216",
        color: "#fff",
        border: "1px solid rgba(34,197,94,0.3)",
      },
      iconTheme: { primary: "#22c55e", secondary: "#fff" },
    });

    setTimeLeft(59);
    setCanResend(false);
    setOtp(["", "", "", ""]);
  };

  const formatTime = (seconds: number) => {
    return `00:${seconds.toString().padStart(2, "0")}`;
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) {
      toast.error("Please enter a valid 10-digit phone number.", {
        style: {
          background: "#111216",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.1)",
        },
        iconTheme: { primary: "#ef4444", secondary: "#fff" },
      });
      return;
    }

    setIsLoading(true);
    // Simulate API Call
    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
      setTimeLeft(59); // Reset timer on successful step transition
    }, 1200);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");

    if (code.length < 4) {
      toast.error("Please enter the full 4-digit code", {
        style: {
          background: "#111216",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.1)",
        },
        iconTheme: { primary: "#ef4444", secondary: "#fff" },
      });
      return;
    }

    if (code !== "1234") {
      toast.error("Invalid Security Code", {
        style: {
          background: "#111216",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.1)",
        },
        iconTheme: { primary: "#ef4444", secondary: "#fff" },
      });
      setOtp(["", "", "", ""]); // Clear inputs automatically
      return;
    }

    toast.success("Identity verified successfully!", {
      style: {
        background: "#111216",
        color: "#fff",
        border: "1px solid rgba(34,197,94,0.3)",
        boxShadow: "0 0 20px rgba(34,197,94,0.1)",
      },
      iconTheme: { primary: "#22c55e", secondary: "#fff" },
      duration: 2000,
    });

    setIsLoading(true);
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Secure Login</title>
      </Helmet>
      <div className="min-h-screen bg-[#0A0B0E] text-white selection:bg-green-500/30 flex overflow-hidden">
        {/* LEFT SIDE - Form */}
        <div className="w-full lg:w-[45%] flex flex-col justify-center px-6 sm:px-12 md:px-20 xl:px-28 relative z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-green-900/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="absolute top-8 left-6 sm:left-12 md:left-20 xl:left-28">
            <Link
              to={"/"}
              className="flex items-center gap-3 group transition-transform hover:scale-105 duration-300"
            >
              <img src="/sttn-logo.svg" alt="Logo" className="h-8" />
            </Link>
          </div>

          <div className="max-w-md w-full mx-auto mt-12 relative z-10">
            <div className="mb-10">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-4 pb-1">
                {step === "phone" ? "Welcome back" : "Verify account"}
              </h1>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-medium">
                {step === "phone"
                  ? "Enter your phone number to securely log in to your workspace."
                  : `We've sent a secure 4-digit code to +91 ${phone.slice(0, 5)} ${phone.slice(5)}`}
              </p>
            </div>

            <div className="relative rounded-[2rem] bg-white/[0.01] border border-white/[0.05] p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] backdrop-blur-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/[0.02] via-transparent to-transparent opacity-50 pointer-events-none" />

              <div className="absolute top-0 left-0 w-full h-[1px] bg-white/[0.05]">
                <div className="absolute top-0 left-0 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-green-400 to-transparent animate-laser shadow-[0_0_15px_rgba(74,222,128,1)]" />
              </div>

              <div className="relative z-10">
                {step === "phone" ? (
                  <form onSubmit={handleSendOtp} className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-gray-400 pb-2 inline-block ml-1">
                        Phone Number
                      </label>
                      <div className="relative flex rounded-2xl border border-white/20 bg-black/40 focus-within:border-green-500/50 focus-within:ring-4 focus-within:ring-green-500/10 transition-all duration-300 backdrop-blur-sm group/input hover:border-white/10">
                        <input
                          type="tel"
                          placeholder="62903 97299"
                          value={phone}
                          onChange={(e) =>
                            setPhone(
                              e.target.value.replace(/\D/g, "").slice(0, 10),
                            )
                          }
                          className="w-full px-5 py-4 bg-transparent text-white placeholder-gray-600 outline-none focus:outline-none tracking-widest font-medium text-lg"
                        />
                      </div>
                    </div>

                    <DynamicButton
                      label="Continue"
                      className="w-full"
                      type="submit"
                      isLoading={isLoading}
                      disabled={phone.length < 10}
                    />
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-10">
                    <div className="space-y-6">
                      <div className="flex justify-between items-center px-1">
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
                            Security Code
                          </label>
                          <p className="text-xs text-gray-500">
                            Sent to +91 ••••• ••{phone.slice(-3)}
                          </p>
                        </div>

                        <button
                          type="button"
                          disabled={!canResend}
                          onClick={handleResend}
                          className={`group flex items-center gap-2.5 px-4 py-2 rounded-full border transition-all duration-300 ${
                            canResend
                              ? "bg-green-500/10 border-green-500/20 text-green-400 hover:bg-green-500/20 hover:border-green-500/40 cursor-pointer"
                              : "bg-white/[0.03] border-white/10 text-gray-500"
                          }`}
                        >
                          {!canResend && (
                            <div className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </div>
                          )}
                          <span className="text-[11px] font-bold tracking-tighter font-mono">
                            {canResend ? "RESEND CODE" : formatTime(timeLeft)}
                          </span>
                        </button>
                      </div>

                      <OtpInput otp={otp} setOtp={setOtp} />
                    </div>

                    <div className="space-y-6">
                      <DynamicButton
                        label="Verify Identity"
                        className="w-full"
                        type="submit"
                        isLoading={isLoading}
                        disabled={otp.join("").length < 4}
                      />

                      <button
                        type="button"
                        onClick={() => {
                          setStep("phone");
                          setOtp(["", "", "", ""]);
                        }}
                        className="group w-full flex items-center justify-center gap-2 text-sm font-semibold text-gray-500 hover:text-white transition-colors duration-300"
                      >
                        <svg
                          className="w-4 h-4 transition-transform group-hover:-translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                        Change phone number
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            <div className="mt-10 text-center text-sm font-medium text-gray-500 flex items-center justify-center gap-4">
              <a
                href="#"
                className="hover:text-white transition-colors hover:underline underline-offset-4 decoration-white/30"
              >
                Terms of Service
              </a>
              <div className="w-1 h-1 rounded-full bg-gray-700" />
              <a
                href="#"
                className="hover:text-white transition-colors hover:underline underline-offset-4 decoration-white/30"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Abstract Dashboard Visual (Hidden on Mobile) */}
        <div className="hidden lg:flex w-[55%] bg-[#07080A] items-center justify-center overflow-hidden border-l border-white/[0.03] relative">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-green-500/20 rounded-full mix-blend-screen filter blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-900/50 rounded-full mix-blend-screen filter blur-[150px]"></div>
          <div className="absolute -bottom-36 w-full -right-72">
            <div className="relative z-10 bg-[#111216]/80 backdrop-blur-xl border border-white/[0.05] rounded-3xl shadow-2xl flex flex-col overflow-hidden">
              <div className="h-14 border-b border-white/[0.05] flex items-center px-6 relative">
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/[0.05]">
                  <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-green-500 to-transparent animate-laser"></div>
                </div>
                <div className="w-3 h-3 rounded-full bg-red-500/20 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
              </div>
              <div className="relative">
                <img
                  src="/dashboard-main.png"
                  alt="login-overlay"
                  className="w-full h-auto opacity-75"
                />
                <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[#111216] via-[#111216]/65 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
