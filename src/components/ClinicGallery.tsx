import React, { useState } from "react";
import { Maximize2, ChevronLeft, ChevronRight, X, Sparkles, Heart, Stethoscope, ShieldCheck } from "lucide-react";

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description: string;
  category: "Instalaciones" | "Procedimientos" | "Tecnología" | "Éxito";
  badge: string;
}

const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: "img-1",
    url: "https://i.ibb.co/nqz46238/Save-Clip-App-670408691-18371017180165922-5133365789952151054-n.jpg",
    title: "Nuestras Instalaciones Médicas en Durán",
    description: "Ambientes diseñados para tu máximo confort y tranquilidad, cumpliendo con los más exigentes estándares de bioseguridad de ACESS.",
    category: "Instalaciones",
    badge: "Clínica Premium"
  },
  {
    id: "img-2",
    url: "https://i.ibb.co/Fqk8MKDq/Save-Clip-App-658171838-1705697040653889-7004509995493784262-n.jpg",
    title: "Odontología Estética de Vanguardia",
    description: "Equipamiento de última generación para sonrisas espectaculares. Tratamientos personalizados sin dolor guiados por especialistas.",
    category: "Procedimientos",
    badge: "Odontología Estética"
  },
  {
    id: "img-3",
    url: "https://i.ibb.co/4w4tgWY6/Save-Clip-App-712524031-18377334682165922-2555696126096709958-n.jpg",
    title: "Salud Ginecológica & Diagnóstico Digital",
    description: "Tecnología ecográfica avanzada de alta resolución para un control femenino preciso y con calidez profesional.",
    category: "Tecnología",
    badge: "Ginecología Integral"
  },
  {
    id: "img-4",
    url: "https://i.ibb.co/6JZWGqb3/Save-Clip-App-727799021-18379686019165922-1213207141689684578-n.jpg",
    title: "Casos de Éxito de Pacientes Imedent",
    description: "La satisfacción reflejada en resultados clínicamente perfectos. Devolviendo salud y bienestar dental a las familias.",
    category: "Éxito",
    badge: "Sonrisas Reales"
  }
];

