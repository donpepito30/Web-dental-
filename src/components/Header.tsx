import React, { useState, useEffect } from "react";
import { Phone, Calendar, Menu, X, Heart, ShieldAlert } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Especialidades", href: "#servicios" },
    { label: "Promociones", href: "#promociones" },
    { label: "Instalaciones", href: "#instalaciones" },
    { label: "Testimonios", href: "#testimonios" },
    { label: "Preguntas", href: "#preguntas" }
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/85 backdrop-blur-md shadow-sm border-b border-gray-100 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand */}
          <a href="#" className="flex items-center gap-3 group" id="brand-logo">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl overflow-hidden border border-gray-100 bg-white shadow-sm group-hover:scale-105 transition-transform duration-200">
              <img 
                src="https://i.ibb.co/wN2zzSsw/FB-IMG-1781954245363.jpg" 
                alt="Logo Inmedentec Centro Médico" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover" 
              />
            </div>
            <div>
              <span className="font-heading font-black text-xl tracking-tight text-[#1E2A5E] group-hover:text-[#00A9FF] transition-colors flex items-center gap-1">
                Inmedentec
              </span>
              <p className="text-[9px] text-[#00A9FF] uppercase tracking-widest font-black">Clínica Médica & Dental</p>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" id="desktop-nav">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-sans font-semibold text-sm text-[#1E2A5E]/80 hover:text-[#00A9FF] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#00A9FF] hover:after:w-full after:transition-all after:duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Contact & CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4" id="header-contact">
            <a
              href="https://wa.me/593968609865?text=Hola,%20quisiera%20consultar%20sobre%20sus%20servicios%20médicos."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-bold text-[#1E2A5E] hover:text-[#00A9FF] transition-colors bg-white hover:bg-slate-50 border border-slate-200/80 px-4 py-2.5 rounded-full shadow-sm"
            >
              <Phone className="w-3.5 h-3.5 text-[#00A9FF]" />
              <span>096 860 9865</span>
            </a>
            
            <a
              href="https://wa.me/593968609865?text=Hola%20Inmedentec!%20Quisiera%20reservar%20una%20cita%20médica."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-bold text-white bg-[#1E2A5E] hover:bg-[#1E2A5E]/90 hover:shadow-lg hover:shadow-indigo-900/10 active:scale-95 transition-all px-6 py-2.5 rounded-full shadow-md"
            >
              <Calendar className="w-3.5 h-3.5 text-[#7DDAE8]" />
              <span>Reservar cita</span>
            </a>
          </div>

          {/* Mobile menu trigger */}
          <div className="md:hidden flex items-center gap-2">
            <a
              href="https://wa.me/593968609865?text=Hola%20Inmedentec!%20Quisiera%20reservar%20una%20cita%20médica."
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-[#1E2A5E] text-white rounded-full hover:bg-opacity-95"
              title="Reservar Cita"
            >
              <Calendar className="w-4 h-4 text-[#7DDAE8]" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#1E2A5E] hover:text-[#00A9FF] bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle Menu"
              id="mobile-menu-btn"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-lg py-5 px-4 flex flex-col gap-4 animate-fade-in z-50">
          <nav className="flex flex-col gap-3">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-heading font-semibold text-base py-2 text-[#1E2A5E]/85 hover:text-[#00A9FF] border-b border-gray-50"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-2 pt-2">
            <a
              href="https://wa.me/593968609865?text=Hola%20Inmedentec!%20Deseo%20más%20información%20sobre%20sus%20servicios%20médicos."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full text-sm font-bold text-white bg-[#00A9FF] hover:bg-[#00a2f5] py-3 rounded-full shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
            <a
              href="https://wa.me/593968609865?text=Hola%20Inmedentec!%20Quisiera%20reservar%20una%20cita%20médica."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full text-sm font-bold text-white bg-[#1E2A5E] hover:bg-[#1E2A5E]/90 py-3 rounded-full shadow-md"
            >
              <Calendar className="w-4 h-4 text-[#7DDAE8]" />
              <span>Reservar cita</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
