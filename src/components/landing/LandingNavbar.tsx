import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function LandingNavbar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Smooth progress from 0 to 1 over the first 80px of scroll
      const progress = Math.min(window.scrollY / 80, 1);
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        padding: `${1.5 - scrollProgress * 0.5}rem 0`,
        transition: "padding 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Background layer — fades in smoothly with scroll */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `rgba(5, 5, 5, ${scrollProgress * 0.85})`,
          backdropFilter: `blur(${scrollProgress * 16}px)`,
          WebkitBackdropFilter: `blur(${scrollProgress * 16}px)`,
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      {/* Bottom accent line — subtle green glow that fades in */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: "1px",
          background: `linear-gradient(90deg, transparent, rgba(83, 211, 95, ${scrollProgress * 0.25}), rgba(83, 211, 95, ${scrollProgress * 0.4}), rgba(83, 211, 95, ${scrollProgress * 0.25}), transparent)`,
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      {/* Shadow layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: `0 4px 30px rgba(0, 0, 0, ${scrollProgress * 0.4}), 0 1px 3px rgba(0, 0, 0, ${scrollProgress * 0.3})`,
          transition: "box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/sttn-logo.svg"
            alt="STTN Logo"
            className="h-7 transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="relative px-4 py-2 text-sm font-medium text-gray-400 hover:text-[var(--color-sttn)] transition-all duration-300 rounded-lg hover:bg-white/[0.03]"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/login"
            className="group relative px-5 py-2.5 rounded-full bg-sttn text-black text-sm font-bold hover:bg-sttn-hover transition-all duration-300 shadow-[0_0_20px_rgba(83,211,95,0.2)] hover:shadow-[0_0_30px_rgba(83,211,95,0.4)] flex items-center gap-1.5"
          >
            Get started
            <i className="ri-arrow-right-up-line text-base transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"></i>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-400 hover:text-white p-2 transition-colors duration-200"
          >
            <i className={`ri-${mobileMenuOpen ? 'close' : 'menu-3'}-line text-2xl`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className="md:hidden absolute top-full left-0 right-0 overflow-hidden"
        style={{
          maxHeight: mobileMenuOpen ? "500px" : "0",
          opacity: mobileMenuOpen ? 1 : 0,
          transition: "max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease",
        }}
      >
        <div className="bg-[#050505]/95 backdrop-blur-xl p-4 flex flex-col gap-1">
          {/* Accent line at top of mobile menu */}
          <div
            className="h-px mb-2"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(83, 211, 95, 0.3), transparent)",
            }}
          />
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-xl text-gray-400 hover:text-[var(--color-sttn)] hover:bg-white/[0.03] transition-all duration-200 font-medium text-sm"
            >
              {link.name}
            </Link>
          ))}
          <div
            className="h-px my-2"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.06), transparent)",
            }}
          />
          <Link
            to="/login"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/[0.03] transition-all duration-200 font-medium text-sm"
          >
            Login
          </Link>
          <Link
            to="/login"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-full bg-sttn text-black font-bold mt-2 text-sm shadow-[0_0_20px_rgba(83,211,95,0.2)]"
          >
            Get started <i className="ri-arrow-right-up-line text-lg"></i>
          </Link>
        </div>
      </div>
    </nav>
  );
}
