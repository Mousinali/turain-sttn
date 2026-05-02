import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, Link, useNavigate, useLocation } from 'react-router-dom';

const sidebarLinks = [
  { name: 'Dashboard', path: '/dashboard', icon: 'ri-dashboard-line' },
  { name: 'Links', path: '/links', icon: 'ri-link' },
  { name: 'Analysis', path: '/analysis', icon: 'ri-bar-chart-box-line' },
  { name: 'Settings', path: '/settings', icon: 'ri-settings-3-line' },
];

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close sidebar automatically when route changes (on mobile)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="h-screen bg-[#0A0B0E] text-white flex overflow-hidden selection:bg-green-500/30">
      
      {/* --- MOBILE OVERLAY --- */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* --- SIDEBAR --- */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-[#111216] border-r border-white/5 flex flex-col transition-transform duration-300 ease-out
        lg:translate-x-0 lg:static lg:inset-auto
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Sidebar Header */}
        <div className="h-20 flex items-center justify-between px-8 border-b border-white/5 shrink-0">
          <Link to="/" className="flex items-center gap-3 transition-transform duration-300 hover:scale-105">
            <img src="/sttn-logo.svg" alt="Logo" className="h-6" />
          </Link>
          <button 
            className="lg:hidden p-2 text-gray-500 hover:text-white transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-1.5 custom-scrollbar">
          
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.path === '/dashboard'}
              className={({ isActive }) =>
                `group relative flex items-center w-full rounded-xl transition-all duration-300 overflow-hidden ${
                  isActive
                    ? 'bg-gradient-to-r from-green-500/10 to-transparent text-green-400'
                    : 'text-gray-400 hover:text-white hover:bg-white/[0.02]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Subtle Animated Left Border */}
                  <div 
                    className={`absolute left-0 w-1 rounded-r-md transition-all duration-300 ease-out ${
                      isActive 
                        ? 'h-full bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.6)]' 
                        : 'h-0 bg-white/20 group-hover:h-1/2'
                    }`} 
                  />
                  
                  {/* Content with Magnetic Shift Hover */}
                  <div className="flex items-center gap-3 px-4 py-3 w-full transition-transform duration-300 ease-out group-hover:translate-x-1.5">
                    <i className={`${link.icon} text-xl transition-colors duration-300 ${isActive ? 'text-green-400' : 'text-gray-500 group-hover:text-gray-300'}`}></i>
                    <span className="text-sm font-medium">{link.name}</span>
                  </div>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Premium User Profile Section at Bottom */}
        <div className="p-4 border-t border-white/5 bg-gradient-to-t from-black/20 to-transparent shrink-0">
          <div className="group/profile flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.04] transition-colors duration-300 cursor-pointer border border-transparent hover:border-white/5">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center font-bold border border-green-500/20 shrink-0">
                JD
              </div>
              <div className="flex flex-col truncate">
                <span className="text-sm font-medium text-gray-200 group-hover/profile:text-white transition-colors truncate">John Doe</span>
                <span className="text-xs text-gray-500 font-medium tracking-wide">Pro Developer</span>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              title="Logout"
              className="text-gray-500 hover:text-red-400  group-hover/profile:opacity-100 transition-all duration-300 hover:scale-110 p-1"
            >
              <i className="ri-logout-circle-r-line text-lg"></i>
            </button>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        
        {/* --- MOBILE TOP HEADER --- */}
        <header className="lg:hidden h-16 flex items-center justify-between px-6 bg-[#111216]/80 backdrop-blur-xl border-b border-white/5 shrink-0 z-30">
          <Link to="/">
            <img src="/sttn-logo.svg" alt="Logo" className="h-6" />
          </Link>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-white active:scale-95 transition-all"
          >
            <i className="ri-menu-4-fill text-2xl"></i>
          </button>
        </header>

        {/* Content Body */}
        <main className="flex-1 relative overflow-y-auto overflow-x-hidden">
          {/* Ambient Background Glows */}
          <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-green-900/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2 z-0" />
          <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-emerald-900/10 rounded-full mix-blend-screen filter blur-[150px] pointer-events-none translate-y-1/4 -translate-x-1/4 z-0"></div>
          
          <div className="p-6 md:p-10 lg:p-12 relative z-10 min-h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}