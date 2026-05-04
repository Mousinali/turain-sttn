import React, { useState, useRef, useEffect } from 'react';

export default function LinkActionMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-end sm:static" ref={menuRef}>
      {/* Mobile view: Vertical Kebab Menu Button */}
      <div className="sm:hidden absolute top-4 right-4 z-20">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="p-1.5 text-gray-400 hover:text-white bg-gray-900/50 hover:bg-gray-800 rounded-lg transition-colors border border-transparent hover:border-gray-700/50"
        >
          <i className="ri-more-2-fill text-xl"></i>
        </button>
      </div>

      {/* Action Buttons: Inline on Desktop, Dropdown on Mobile */}
      <div className={`
        sm:flex items-center gap-1.5
        sm:relative sm:top-0 sm:right-0 sm:p-0 sm:bg-transparent sm:border-none sm:shadow-none sm:opacity-60 sm:group-hover:opacity-100 sm:transition-all sm:duration-300
        ${isOpen 
          ? 'absolute top-14 right-4 p-1.5 bg-[#1A1D24] border border-gray-800 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.4)] z-50 flex flex-col min-w-[140px] items-stretch animate-in fade-in zoom-in-95 duration-200' 
          : 'hidden'
        }
      `}>
        <button
          className="flex items-center gap-3 p-2.5 sm:p-2 sm:bg-gray-900/50 sm:hover:bg-gray-800 hover:bg-white/[0.04] rounded-lg text-gray-400 hover:text-white transition-all duration-200 border border-transparent sm:hover:border-gray-700/50 text-left"
          title="View QR Code"
        >
          <i className="ri-qr-code-line text-[17px] sm:text-[15px]"></i>
          <span className="sm:hidden text-sm font-medium">QR Code</span>
        </button>
        <button
          className="flex items-center gap-3 p-2.5 sm:p-2 sm:bg-gray-900/50 sm:hover:bg-gray-800 hover:bg-white/[0.04] rounded-lg text-gray-400 hover:text-white transition-all duration-200 border border-transparent sm:hover:border-gray-700/50 text-left"
          title="Edit Link"
        >
          <i className="ri-edit-line text-[17px] sm:text-[15px]"></i>
          <span className="sm:hidden text-sm font-medium">Edit Link</span>
        </button>
        <button
          className="flex items-center gap-3 p-2.5 sm:p-2 sm:bg-gray-900/50 sm:hover:bg-rose-500/10 hover:bg-rose-500/10 rounded-lg text-gray-400 hover:text-rose-400 transition-all duration-200 border border-transparent sm:hover:border-rose-500/20 text-left"
          title="Delete Link"
        >
          <i className="ri-delete-bin-line text-[17px] sm:text-[15px]"></i>
          <span className="sm:hidden text-sm font-medium">Delete</span>
        </button>
      </div>
    </div>
  );
}
