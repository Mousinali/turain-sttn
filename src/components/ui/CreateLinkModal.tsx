import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import DynamicButton from "./DynamicButton";

interface CreateLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateLinkModal({ isOpen, onClose }: CreateLinkModalProps) {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  // Handle Entrance/Exit Animations
  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  // Lock Body Scroll (Preventing Layout Shift)
  useEffect(() => {
    if (!isOpen) return;

    // Calculate scrollbar width to prevent the page from "jumping" to the right
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    const originalOverflow = document.body.style.overflow;
    const originalPadding = document.body.style.paddingRight;

    document.body.style.overflow = "hidden";
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPadding;
    };
  }, [isOpen]);

  const handleShorten = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    toast.loading("Generating link...", { id: "create-link" });

    // Mock API call
    setTimeout(() => {
      toast.success("Link created successfully!", { id: "create-link" });
      setUrl("");
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleBackdropClick}
    >
      {/* Backdrop - "touch-none" prevents background scrolling on iOS */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md touch-none" />

      {/* Modal Container */}
      <div
        className={`relative w-full max-w-xl bg-[#111216] border border-gray-800/80 rounded-2xl shadow-[0_0_80px_rgba(16,185,129,0.08)] overflow-hidden transition-all duration-300 ease-out ${
          visible ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
      >
        {/* Ambient glow */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-green-500/10 rounded-full blur-[80px] pointer-events-none" />

        {/* Header */}
        <div className="relative flex items-center justify-between px-6 py-5 border-b border-gray-800/60">
          <div>
            <h2 className="text-lg font-semibold text-white flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                <i className="ri-link text-green-400" />
              </div>
              Create Short Link
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
            aria-label="Close modal"
          >
            <i className="ri-close-line text-xl" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleShorten} className="relative p-6 pt-4 space-y-5">
          {/* URL Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Destination URL</label>
            <div className="relative">
              <div className="absolute top-1/2 -translate-y-1/2 left-3.5 flex items-center text-gray-500 pointer-events-none">
                <i className="ri-global-line" />
              </div>
              <input
                type="url"
                placeholder="https://example.com/very-long-url-path"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#0a0b0e] border border-gray-800 rounded-xl text-white text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/30 transition-all placeholder:text-gray-600"
                required
                autoFocus
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <DynamicButton
              label="Create Link"
              className="w-full h-12 rounded-xl"
              type="submit"
              isLoading={isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
}