export default function ClinicGallery() {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const openLightbox = (index: number) => {
    setActiveImageIndex(index);
    // Disable body scroll when lightbox is open
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setActiveImageIndex(null);
    // Restore body scroll
    document.body.style.overflow = "unset";
  };

  const nextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex + 1) % GALLERY_IMAGES.length);
    }
  };

  const prevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
    }
  };

  return (
    <section id="galeria" className="py-20 bg-gradient-to-b from-white to-[#F5F7FA] relative overflow-hidden">
      {/* Decorative background visual elements */}
      <div className="absolute top-[30%] right-[-10%] w-72 h-72 bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-80 h-80 bg-[#21C58E]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-xs font-bold text-[#0B5ED7] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#21C58E] animate-pulse" />
            <span>Galería Clínica Premium</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#263238]">
            Compromiso con tu Salud, Confort e Innovación
          </h2>
          <p className="font-sans text-gray-500 text-sm sm:text-base">
            Conoce de cerca nuestras instalaciones ubicadas en Durán, 
            nuestra tecnología de primer nivel y la atención cálida de nuestros especialistas médicos.
          </p>
        </div>

        {/* Dynamic Responsive 4-Column Modern Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="gallery-bento-grid">
          {GALLERY_IMAGES.map((img, index) => (
            <div
              key={img.id}
              id={`gallery-card-${img.id}`}
              className="group relative bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col hover:-translate-y-1.5"
              onMouseEnter={() => setHoveredId(img.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image box wrapper */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 cursor-pointer" onClick={() => openLightbox(index)}>
                <img
                  src={img.url}
                  alt={img.title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 text-white">
                  {/* Category top badge */}
                  <span className="self-start text-[9px] font-extrabold uppercase tracking-widest bg-white/25 backdrop-blur-md px-2.5 py-1 rounded-full text-white">
                    {img.category}
                  </span>

                  {/* Maximize prompt */}
                  <div className="self-end flex items-center gap-1.5 text-xs font-bold bg-white/90 text-[#263238] rounded-xl px-3 py-2 shadow-lg hover:scale-105 transition-transform duration-200">
                    <Maximize2 className="w-3.5 h-3.5 text-[#0B5ED7]" />
                    <span>Expandir</span>
                  </div>
                </div>

                {/* Static indicator badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full text-[10px] font-extrabold text-[#263238] shadow border border-gray-100 group-hover:opacity-0 transition-opacity">
                  {img.badge}
                </div>
              </div>

              {/* Text caption content below image */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-heading font-bold text-sm text-[#263238] group-hover:text-[#0B5ED7] transition-colors leading-snug">
                    {img.title}
                  </h3>
                  <p className="font-sans text-xs text-gray-500 leading-relaxed">
                    {img.description}
                  </p>
                </div>

                {/* Mini utility indicator */}
                <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                  <span className="flex items-center gap-1">
                    {img.category === "Instalaciones" && <ShieldCheck className="w-3 h-3 text-[#21C58E]" />}
                    {img.category === "Procedimientos" && <Stethoscope className="w-3 h-3 text-[#0B5ED7]" />}
                    {img.category === "Tecnología" && <Sparkles className="w-3 h-3 text-amber-500" />}
                    {img.category === "Éxito" && <Heart className="w-3 h-3 text-pink-500" />}
                    {img.category}
                  </span>
                  <span className="text-[#0B5ED7] group-hover:underline cursor-pointer" onClick={() => openLightbox(index)}>
                    Ver foto
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[#0B5ED7] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-[#263238]">Acreditación ACESS</h4>
              <p className="font-sans text-xs text-gray-400 mt-1">Nuestra clínica cumple estrictamente con las regulaciones de salud de la República del Ecuador.</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 border-t md:border-t-0 md:border-x border-gray-100 pt-6 md:pt-0 md:px-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-[#21C58E] shrink-0">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-[#263238]">Equipamiento Moderno</h4>
              <p className="font-sans text-xs text-gray-400 mt-1">Incorporamos radiología digital de vanguardia para diagnósticos precisos al instante.</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 border-t md:border-t-0 pt-6 md:pt-0">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-[#263238]">Atención 100% Sin Dolor</h4>
              <p className="font-sans text-xs text-gray-400 mt-1">Estrategias y calidez profesional orientadas a hacer que tu visita sea amigable y libre de temor.</p>
            </div>
          </div>
        </div>

      </div>

      {/* Accessible Interactive Fullscreen Gallery Lightbox Modal */}
      {activeImageIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 transition-all duration-300"
          id="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          onClick={closeLightbox}
          onKeyDown={(e) => {
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowRight") nextImage();
            if (e.key === "ArrowLeft") prevImage();
          }}
          tabIndex={0}
        >
          {/* Main Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors active:scale-95 cursor-pointer z-10"
            id="lightbox-close-btn"
            aria-label="Cerrar galería expandida"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Controls */}
          <button
            onClick={prevImage}
            className="absolute left-4 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors active:scale-95 cursor-pointer z-10"
            id="lightbox-prev-btn"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors active:scale-95 cursor-pointer z-10"
            id="lightbox-next-btn"
            aria-label="Siguiente imagen"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Inside Display Frame Box */}
          <div
            className="relative max-w-4xl w-full flex flex-col items-center justify-center gap-4 text-white z-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* The Image inside Lightbox */}
            <div className="relative max-h-[70vh] sm:max-h-[75vh] max-w-full overflow-hidden rounded-2xl shadow-2xl border-2 border-white/15">
              <img
                src={GALLERY_IMAGES[activeImageIndex].url}
                alt={GALLERY_IMAGES[activeImageIndex].title}
                referrerPolicy="no-referrer"
                className="max-h-[70vh] sm:max-h-[75vh] object-contain mx-auto"
              />
              
              {/* Category indicator inside */}
              <span className="absolute top-4 left-4 bg-gradient-to-r from-[#0B5ED7] to-[#21C58E] px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest select-none shadow">
                {GALLERY_IMAGES[activeImageIndex].category}
              </span>
            </div>

            {/* Captions */}
            <div className="text-center max-w-2xl px-6 space-y-2 mt-2">
              <h3 className="font-heading font-black text-lg sm:text-xl text-white select-none">
                {GALLERY_IMAGES[activeImageIndex].title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-gray-300 select-none">
                {GALLERY_IMAGES[activeImageIndex].description}
              </p>
              
              {/* Counter Indicator */}
              <p className="text-[10px] text-gray-500 font-extrabold tracking-wider select-none pt-2">
                Foto {activeImageIndex + 1} de {GALLERY_IMAGES.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
