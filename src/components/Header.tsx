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
    { label: "Servicios", href: "#servicios" },
    { label: "Beneficios", href: "#beneficios" },
    { label: "Galería", href: "#galeria" },
    { label: "Promociones", href: "#promociones" },
    { label: "Preguntas", href: "#preguntas" },
    { label: "Blog SEO", href: "#blog" }
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/85 backdrop-blur-md shadow-md border-b border-[#F5F7FA] py-3"
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
                alt="Logo Imedent Centro Médico" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover" 
              />
            </div>
            <div>
              <span className="font-heading font-black text-xl tracking-tight text-[#263238] group-hover:text-[#0B5ED7] transition-colors flex items-center gap-1">
                Imedent <span className="text-[#0B5ED7] text-xs font-bold uppercase py-0.5 px-2 bg-blue-50 border border-blue-100 rounded-full">Centro Médico</span>
              </span>
              <p className="text-[9px] text-[#21C58E] uppercase tracking-widest font-black">Medicina & Odontología • Durán</p>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" id="desktop-nav">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-sans font-medium text-sm text-[#263238] hover:text-[#0B5ED7] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#21C58E] hover:after:w-full after:transition-all after:duration-200"
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
              className="flex items-center gap-2 text-xs font-semibold text-[#263238] hover:text-[#0B5ED7] transition-colors bg-gray-100 hover:bg-gray-200/80 px-3 py-2 rounded-xl"
            >
              <Phone className="w-3.5 h-3.5 text-[#21C58E]" />
              <span>096 860 9865</span>
            </a>
            
            <a
              href="#reserva"
              className="flex items-center gap-2 text-xs font-bold text-white bg-gradient-to-r from-[#0B5ED7] to-[#0D6EFD] hover:shadow-lg hover:shadow-blue-500/20 active:scale-95 transition-all px-4 py-2.5 rounded-xl border border-blue-600 shadow-md"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Reservar Cita</span>
            </a>
          </div>

          {/* Mobile menu trigger */}
          <div className="md:hidden flex items-center gap-2">
            <a
              href="#reserva"
              className="p-2 bg-[#0B5ED7] text-white rounded-lg hover:bg-opacity-95"
              title="Reservar Cita"
            >
              <Calendar className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#263238] hover:text-[#0B5ED7] bg-gray-100 rounded-lg transition-colors"
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
                className="font-heading font-semibold text-base py-2 text-[#263238] hover:text-[#0B5ED7] border-b border-gray-50"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-2 pt-2">
            <a
              href="https://wa.me/593968609865?text=Hola,%20deseo%20más%20información%20sobre%20Imedent"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full text-sm font-semibold text-white bg-[#21C58E] py-2.5 rounded-xl shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span>Chatear por WhatsApp</span>
            </a>
            <a
              href="#reserva"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full text-sm font-bold text-white bg-[#0B5ED7] py-2.5 rounded-xl shadow-md"
            >
              <Calendar className="w-4 h-4" />
              <span>Reservar Cita en Línea</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
