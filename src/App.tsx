import React, { useState, useEffect, useRef } from "react";
import {
  Stethoscope,
  Baby,
  Trash2,
  Sparkles,
  Droplet,
  Heart,
  Activity,
  ShieldCheck,
  Cpu,
  UserCheck,
  MapPin,
  Star,
  CheckCircle2,
  ArrowRight,
  Clock,
  Send,
  MessageSquare,
  Loader2,
  Calendar,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Phone,
  Search,
  BookOpen,
  Award,
  AlertCircle,
  HelpCircle,
  Mail,
  ArrowUp,
  Facebook,
  Instagram,
  Globe,
  Home
} from "lucide-react";
import {
  SERVICES_DATA,
  BENEFITS_DATA,
  PROMOS_DATA,
  TESTIMONIALS_DATA,
  FAQS_DATA,
  BLOG_POSTS
} from "./data";
import { Appointment, ChatMessage, Service, BlogPost } from "./types";
import Header from "./components/Header";
import ClinicGallery from "./components/ClinicGallery";
import { motion, AnimatePresence } from "motion/react";
import { AnimatedText } from "./components/AnimatedText";
import { AnimatedNumber } from "./components/AnimatedNumber";

// Custom helper to map service names to Lucide Icons dynamically
const getServiceIcon = (iconName: string) => {
  switch (iconName) {
    case "Medicina":
      return <Stethoscope className="w-6 h-6 text-[#21C58E]" />;
    case "Ecografia":
      return <Activity className="w-6 h-6 text-[#0B5ED7]" />;
    case "Examenes":
      return <Droplet className="w-6 h-6 text-blue-400" />;
    case "Cardiologia":
      return <Heart className="w-6 h-6 text-red-500 animate-pulse" />;
    case "Odontologia":
      return <Sparkles className="w-6 h-6 text-yellow-500" />;
    default:
      return <Stethoscope className="w-6 h-6 text-[#0B5ED7]" />;
  }
};

const getBenefitIcon = (iconName: string) => {
  switch (iconName) {
    case "ShieldCheck":
      return <ShieldCheck className="w-8 h-8 text-[#0B5ED7]" />;
    case "Cpu":
      return <Cpu className="w-8 h-8 text-[#21C58E]" />;
    case "UserCheck":
      return <UserCheck className="w-8 h-8 text-[#0B5ED7]" />;
    case "MapPin":
      return <MapPin className="w-8 h-8 text-[#21C58E]" />;
    default:
      return <ShieldCheck className="w-8 h-8 text-[#0B5ED7]" />;
  }
};

export default function App() {
  // Appointment Form States
  const [formData, setFormData] = useState<Appointment>({
    name: "",
    email: "",
    phone: "",
    specialty: "odontologia",
    service: SERVICES_DATA[0].name,
    date: "",
    timeSlot: "09:00",
    comments: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [createdAppointment, setCreatedAppointment] = useState<any | null>(null);

  // Filter state for services page
  const [servicesTab, setServicesTab] = useState<"todos" | "odontologia" | "medicina">("todos");
  const [selectedDetailedService, setSelectedDetailedService] = useState<Service | null>(null);
  const [openCategories, setOpenCategories] = useState<{ odontologia: boolean; medicina: boolean }>({
    odontologia: false,
    medicina: false
  });
  const [openPromoCategories, setOpenPromoCategories] = useState<{ odontologia: boolean; medicina: boolean }>({
    odontologia: false,
    medicina: false
  });
  const [openBlogCategories, setOpenBlogCategories] = useState<{ odontologia: boolean; medicina: boolean }>({
    odontologia: false,
    medicina: false
  });

  // Promo filtered state
  const [promoTab, setPromoTab] = useState<"todos" | "odontologia" | "medicina">("todos");

  // TESTIMONIALS Carousel indexing state
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // FAQs Accordion states
  const [openFaqId, setOpenFaqId] = useState<string | null>("faq-1");
  const [faqSearch, setFaqSearch] = useState("");

  // Blog Detailed Modal
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  const [blogSearch, setBlogSearch] = useState("");

  // Chatbot Widget integration
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showNotificationBadge, setShowNotificationBadge] = useState(true);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      role: "model",
      text: "¡Hola! Bienvenido a Inmedentec Centro Médico. 🩺🦷 Soy tu asistente inteligente personal. ¿En qué puedo orientarte hoy? Ofrecemos Medicina General/Familiar, Ecografías, Laboratorio, Cardiología y Odontología general en Durán. Si deseas agendar, puedes preguntarme o usar nuestro formulario rápido.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isChatSending, setIsChatSending] = useState(false);

  // Lead qualification capture for chatbot
  const [capturedLead, setCapturedLead] = useState({ name: "", phone: "", completed: false });
  const [waitingForLeadStep, setWaitingForLeadStep] = useState<"none" | "name" | "phone">("none");

  // Refs
  const testimonialsEndRef = useRef<HTMLDivElement>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Adjust default service type when specialty changes in booking form
  useEffect(() => {
    const defaultServices = SERVICES_DATA.filter(s => s.specialty === formData.specialty);
    if (defaultServices.length > 0) {
      setFormData(prev => ({
        ...prev,
        service: defaultServices[0].name
      }));
    }
  }, [formData.specialty]);

  // Testimonial Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex(prev => (prev + 1) % TESTIMONIALS_DATA.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleTestimonialNext = () => {
    setTestimonialIndex(prev => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const handleTestimonialPrev = () => {
    setTestimonialIndex(prev => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  // FAQS filtering
  const filteredFAQs = FAQS_DATA.filter(faq => {
    const query = faqSearch.toLowerCase();
    return faq.question.toLowerCase().includes(query) || faq.answer.toLowerCase().includes(query);
  });

  // BLOG filtering
  const filteredBlogPosts = BLOG_POSTS.filter(post => {
    const query = blogSearch.toLowerCase();
    return post.title.toLowerCase().includes(query) || post.excerpt.toLowerCase().includes(query) || post.category.toLowerCase().includes(query);
  });

  // Booking Form Submission Handler
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);
    setCreatedAppointment(null);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (response.ok) {
        setSubmitMessage({ type: "success", text: data.message });
        setCreatedAppointment(data.data);
        // Reset non-essential fields
        setFormData({
          name: "",
          email: "",
          phone: "",
          specialty: "odontologia",
          service: SERVICES_DATA[0].name,
          date: "",
          timeSlot: "09:00",
          comments: ""
        });
      } else {
        setSubmitMessage({ type: "error", text: data.message || "No pudimos programar la cita. Espacio ocupado." });
      }
    } catch (err) {
      console.error(err);
      setSubmitMessage({
        type: "error",
        text: "Hubo un error de conexión con el servidor. Intente nuevamente en unos minutos."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // chatbot preset chip trigger click
  const handleBotChipClick = (question: string) => {
    setChatInput(question);
    sendMessageToBot(question);
  };

  // Main chatbot submission logic
  const sendMessageToBot = async (customMessage?: string) => {
    const msgToSend = (customMessage || chatInput).trim();
    if (!msgToSend) return;

    // Append user message
    const userMsgId = `user-${Date.now()}`;
    const userMsgText = msgToSend;
    const userTimestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const newMessages = [
      ...chatMessages,
      { id: userMsgId, role: "user" as const, text: userMsgText, timestamp: userTimestamp }
    ];

    setChatMessages(newMessages);
    if (!customMessage) setChatInput("");
    setIsChatSending(true);

    // Context lead verification
    // 1. Check if we are proactively asking for leads
    if (waitingForLeadStep === "name") {
      setCapturedLead(prev => ({ ...prev, name: userMsgText }));
      setWaitingForLeadStep("phone");
      
      setTimeout(() => {
        setChatMessages(prev => [
          ...prev,
          {
            id: `bot-lead-phone-${Date.now()}`,
            role: "model",
            text: `¡Qué gusto conocerte, ${userMsgText}! Ahora cuéntame, ¿a qué número telefónico de WhatsApp te puede contactar un especialista de Inmedentec?`,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          }
        ]);
        setIsChatSending(false);
      }, 700);
      return;
    }

    if (waitingForLeadStep === "phone") {
      setCapturedLead(prev => ({ ...prev, phone: userMsgText, completed: true }));
      setWaitingForLeadStep("none");

      setTimeout(() => {
        setChatMessages(prev => [
          ...prev,
          {
            id: `bot-lead-thanks-${Date.now()}`,
            role: "model",
            text: `Perfecto, he registrado tus datos de contacto.\n\n👤 **Nombre:** ${capturedLead.name || "Paciente"}\n📞 **Teléfono:** ${userMsgText}\n\nUn asesor de Inmedentec te escribirá directamente pronto para formalizar tus dudas de salud. Mientras tanto, puedes usar con total libertad el formulario de citas abajo para agendar tu fecha preferida al instante.`,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          }
        ]);
        setIsChatSending(false);
      }, 900);
      return;
    }

    // Lead trigger keywords check
    const sentence = userMsgText.toLowerCase();
    const wantsContact = sentence.includes("agenda") || sentence.includes("precio") || sentence.includes("costo") || sentence.includes("cita") || sentence.includes("valores") || sentence.includes("whatsapp");

    try {
      // Map history for Gemini
      const formattedHistory = newMessages.slice(0, -1).map(m => ({
        role: m.role,
        text: m.text
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsgText,
          history: formattedHistory
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        let botText = data.response;

        // If user wants appointment or is new, append proactive lead capture if they haven't given it yet
        if (wantsContact && !capturedLead.completed && waitingForLeadStep === "none") {
          botText += "\n\nPara brindarte un asesoramiento personalizado y sin compromisos inmediatos, ¿cómo te llamas? Estaré encantado de conectarte con el staff.";
          setWaitingForLeadStep("name");
        }

        setChatMessages(prev => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            role: "model",
            text: botText,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          }
        ]);
      } else {
        throw new Error("Bad response status");
      }
    } catch (err) {
      console.error(err);
      // Fallback
      let fallbackResponse = "Entiendo perfectamente tu inquietud. En Inmedentec Centro Médico estamos comprometidos con tu salud integral de medicina familiar y odontología en Durán. Te aconsejamos reservar tu cita de valoración en nuestro formulario abajo para una atención inmediata, o hacernos cualquier otra pregunta.";
      
      if (wantsContact && !capturedLead.completed) {
        fallbackResponse += " ¿Me podrías indicar tu Nombre para que un especialista humano te contacte de inmediato por WhatsApp?";
        setWaitingForLeadStep("name");
      }

      setChatMessages(prev => [
        ...prev,
        {
          id: `bot-fallback-${Date.now()}`,
          role: "model",
          text: fallbackResponse,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    } finally {
      setIsChatSending(false);
    }
  };

  return (
    <div className="min-h-screen mesh-gradient text-[#1E2A5E] selection:bg-[#00A9FF]/30 selection:text-[#1E2A5E] font-sans" id="landing-container">
      {/* 🧭 NAVIGATION HEADER */}
      <Header />

      {/* 🚀 1. HERO SECTION */}
      <section
        id="hero"
        className="relative pt-32 pb-20 md:pt-40 md:pb-32 min-h-[85vh] flex items-center bg-transparent overflow-hidden"
      >
        {/* Real Clinic Background Image with high visibility & premium healthcare gradient mask overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://i.ibb.co/Jj2DQsjF/13-clinica-me-dica.jpg" 
            alt="Fondo de Centro Médico Inmedentec" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1E2A5E]/95 via-[#1E2A5E]/80 to-transparent" />
          <div className="absolute inset-0 bg-[#1E2A5E]/20" />
        </div>

        {/* Floating background decorative light blobs */}
        <div className="absolute top-[10%] left-[-10%] w-72 h-72 bg-blue-400/10 rounded-full blur-3xl pointer-events-none z-10" />
        <div className="absolute bottom-[20%] right-[-10%] w-96 h-96 bg-[#7DDAE8]/10 rounded-full blur-3xl pointer-events-none z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Text Information Column: Spanning 8 columns to leave the right area beautiful and clean */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-8 space-y-6 md:space-y-8 text-center lg:text-left" 
              id="hero-text-content"
            >
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#00A9FF]/20 border border-[#00A9FF]/30 rounded-full text-xs font-semibold text-white uppercase tracking-wider shadow-sm mx-auto lg:mx-0 backdrop-blur-sm">
                <CheckCircle2 className="w-4 h-4 text-[#7DDAE8]" />
                <span>Centro Médico y Odontológico Integral</span>
              </div>

              {/* Title */}
              <h1 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-white leading-tight tracking-tight">
                <AnimatedText 
                  text="Tu salud y bienestar en las mejores manos"
                  highlightWords={["salud", "bienestar"]}
                  highlightClass="text-[#00A9FF]"
                  delay={0.15}
                />
              </h1>

              {/* Tagline */}
              <p className="font-sans text-white/95 text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Consultas médicas, odontología, ecografías y laboratorio clínico en Durán.
              </p>

              {/* Call To Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                 <a
                  href="https://wa.me/593968609865?text=Hola%20Inmedentec!%20Quisiera%20reservar%20una%20cita%20médica."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 bg-[#00A9FF] hover:bg-[#00A9FF]/90 text-white font-bold text-base rounded-full shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200"
                  id="hero-cta-booking"
                >
                  <Calendar className="w-5 h-5 text-[#7DDAE8]" />
                  <span>Reservar cita</span>
                </a>

                <a
                  href="https://wa.me/593968609865?text=Hola%20Inmedentec!%20Deseo%20más%20información%20sobre%20los%20servicios%20de%20medicina%20y%20odontología."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-100 text-[#1E2A5E] font-bold text-base rounded-full shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200"
                  id="hero-cta-whatsapp"
                >
                  <Phone className="w-5 h-5 text-[#00A9FF]" />
                  <span>WhatsApp</span>
                </a>
              </div>

            </motion.div>

            {/* Empty space in grid column on desktop to let full background image shine visibly on right */}
            <div className="hidden lg:block lg:col-span-4" />

          </div>
        </div>
      </section>

      {/* 🩺 3. SERVICES SECTION WITH DETAILED DETAILS POPUP */}
      <section id="servicios" className="py-20 bg-gradient-to-b from-white to-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full text-xs font-bold text-[#21C58E] uppercase tracking-wider">
              <span>Especialidades Médicas</span>
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#263238] leading-tight">
              <AnimatedText 
                text="Nuestras Especialidades con Tecnología de Vanguardia"
                highlightWords={["Especialidades", "Tecnología"]}
                highlightClass="text-[#0B5ED7]"
                delay={0.1}
              />
            </h2>
            <p className="font-sans text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
              <AnimatedText 
                text="Haz clic en cada especialidad médica para desplegar nuestro catálogo completo de tratamientos y servicios especializados de primer nivel."
                highlightWords={["catálogo", "especializados"]}
                highlightClass="text-[#21C58E] font-medium"
                delay={0.25}
              />
            </p>
          </div>

          {/* Interactive Collapsible Specialty Blocks (Content inside buttons) */}
          <div className="space-y-6 max-w-5xl mx-auto" id="collapsible-services-container">
            
            {/* 1. ODONTOLOGÍA COLLAPSIBLE PANEL */}
            <div className="border border-gray-200/60 rounded-3xl overflow-hidden shadow-md bg-white">
              <button
                onClick={() => setOpenCategories(prev => ({ ...prev, odontologia: !prev.odontologia }))}
                type="button"
                className="w-full flex flex-col md:flex-row items-center justify-between p-6 sm:p-8 bg-gradient-to-r from-white to-slate-50/30 hover:to-slate-50 text-left transition-all cursor-pointer group"
                id="btn-toggle-odontologia"
                aria-expanded={openCategories.odontologia}
                aria-controls="panel-odontologia-content"
              >
                <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-[#21C58E] flex items-center justify-center shrink-0 shadow-sm transition-transform">
                    <Stethoscope className="w-8 h-8" />
                  </div>
                  <div className="space-y-1 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row items-center gap-2">
                      <h3 className="font-heading font-black text-xl sm:text-2xl text-[#263238] group-hover:text-[#0B5ED7] transition-colors">
                        Servicios de Odontología
                      </h3>
                      <span className="text-[10px] uppercase tracking-widest font-extrabold px-2.5 py-1 bg-emerald-50 text-[#21C58E] border border-emerald-100 rounded-full mt-1 sm:mt-0">
                        1 Tratamiento
                      </span>
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-gray-500 max-w-xl">
                      Cuidado dental integral: estética, prevención y restauración con tecnología de ultrasonido, resinas biocompatibles y atención indolora.
                    </p>
                  </div>
                </div>

                <div className="mt-4 md:mt-0 flex items-center gap-3">
                  <span className="hidden sm:inline-block text-xs font-bold uppercase tracking-wider text-gray-400 group-hover:text-[#0B5ED7] transition-colors">
                    {openCategories.odontologia ? "Ocultar tratamientos" : "Abrir catálogo de tratamientos"}
                  </span>
                  <div className={`p-2.5 rounded-full bg-gray-50 border border-gray-100 text-gray-400 group-hover:text-[#0B5ED7] group-hover:border-blue-100 transition-all ${
                    openCategories.odontologia ? "rotate-180 bg-blue-50 text-[#0B5ED7]" : ""
                  }`}>
                    <ChevronDown className="w-5 h-5 transition-transform duration-300" />
                  </div>
                </div>
              </button>

              {/* Expanding Dental Items Grid */}
              <AnimatePresence initial={false}>
                {openCategories.odontologia && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    id="panel-odontologia-content"
                    className="overflow-hidden border-t border-gray-100 bg-slate-50/50"
                  >
                    <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {SERVICES_DATA.filter((s) => s.specialty === "odontologia").map((service) => (
                          <div
                            key={service.id}
                            id={`service-${service.id}`}
                            className="group relative bg-white rounded-2xl border border-gray-200/60 p-6 shadow-md hover:shadow-lg hover:border-blue-200 transition-all duration-300 flex flex-col justify-between"
                          >
                            {/* Service header */}
                            <div className="flex items-center justify-between mb-4">
                              <div className="p-3 rounded-xl bg-slate-50 group-hover:bg-blue-50 transition-colors">
                                {getServiceIcon(service.iconName)}
                              </div>
                              <span className="text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 bg-emerald-50 text-[#21C58E] border border-emerald-100 rounded-full">
                                Odontología
                              </span>
                            </div>

                            {/* Content */}
                            <div className="space-y-2">
                              <h4 className="font-heading font-bold text-base text-[#263238] group-hover:text-[#0B5ED7] transition-colors">
                                {service.name}
                              </h4>
                              <p className="font-sans text-xs text-gray-500 leading-relaxed line-clamp-3">
                                {service.description}
                              </p>
                            </div>

                            {/* Duration & Price */}
                            <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-[11px] text-gray-500 font-semibold">
                              <span className="inline-flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5 text-gray-400" />
                                {service.duration}
                              </span>
                              <span className="text-gray-700">
                                {service.priceEstimate ? "Costos detallados" : ""}
                              </span>
                            </div>

                            <div className="mt-5">
                              <button
                                onClick={() => setSelectedDetailedService(service)}
                                className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-50 group-hover:bg-gradient-to-r group-hover:from-[#0B5ED7] group-hover:to-blue-600 text-gray-600 group-hover:text-white font-bold text-xs rounded-lg uppercase tracking-wider transition-all duration-300 cursor-pointer"
                              >
                                <span>Ver Detalles de Cuidado</span>
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="lg:col-span-5">
                        <div className="bg-gradient-to-br from-[#00A9FF]/10 to-[#1E2A5E]/5 p-4 sm:p-5 rounded-3xl border border-blue-100/60 shadow-md flex flex-row items-center gap-4 sm:gap-5 group hover:shadow-xl transition-all duration-300">
                          <div className="w-[35%] sm:w-2/5 shrink-0 rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center p-1">
                            <img
                              src="https://i.ibb.co/93myLNr3/Save-Clip-App-658171838-1705697040653889-7004509995493784262-n.jpg"
                              alt="Consultorio Odontológico de Inmedentec"
                              className="w-full h-auto object-contain max-h-[120px] sm:max-h-[300px] rounded-xl transition-all duration-500 group-hover:scale-[1.02]"
                              referrerPolicy="no-referrer"
                              loading="lazy"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="inline-block text-[9px] font-extrabold uppercase tracking-widest text-[#00A9FF] bg-blue-50 px-2 py-0.5 rounded">
                              ODONTOLOGÍA SIN MIEDO
                            </span>
                            <h4 className="font-heading font-black text-xs text-[#263238] mt-1 leading-snug">
                              Equipos de Profilaxis y Estética Dental
                            </h4>
                            <p className="font-sans text-[11px] text-gray-500 mt-1.5 leading-relaxed">
                              Nuestra unidad dental en Durán está equipada con ultrasonido de limpieza indolora y tecnología de foto-curado moderna. Garantizamos una esterilización completa antes y después de cada tratamiento clínico.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 2. MEDICINA GENERAL Y ESPECIALIDADES COLLAPSIBLE PANEL */}
            <div className="border border-gray-200/60 rounded-3xl overflow-hidden shadow-md bg-white">
              <button
                onClick={() => setOpenCategories(prev => ({ ...prev, medicina: !prev.medicina }))}
                type="button"
                className="w-full flex flex-col md:flex-row items-center justify-between p-6 sm:p-8 bg-gradient-to-r from-white to-slate-50/30 hover:to-slate-50 text-left transition-all cursor-pointer group"
                id="btn-toggle-medicina"
                aria-expanded={openCategories.medicina}
                aria-controls="panel-medicina-content"
              >
                <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#0B5ED7] flex items-center justify-center shrink-0 shadow-sm transition-transform">
                    <Heart className="w-8 h-8 text-[#0B5ED7]" />
                  </div>
                  <div className="space-y-1 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row items-center gap-2">
                      <h3 className="font-heading font-black text-xl sm:text-2xl text-[#263238] group-hover:text-[#0B5ED7] transition-colors">
                        Medicina Familiar & Diagnósticos
                      </h3>
                      <span className="text-[10px] uppercase tracking-widest font-extrabold px-2.5 py-1 bg-blue-50 text-[#0B5ED7] border border-blue-100 rounded-full mt-1 sm:mt-0">
                        4 Servicios Clave
                      </span>
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-gray-500 max-w-xl">
                      Consultas de medicina general familiar, control cardiológico (EKG), ecografías de alta definición y toma de exámenes de laboratorio de respuesta rápida.
                    </p>
                  </div>
                </div>

                <div className="mt-4 md:mt-0 flex items-center gap-3">
                  <span className="hidden sm:inline-block text-xs font-bold uppercase tracking-wider text-gray-400 group-hover:text-[#0B5ED7] transition-colors">
                    {openCategories.medicina ? "Ocultar catálogo" : "Abrir catálogo de servicios"}
                  </span>
                  <div className={`p-2.5 rounded-full bg-gray-50 border border-gray-100 text-gray-400 group-hover:text-[#0B5ED7] group-hover:border-blue-100 transition-all ${
                    openCategories.medicina ? "rotate-180 bg-blue-50 text-[#0B5ED7]" : ""
                  }`}>
                    <ChevronDown className="w-5 h-5 transition-transform duration-300" />
                  </div>
                </div>
              </button>

              {/* Expanding Medicine Items Grid */}
              <AnimatePresence initial={false}>
                {openCategories.medicina && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    id="panel-medicina-content"
                    className="overflow-hidden border-t border-gray-100 bg-slate-50/50"
                  >
                    <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {SERVICES_DATA.filter((s) => s.specialty === "medicina").map((service) => (
                          <div
                            key={service.id}
                            id={`service-${service.id}`}
                            className="group relative bg-white rounded-2xl border border-gray-200/60 p-6 shadow-md hover:shadow-lg hover:border-blue-200 transition-all duration-300 flex flex-col justify-between"
                          >
                            {/* Service header */}
                            <div className="flex items-center justify-between mb-4">
                              <div className="p-3 rounded-xl bg-slate-50 group-hover:bg-blue-50 transition-colors">
                                {getServiceIcon(service.iconName)}
                              </div>
                              <span className="text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 bg-blue-50 text-[#0B5ED7] border border-blue-100 rounded-full">
                                Medicina Familiar
                              </span>
                            </div>

                            {/* Content */}
                            <div className="space-y-2">
                              <h4 className="font-heading font-bold text-base text-[#263238] group-hover:text-[#06429C] transition-colors">
                                {service.name}
                              </h4>
                              <p className="font-sans text-xs text-gray-500 leading-relaxed line-clamp-3">
                                {service.description}
                              </p>
                            </div>

                            {/* Duration & Price */}
                            <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-[11px] text-gray-500 font-semibold">
                              <span className="inline-flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5 text-gray-400" />
                                {service.duration}
                              </span>
                              <span className="text-gray-700">
                                {service.priceEstimate ? "Costos detallados" : ""}
                              </span>
                            </div>

                            <div className="mt-5">
                              <button
                                onClick={() => setSelectedDetailedService(service)}
                                className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-50 group-hover:bg-gradient-to-r group-hover:from-[#0B5ED7] group-hover:to-blue-600 text-gray-600 group-hover:text-white font-bold text-xs rounded-lg uppercase tracking-wider transition-all duration-300 cursor-pointer"
                              >
                                <span>Ver Detalles de Cuidado</span>
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="lg:col-span-5">
                        <div className="bg-gradient-to-br from-[#00A9FF]/10 to-[#1E2A5E]/5 p-4 sm:p-5 rounded-3xl border border-blue-100/60 shadow-md flex flex-row items-center gap-4 sm:gap-5 group hover:shadow-xl transition-all duration-300">
                          <div className="w-[35%] sm:w-2/5 shrink-0 rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center p-1">
                            <img
                              src="https://i.ibb.co/prPLNkZt/Save-Clip-App-727799021-18379686019165922-1213207141689684578-n.jpg"
                              alt="Consultorio de Ginecología y Ecografía de Inmedentec"
                              className="w-full h-auto object-contain max-h-[120px] sm:max-h-[300px] rounded-xl transition-all duration-500 group-hover:scale-[1.02]"
                              referrerPolicy="no-referrer"
                              loading="lazy"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="inline-block text-[9px] font-extrabold uppercase tracking-widest text-[#21C58E] bg-emerald-50 px-2 py-0.5 rounded">
                              TECNOLOGÍA DE ECOGRAFÍA
                            </span>
                            <h4 className="font-heading font-black text-xs text-[#263238] mt-1 leading-snug">
                              Ginecología & Diagnóstico de Alta Resolución
                            </h4>
                            <p className="font-sans text-[11px] text-gray-500 mt-1.5 leading-relaxed">
                              Disponemos de ecógrafos de alta gama de excelente definición para valoraciones abdominales, pélvicas y ginecológicas inmediatas, brindando un diagnóstico preciso y confiable respaldado por médicos certificados en Durán.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>

      {/* 🔍 DETAILED SERVICES INFO DIALOG / MODAL (ACCESSIBILITY COMPLIANT) */}
      <AnimatePresence>
        {selectedDetailedService && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.93, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.93, y: 15, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden"
              role="dialog"
              aria-modal="true"
            >
              <button
                onClick={() => setSelectedDetailedService(null)}
                className="absolute top-4 right-4 p-2.5 text-gray-400 hover:text-[#263238] bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                aria-label="Cerrar detalles de servicio"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                
                {/* Specialized Header Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-xs font-semibold text-[#0B5ED7]">
                  <Stethoscope className="w-4 h-4 text-[#21C58E]" />
                  <span className="capitalize">{selectedDetailedService.specialty} Especializada</span>
                </div>

                {/* Title */}
                <h3 className="font-heading font-extrabold text-2xl text-[#263238] mt-2">
                  {selectedDetailedService.name}
                </h3>

                {/* Long Details Information */}
                <div className="space-y-4 font-sans text-sm text-gray-600 leading-relaxed">
                  <p>{selectedDetailedService.longerDetails}</p>

                  {selectedDetailedService.prepInfo && (
                    <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex gap-3">
                      <AlertCircle className="w-5 h-5 text-[#21C58E] shrink-0" />
                      <div>
                        <p className="font-bold text-gray-800 text-xs uppercase tracking-wider">Preparación requerida:</p>
                        <p className="text-xs text-gray-600 mt-1">{selectedDetailedService.prepInfo}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Price estimation and duration fields */}
                <div className="bg-[#F5F7FA] p-4 rounded-xl grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-semibold">Duración Estimada</p>
                    <p className="text-sm font-bold text-[#263238] mt-1 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#0B5ED7]" />
                      {selectedDetailedService.duration}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-semibold">Costo de Inversión</p>
                    <p className="text-sm font-bold text-[#21C58E] mt-1">
                      {selectedDetailedService.priceEstimate}
                    </p>
                  </div>
                </div>

                {/* Call to actions in modal */}
                <div className="flex gap-3">
                  <a
                    href={`https://wa.me/593968609865?text=Hola%20Inmedentec!%20Quisiera%20reservar%20una%20cita%20de%20valoración%20para%20el%20servicio%20de%20${encodeURIComponent(selectedDetailedService.name)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      setSelectedDetailedService(null);
                    }}
                    className="flex-1 text-center py-3.5 bg-[#0B5ED7] hover:bg-blue-700 text-white font-bold text-xs rounded-xl uppercase tracking-widest shadow-md transition-colors"
                  >
                    Reservar cita
                  </a>
                  
                  <a
                    href={`https://wa.me/593968609865?text=Hola,%20quisiera%20saber%20más%20sobre%20${encodeURIComponent(selectedDetailedService.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3.5 bg-emerald-50 hover:bg-emerald-100 text-[#21C58E] rounded-xl flex items-center justify-center transition-colors"
                    title="Preguntar detalles por WhatsApp"
                  >
                    <Phone className="w-5 h-5" />
                  </a>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🌟 4. DIFFERENTIAL BENEFITS BENTO GRID */}
      <section id="beneficios" className="py-16 bg-gradient-to-b from-[#F5F7FA] to-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Introductory Text Grid */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-xs font-bold text-[#0B5ED7] uppercase tracking-wider">
                <span>¿Por qué Inmedentec?</span>
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#263238] leading-tight">
                <AnimatedText 
                  text="Estándares de Excelencia para el cuidado de tu familia"
                  highlightWords={["Excelencia", "familia"]}
                  highlightClass="text-[#00A9FF]"
                  delay={0.1}
                />
              </h2>
              <p className="font-sans text-gray-600 text-sm sm:text-base leading-relaxed">
                <AnimatedText 
                  text="Nos tomamos la salud con absoluta seriedad. No solo resolvemos molestias físicas; diseñamos una experiencia de hospitalidad médica donde el respeto, la tecnología y el confort se entrelazan."
                  highlightWords={["hospitalidad", "tecnología"]}
                  highlightClass="text-[#7DDAE8] font-medium"
                  delay={0.25}
                />
              </p>
            </div>

            {/* Real Reception / Facilities Photo Showcase - NO CROPPING */}
            <div className="lg:col-span-12 xl:col-span-5 lg:order-last">
              <div className="bg-gradient-to-br from-[#00A9FF]/10 to-[#1E2A5E]/5 rounded-3xl border border-blue-100/60 p-4 sm:p-5 shadow-sm flex flex-row items-center gap-4 sm:gap-5 group hover:shadow-md transition-all duration-300">
                <div className="w-[30%] shrink-0 rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center p-1">
                  <img
                    src="https://i.ibb.co/4w4tgWY6/Save-Clip-App-712524031-18377334682165922-2555696126096709958-n.jpg"
                    alt="Recepción de Inmedentec"
                    className="w-full h-auto object-contain max-h-[100px] rounded-xl transition-transform duration-500 group-hover:scale-[1.02]"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="inline-block text-[9px] font-extrabold uppercase tracking-widest text-[#00A9FF] bg-blue-50 px-2.5 py-1 rounded-full">
                    BIENVENIDA CÁLIDA
                  </span>
                  <h4 className="font-heading font-black text-xs text-[#263238] mt-1">Sala de Espera y Admisión Higienizada</h4>
                  <p className="font-sans text-[11px] text-gray-500 mt-1 leading-relaxed">
                    Nuestra central de atención al cliente en Durán te brinda un ingreso cómodo, ágil y totalmente ordenado.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* ACESS Badge & 4 Compact Benefits in a SINGLE row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center pt-8 border-t border-gray-100">
            {/* ACESS Badge */}
            <div className="lg:col-span-4 bg-white p-4 rounded-2xl border border-emerald-100/80 flex items-center gap-4 shadow-sm">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-[#21C58E] shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm text-[#263238]">Consultorio Acreditado ACESS</p>
                <p className="text-xs text-gray-400">Controles rigurosos de esterilización y bioseguridad.</p>
              </div>
            </div>

            {/* 4 Compact Benefits Row */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4" id="bento-differential">
              {BENEFITS_DATA.map((benefit) => (
                <div
                  key={benefit.id}
                  className="bg-white p-4 rounded-2xl border border-gray-200/60 shadow-sm hover:shadow-md hover:border-blue-200/80 transition-all duration-300 flex items-center gap-3 group"
                >
                  <div className="p-2 bg-blue-50/60 rounded-xl text-[#00A9FF] group-hover:bg-blue-100/80 transition-colors shrink-0">
                    {getBenefitIcon(benefit.iconName)}
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-xs text-[#263238] leading-tight group-hover:text-[#00A9FF] transition-colors">
                      {benefit.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 🎁 5. DYNAMIC PROMOTIONS SECTION */}
      <section id="promociones" className="py-20 bg-gradient-to-b from-[#F8FAFC] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header promo details layout */}
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-50 border border-pink-100 rounded-full text-xs font-bold text-pink-600 uppercase tracking-widest">
              <span>Promociones del Mes</span>
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#263238] leading-tight">
              <AnimatedText 
                text="Paquetes de Salud con Descuentos de Temporada"
                highlightWords={["Salud", "Descuentos", "Temporada"]}
                highlightClass="text-[#0B5ED7]"
                delay={0.1}
              />
            </h2>
            <p className="font-sans text-gray-500 text-sm sm:text-base max-w-2xl mx-auto">
              <AnimatedText 
                text="Haz clic en cada área médica para desplegar los paquetes promocionales exclusivos y facilidades de financiamiento vigentes."
                highlightWords={["exclusivos", "financiamiento"]}
                highlightClass="text-[#21C58E] font-medium"
                delay={0.25}
              />
            </p>
          </div>

          {/* Interactive Collapsible Promo Categories (Content inside buttons) */}
          <div className="space-y-6 max-w-5xl mx-auto" id="collapsible-promos-container">
            
            {/* 1. ODONTOLOGÍA PROMOS PANEL */}
            <div className="border border-gray-200/60 rounded-3xl overflow-hidden shadow-md bg-white">
              <button
                onClick={() => setOpenPromoCategories(prev => ({ ...prev, odontologia: !prev.odontologia }))}
                type="button"
                className="w-full flex flex-col md:flex-row items-center justify-between p-6 sm:p-8 bg-gradient-to-r from-white to-slate-50/30 hover:to-slate-50 text-left transition-all cursor-pointer group"
                id="btn-toggle-promo-odontologia"
                aria-expanded={openPromoCategories.odontologia}
                aria-controls="panel-promo-odontologia-content"
              >
                <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-[#21C58E] flex items-center justify-center shrink-0 shadow-sm transition-transform">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <div className="space-y-1 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row items-center gap-2">
                      <h3 className="font-heading font-black text-xl sm:text-2xl text-[#263238] group-hover:text-[#0B5ED7] transition-colors">
                        Promociones en Odontología
                      </h3>
                      <span className="text-[10px] uppercase tracking-widest font-extrabold px-2.5 py-1 bg-emerald-50 text-[#21C58E] border border-emerald-100 rounded-full mt-1 sm:mt-0">
                        2 Ofertas Activas
                      </span>
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-gray-500 max-w-xl">
                      Ahorra en tratamientos estéticos, limpiezas de sarro por ultrasonido y blanqueamientos dentales especializados sin dolor.
                    </p>
                  </div>
                </div>

                <div className="mt-4 md:mt-0 flex items-center gap-3">
                  <span className="hidden sm:inline-block text-xs font-bold uppercase tracking-wider text-gray-400 group-hover:text-[#0B5ED7] transition-colors">
                    {openPromoCategories.odontologia ? "Ocultar ofertas" : "Ver ofertas disponibles"}
                  </span>
                  <div className={`p-2.5 rounded-full bg-gray-50 border border-gray-100 text-gray-400 group-hover:text-[#0B5ED7] group-hover:border-blue-100 transition-all ${
                    openPromoCategories.odontologia ? "rotate-180 bg-blue-50 text-[#0B5ED7]" : ""
                  }`}>
                    <ChevronDown className="w-5 h-5 transition-transform duration-300" />
                  </div>
                </div>
              </button>

              {/* Expanding Dental Promos Grid */}
              <div 
                id="panel-promo-odontologia-content"
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openPromoCategories.odontologia ? "max-h-[2000px] border-t border-gray-100 p-6 sm:p-8 bg-slate-50/50" : "max-h-0"
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {PROMOS_DATA.filter((p) => p.specialty === "odontologia").map((promo) => (
                    <div
                      key={promo.id}
                      className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#21C58E]/40 transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
                    >
                      {/* Decorative background light circle */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-[#21C58E]/5 rounded-bl-full pointer-events-none" />

                      {/* Card Top Information */}
                      <div className="p-6 sm:p-8 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="bg-[#21C58E]/10 text-[#21C58E] font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#21C58E]/20">
                            {promo.badge}
                          </span>
                          <span className="text-xs text-pink-600 font-bold bg-pink-50 px-2 py-0.5 rounded-lg border border-pink-100">
                            {promo.discount}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <h4 className="font-heading font-extrabold text-xl text-[#263238] leading-snug">
                            {promo.title}
                          </h4>
                          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                            {promo.subtitle}
                          </p>
                        </div>

                        <p className="font-sans text-sm text-gray-500 leading-relaxed">
                          {promo.description}
                        </p>
                      </div>

                      {/* Price Display and Footer Button */}
                      <div className="p-6 sm:p-8 bg-[#F5F7FA] border-t border-gray-50 space-y-4 mt-auto">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Inversión Especial</p>
                            <div className="flex items-baseline gap-2 mt-0.5">
                              <span className="text-2xl font-heading font-black text-[#263238]">{promo.promoPrice}</span>
                              {promo.originalPrice && (
                                <span className="text-sm text-gray-400 line-through font-semibold">{promo.originalPrice}</span>
                              )}
                            </div>
                          </div>
                          <div className="text-right text-[11px] text-gray-400 font-medium">
                            <p>{promo.validity}</p>
                          </div>
                        </div>

                        {/* Immediate Action Trigger to populate booking form */}
                        <a
                          href={`https://wa.me/593968609865?text=Hola%20Inmedentec!%20Quisiera%20separar%20mi%20cupo%20para%20la%20promoción:%20${encodeURIComponent(promo.title)}.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-2 py-3 bg-[#0B5ED7] hover:bg-[#0D6EFD] text-white font-bold text-xs rounded-xl uppercase tracking-widest shadow transition-colors"
                        >
                          <span>Separar por WhatsApp</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. MEDICINA GENERAL Y ESPECIALIDADES PROMOS PANEL */}
            <div className="border border-gray-200/60 rounded-3xl overflow-hidden shadow-md bg-white">
              <button
                onClick={() => setOpenPromoCategories(prev => ({ ...prev, medicina: !prev.medicina }))}
                type="button"
                className="w-full flex flex-col md:flex-row items-center justify-between p-6 sm:p-8 bg-gradient-to-r from-white to-slate-50/30 hover:to-slate-50 text-left transition-all cursor-pointer group"
                id="btn-toggle-promo-medicina"
                aria-expanded={openPromoCategories.medicina}
                aria-controls="panel-promo-medicina-content"
              >
                <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#0B5ED7] flex items-center justify-center shrink-0 shadow-sm transition-transform">
                    <Heart className="w-8 h-8 text-[#0B5ED7]" />
                  </div>
                  <div className="space-y-1 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row items-center gap-2">
                      <h3 className="font-heading font-black text-xl sm:text-2xl text-[#263238] group-hover:text-[#0B5ED7] transition-colors">
                        Promociones en Medicina Familiar & Diagnósticos
                      </h3>
                      <span className="text-[10px] uppercase tracking-widest font-extrabold px-2.5 py-1 bg-blue-50 text-[#0B5ED7] border border-blue-100 rounded-full mt-1 sm:mt-0">
                        2 Ofertas Activas
                      </span>
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-gray-500 max-w-xl">
                      Accede a diagnósticos avanzados, ecografías y chequeos de laboratorio preventivo con tarifas familiares preferenciales.
                    </p>
                  </div>
                </div>

                <div className="mt-4 md:mt-0 flex items-center gap-3">
                  <span className="hidden sm:inline-block text-xs font-bold uppercase tracking-wider text-gray-400 group-hover:text-[#0B5ED7] transition-colors">
                    {openPromoCategories.medicina ? "Ocultar ofertas" : "Ver ofertas disponibles"}
                  </span>
                  <div className={`p-2.5 rounded-full bg-gray-50 border border-gray-100 text-gray-400 group-hover:text-[#0B5ED7] group-hover:border-blue-100 transition-all ${
                    openPromoCategories.medicina ? "rotate-180 bg-blue-50 text-[#0B5ED7]" : ""
                  }`}>
                    <ChevronDown className="w-5 h-5 transition-transform duration-300" />
                  </div>
                </div>
              </button>

              {/* Expanding Medicine Promos Grid */}
              <div 
                id="panel-promo-medicina-content"
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openPromoCategories.medicina ? "max-h-[1200px] border-t border-gray-100 p-6 sm:p-8 bg-slate-50/50" : "max-h-0"
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {PROMOS_DATA.filter((p) => p.specialty === "medicina").map((promo) => (
                    <div
                      key={promo.id}
                      className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 relative overflow-hidden flex flex-col justify-between w-full"
                    >
                      {/* Decorative background light circle */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full pointer-events-none" />

                      {/* Card Top Information */}
                      <div className="p-6 sm:p-8 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="bg-blue-50 text-[#0B5ED7] font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-blue-100">
                            {promo.badge}
                          </span>
                          <span className="text-xs text-[#0B5ED7] font-bold bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-100">
                            {promo.discount}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <h4 className="font-heading font-extrabold text-xl text-[#263238] leading-snug">
                            {promo.title}
                          </h4>
                          <p className="text-xs text-blue-500 font-semibold uppercase tracking-wider">
                            {promo.subtitle}
                          </p>
                        </div>

                        <p className="font-sans text-sm text-gray-500 leading-relaxed">
                          {promo.description}
                        </p>
                      </div>

                      {/* Price Display and Footer Button */}
                      <div className="p-6 sm:p-8 bg-[#F5F7FA] border-t border-gray-50 space-y-4 mt-auto">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Inversión Especial</p>
                            <div className="flex items-baseline gap-2 mt-0.5">
                              <span className="text-2xl font-heading font-black text-[#263238]">{promo.promoPrice}</span>
                              {promo.originalPrice && (
                                <span className="text-sm text-gray-400 line-through font-semibold">{promo.originalPrice}</span>
                              )}
                            </div>
                          </div>
                          <div className="text-right text-[11px] text-gray-400 font-medium">
                            <p>{promo.validity}</p>
                          </div>
                        </div>

                        {/* Immediate Action Trigger to populate booking form */}
                        <a
                          href={`https://wa.me/593968609865?text=Hola%20Inmedentec!%20Quisiera%20separar%20mi%20cupo%20para%20la%20promoción:%20${encodeURIComponent(promo.title)}.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-2 py-3 bg-[#0B5ED7] hover:bg-[#0D6EFD] text-white font-bold text-xs rounded-xl uppercase tracking-widest shadow transition-colors"
                        >
                          <span>Separar por WhatsApp</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 📷 CLINIC TOURS AND PHOTOGRAPHS GALLERY */}
      <ClinicGallery />

      {/* 💬 6. TESTIMONIALS CAROUSEL SECTION */}
      <section className="py-20 bg-[#F5F7FA] relative overflow-hidden" id="testimonios">
        <div className="absolute top-[20%] left-[-5%] w-60 h-60 bg-emerald-300/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
            <h2 className="font-heading font-black text-3xl text-[#263238] leading-tight">
              <AnimatedText 
                text="Lo Que Dicen Nuestros Pacientes Atendidos en Durán"
                highlightWords={["Pacientes", "Durán"]}
                highlightClass="text-[#0B5ED7]"
                delay={0.1}
              />
            </h2>
            <p className="font-sans text-gray-500">
              <AnimatedText 
                text="Cientos de testimonios reales respaldan la calidez de nuestro servicio clínico de asistencia."
                highlightWords={["testimonios", "calidez"]}
                highlightClass="text-[#21C58E] font-medium"
                delay={0.25}
              />
            </p>
          </div>

          {/* Testimonial Active Slider Slider Card wrapper */}
          <div className="max-w-2xl mx-auto relative group">
            
            <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-slate-100/80 shadow-2xl transition-all duration-300">
              
              {/* Stars layout estimation */}
              <div className="flex gap-1 mb-6 text-amber-400 justify-center">
                {Array.from({ length: TESTIMONIALS_DATA[testimonialIndex].rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400" />
                ))}
              </div>

              {/* Text quotation */}
              <blockquote className="text-center text-[#263238] font-sans italic text-base sm:text-lg leading-relaxed mb-8">
                "{TESTIMONIALS_DATA[testimonialIndex].text}"
              </blockquote>

              {/* Patient bio card */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-gradient-to-tr from-[#0B5ED7] to-[#21C58E] rounded-full flex items-center justify-center font-bold text-white text-base shadow-inner">
                  {TESTIMONIALS_DATA[testimonialIndex].name.charAt(0)}
                </div>
                <div className="text-center">
                  <cite className="font-heading font-extrabold text-sm text-[#263238] not-italic">
                    {TESTIMONIALS_DATA[testimonialIndex].name}
                  </cite>
                  <p className="text-xs text-gray-400">{TESTIMONIALS_DATA[testimonialIndex].city}</p>
                </div>

                <span className="mt-2 text-[10px] font-bold text-[#21C58E] bg-[#21C58E]/10 px-3 py-1 rounded-full uppercase tracking-widest border border-[#21C58E]/20">
                  {TESTIMONIALS_DATA[testimonialIndex].treatment}
                </span>
              </div>

            </div>

            {/* Slider Switch Interaction controls */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={handleTestimonialPrev}
                className="p-2.5 bg-white border border-gray-200 text-[#263238] hover:bg-[#0B5ED7] hover:text-white rounded-full transition-colors shadow shadow-sm active:scale-95 cursor-pointer"
                aria-label="Anterior testimonio"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-1.5" id="testimonial-indicators">
                {TESTIMONIALS_DATA.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTestimonialIndex(i)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      testimonialIndex === i ? "w-6 bg-[#0B5ED7]" : "w-2 bg-gray-300"
                    }`}
                    aria-label={`Ir al testimonio ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleTestimonialNext}
                className="p-2.5 bg-white border border-gray-200 text-[#263238] hover:bg-[#0B5ED7] hover:text-white rounded-full transition-colors shadow shadow-sm active:scale-95 cursor-pointer"
                aria-label="Siguiente testimonio"

              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ❓ 10. FAQ SECTION WITH INTERACTIVE COLLAPSIBLE ACCODRIONS */}
      <section id="preguntas" className="py-20 bg-[#F5F7FA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-xs font-bold text-[#0B5ED7] uppercase tracking-wider">
              <span>Resolviendo Inquietudes</span>
            </div>
            <h2 className="font-heading font-black text-3xl text-[#263238] leading-tight">
              <AnimatedText 
                text="Preguntas Frecuentes sobre el Servicio (FAQ)"
                highlightWords={["Preguntas", "Frecuentes"]}
                highlightClass="text-[#0B5ED7]"
                delay={0.1}
              />
            </h2>
            <p className="font-sans text-gray-500 max-w-xl mx-auto">
              <AnimatedText 
                text="Despeja tus dudas clínicas. Filtra de forma inmediata escribiendo tu duda abajo."
                highlightWords={["clínicas", "Filtra"]}
                highlightClass="text-[#21C58E] font-medium"
                delay={0.25}
              />
            </p>

            {/* Live Filter Bar for FAQS */}
            <div className="relative w-full max-w-md mx-auto pt-4">
              <input
                type="text"
                placeholder="Escribe palabras clave para filtrar preguntas comunes..."
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B5ED7] shadow-sm"
              />
              <Search className="absolute left-3.5 top-7 w-4.5 h-4.5 text-gray-400" />
            </div>
          </div>

          {/* Collapsible Accordion Grid */}
          <div className="space-y-4" id="faqs-accordion-list">
            {filteredFAQs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 hover:bg-gray-50/50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] uppercase font-extrabold text-[#0B5ED7] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                        {faq.category}
                      </span>
                      <h3 className="font-heading font-extrabold text-[#263238] text-sm md:text-base leading-snug">
                        {faq.question}
                      </h3>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 transition-transform duration-300 shrink-0 ${
                        isOpen ? "rotate-180 text-[#0B5ED7]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 font-sans text-xs md:text-sm text-gray-500 border-t border-gray-50 pt-4 leading-relaxed animate-fade-in">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 🗺️ CLINIC DETAILED MAP & DURATION SCHEDULE BLOCK */}
      <section className="py-20 bg-gradient-to-b from-white via-blue-50/10 to-[#F8FAFC]" id="contacto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Address specifics */}
            <div className="space-y-6">
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#263238]">Visítanos en Durán</h2>
              <p className="font-sans text-sm text-gray-500 leading-relaxed">
                Nuestra clínica ambulatoria de medicina familiar y odontología se encuentra estratégicamente ubicada en Durán, brindando facilidad de acceso a pacientes locales y de Guayaquil.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="w-5 h-5 text-[#21C58E] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Dirección Exacta:</p>
                    <p className="text-gray-500">Av. Abel Gilbert 231 y calle Sibambe, Durán, Guayas, Ecuador. Código Postal 092408.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm">
                  <Clock className="w-5 h-5 text-[#0B5ED7] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Horario de Operación:</p>
                    <p className="text-gray-500">
                      Lunes a Viernes: 08:30 a 19:00 hrs <br />
                      Sábados: 09:00 a 14:00 hrs
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm">
                  <Phone className="w-5 h-5 text-[#21C58E] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Teléfono & WhatsApp:</p>
                    <p className="text-[#0B5ED7] font-bold">Tel: +593 96 937 0655</p>
                    <p className="text-[#21C58E] font-bold">WhatsApp: +593 96 860 9865</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                <div className="bg-emerald-50 text-[#21C58E] p-2 rounded-lg text-xs font-bold">ATENCIÓN AMBULATORIA</div>
                <div className="bg-blue-50 text-[#0B5ED7] p-2 rounded-lg text-xs font-bold font-sans">ECUADOR PREVENTIVO</div>
              </div>
            </div>

            {/* Embedded interactive maps placeholder (gorgeous graphic look representational layout) */}
            <div className="bg-gray-100 rounded-3xl aspect-[16/10] overflow-hidden relative shadow-md border-4 border-white">
              {/* Representing Durán Map */}
              <div className="absolute inset-0 bg-[#E5E9F0]" />
              {/* Custom SVG stylized city roads Representation for aesthetics */}
              <svg className="absolute inset-0 w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
                <line x1="0" y1="100" x2="600" y2="100" stroke="#FFF" strokeWidth="6" />
                <line x1="0" y1="250" x2="600" y2="250" stroke="#FFF" strokeWidth="8" />
                <line x1="200" y1="0" x2="200" y2="400" stroke="#FFF" strokeWidth="8" />
                <line x1="450" y1="0" x2="450" y2="400" stroke="#FFF" strokeWidth="6" />
                <rect x="250" y="50" width="120" height="80" rx="10" fill="#21C58E" opacity="0.3" />
                <rect x="50" y="150" width="110" height="90" rx="10" fill="#0B5ED7" opacity="0.2" />
              </svg>

              {/* Pin pointing the clinic location */}
              <div className="absolute top-[180px] left-[320px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="p-3 bg-gradient-to-tr from-[#1E2A5E] to-[#00A9FF] text-white rounded-full shadow-lg relative animate-bounce z-10">
                  <Stethoscope className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#7DDAE8] rounded-full animate-ping" />
                </div>
                <div className="bg-white/95 px-3 py-1.5 rounded-xl shadow-lg border border-gray-100 text-[11px] font-black tracking-tight text-[#1E2A5E] mt-1 whitespace-nowrap">
                  Inmedentec Centro Médico (Durán)
                </div>
              </div>

              {/* Direct Link to Google Maps */}
              <div className="absolute bottom-4 right-4 z-20">
                <a
                  href="https://maps.google.com/?q=Av.+Abel+Gilbert+231+y+calle+Sibambe,+Duran,+Ecuador"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#263238] hover:bg-[#0B5ED7] text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-2 shadow"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Abrir en Google Maps</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 💬 FLOATING CHATBOT ENGINE BUTTON: BOTTOM RIGHT WIDGET */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none" id="floating-widgets">
        
        {/* Floating Gemini chatbot notification banner if offline/unread */}
        {showNotificationBadge && !isChatOpen && (
          <div className="pointer-events-auto bg-white rounded-2xl p-3 border border-gray-100 shadow-xl max-w-xs animate-fade-in flex items-start gap-2.5 relative">
            <button
              onClick={() => setShowNotificationBadge(false)}
              className="absolute -top-1.5 -right-1.5 p-0.5 bg-gray-200 hover:bg-gray-300 rounded-full text-gray-500"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <div className="w-2.5 h-2.5 rounded-full bg-[#0B5ED7] mt-1 shrink-0 animate-ping" />
            <div>
              <p className="text-xs font-bold text-[#263238]">¿Alguna inquietud médica?</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Nuestra Asistente de IA te orientará en tiempo real sobre coberturas y horarios.</p>
            </div>
          </div>
        )}

        {/* The Action buttons */}
        <div className="flex items-center gap-2 pointer-events-auto">
          
          {/* Button WhatsApp */}
          <a
            href="https://wa.me/593968609865?text=Hola%20Inmedentec!%20Deseo%20coordinar%20una%20revisión%20médica."
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 bg-[#21C58E] hover:bg-[#1EAF7E] text-white rounded-full flex items-center justify-center shadow-xl active:scale-95 transition-all duration-200"
            title="Soporte Médico Vía WhatsApp"
            id="floating-whatsapp"
          >
            <Phone className="w-7 h-7" />
          </a>

          {/* Button Interactive Chatbot Toggle */}
          <button
            onClick={() => {
              setIsChatOpen(!isChatOpen);
              setShowNotificationBadge(false);
            }}
            className="w-14 h-14 bg-[#0B5ED7] hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-xl active:scale-95 transition-all duration-200 cursor-pointer"
            id="floating-chatbot-trigger"
            aria-label="Abrir asistente de IA"
          >
            {isChatOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-7 h-7" />}
          </button>
        </div>

        {/* THE FLOATING INTERACTIVE CHAT DRAWER */}
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 30 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="pointer-events-auto w-[330px] sm:w-[380px] h-[500px] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col justify-between overflow-hidden"
              id="chatbot-drawer"
              role="complementary"
            >
            {/* Header */}
            <div className="bg-[#1E2A5E] p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl overflow-hidden bg-white border border-white/20">
                  <img 
                    src="https://i.ibb.co/wN2zzSsw/FB-IMG-1781954245363.jpg" 
                    alt="Logo Avatar" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div>
                  <h4 className="font-heading font-extrabold text-sm flex items-center gap-1.5">
                    <span>InmedentecBot</span>
                    <span className="w-2 h-2 rounded-full bg-[#7DDAE8] animate-pulse" />
                  </h4>
                  <p className="text-[10px] text-gray-200">Asistente Virtual IA • En Línea</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    setChatMessages([
                      {
                        id: "welcome-1",
                        role: "model",
                        text: "Se ha reiniciado el record de conversación. ¿En qué puedo asistirte ahora?",
                        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                      }
                    ]);
                    setCapturedLead({ name: "", phone: "", completed: false });
                    setWaitingForLeadStep("none");
                  }}
                  className="p-1 text-gray-400 hover:text-white hover:bg-white/10 rounded"
                  title="Reiniciar chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages Log */}
            <div className="flex-1 bg-gray-50/50 p-4 overflow-y-auto space-y-4 font-sans text-xs">
              
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 shadow-sm ${
                      msg.role === "user"
                        ? "bg-[#1E2A5E] text-white rounded-tr-none"
                        : "bg-white text-[#263238] rounded-tl-none border border-gray-100"
                    }`}
                  >
                    {/* Preserve linebreaks visually */}
                    <div className="whitespace-pre-line leading-relaxed">{msg.text}</div>
                    <p className="text-[9px] opacity-60 text-right mt-1.5">{msg.timestamp}</p>
                  </div>
                </div>
              ))}

              {/* Loader Loading placeholder */}
              {isChatSending && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-2xl p-3 border border-gray-100 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-[#00A9FF]" />
                    <span className="text-[10px] text-gray-400">InmedentecBot está pensando...</span>
                  </div>
                </div>
              )}

              <div ref={chatBottomRef} />
            </div>

            {/* Smart predefined question chips triggers */}
            <div className="bg-white px-3 py-2 border-t border-gray-50 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none" id="chips-triggers">
              <button
                onClick={() => handleBotChipClick("¿Cuáles son los tratamientos de odontología?")}
                className="bg-[#F5F7FA] hover:bg-blue-50 text-[10px] font-bold text-gray-600 hover:text-[#0B5ED7] px-3 py-1.5 rounded-full transition-colors cursor-pointer shrink-0"
              >
                🦷 Odontología
              </button>
              <button
                onClick={() => handleBotChipClick("¿Qué pruebas ginecológicas realizan?")}
                className="bg-[#F5F7FA] hover:bg-pink-50 text-[10px] font-bold text-gray-600 hover:text-pink-600 px-3 py-1.5 rounded-full transition-colors cursor-pointer shrink-0"
              >
                🌸 Ginecología
              </button>
              <button
                onClick={() => handleBotChipClick("¿Cuál es la dirección y teléfono?")}
                className="bg-[#F5F7FA] hover:bg-[#21C58E]/10 text-[10px] font-bold text-gray-600 hover:text-[#21C58E] px-3 py-1.5 rounded-full transition-colors cursor-pointer shrink-0"
              >
                📍 Ubicación exactas
              </button>
              <button
                onClick={() => handleBotChipClick("¿Cuáles son los costos referenciales?")}
                className="bg-[#F5F7FA] hover:bg-amber-50 text-[10px] font-bold text-gray-600 hover:text-amber-600 px-3 py-1.5 rounded-full transition-colors cursor-pointer shrink-0"
              >
                💵 Precios
              </button>
            </div>

            {/* Input Form Footer */}
            <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessageToBot();
                }}
                placeholder={
                  waitingForLeadStep === "name"
                    ? "Escribe tu Nombre..."
                    : waitingForLeadStep === "phone"
                    ? "Escribe tu Teléfono..."
                    : "Pregunta algo sobre Inmedentec..."
                }
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#00A9FF]"
              />
              
              <button
                onClick={() => sendMessageToBot()}
                disabled={!chatInput.trim() || isChatSending}
                className="p-2.5 bg-[#1E2A5E] hover:bg-[#1E2A5E]/90 disabled:bg-gray-300 text-white rounded-xl transition-colors cursor-pointer"
                title="Enviar mensaje"
              >
                <Send className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Powered by tag */}
            <div className="bg-gray-100/50 text-[9px] text-gray-400 text-center py-1 font-semibold uppercase tracking-wider">
              Asistencia de IA conectada • Durán
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      </div>

      {/* 🔮 GROUNDED FOOTER & TRUST CENTER */}
      <footer id="grounded-footer" className="relative bg-[#0B121F] border-t border-slate-800/80 text-slate-200 pt-10 pb-6 overflow-hidden">
        {/* Subtle background decorative shapes */}
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Main 2-Column Grounded Structured Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-8 border-b border-slate-800/80" id="footer-blocks">
            
            {/* Column 1: Brand Directory & Core Trust Seals (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl overflow-hidden border border-slate-700 bg-white p-0.5 shadow-md">
                  <img 
                    src="https://i.ibb.co/wN2zzSsw/FB-IMG-1781954245363.jpg" 
                    alt="Logo Inmedentec" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-lg" 
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading font-black text-xs text-[#00A9FF] uppercase tracking-wider leading-none">
                    Inmedentec Clínica Médica & Dental
                  </span>
                  <span className="font-sans font-medium text-[9px] text-gray-400 tracking-widest uppercase">
                    Salud Familiar • Durán
                  </span>
                </div>
              </div>
              
              <p className="font-sans text-xs text-slate-300 leading-relaxed max-w-xl">
                Clínica médico-dental especializada en <span className="italic text-white">Durán, Guayas</span>. Ofrecemos cuidado de la <span className="italic text-white font-medium">salud de alta calidad</span> mediante tecnología diagnóstica avanzada, odontología de alta gama, cardiología profesional, ecografías y laboratorio clínico con <span className="italic text-[#7DDAE8]">calidez</span>.
              </p>

              {/* Technical badges and Social Channels in one row for maximum compactness */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="flex gap-2">
                  <span className="inline-flex items-center gap-1 text-[9px] font-mono bg-slate-800/40 text-slate-300 border border-slate-700/40 px-2 py-0.5 rounded-md">
                    <ShieldCheck className="w-2.5 h-2.5 text-[#7DDAE8]" />
                    Registro ACESS
                  </span>
                  <span className="inline-flex items-center gap-1 text-[9px] font-mono bg-slate-800/40 text-slate-300 border border-slate-700/40 px-2 py-0.5 rounded-md">
                    <Award className="w-2.5 h-2.5 text-[#00A9FF]" />
                    Aprobado MSP
                  </span>
                </div>
                
                <span className="h-4 w-px bg-slate-800" />

                <div className="flex gap-2">
                  <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-7 h-7 rounded-md bg-slate-800/80 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-sm text-gray-400"
                    title="Imedent en Facebook"
                  >
                    <Facebook className="w-3.5 h-3.5" />
                  </a>
                  <a 
                    href="https://instagram.com/imedent_ec" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-7 h-7 rounded-md bg-slate-800/80 hover:bg-pink-600 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-sm text-gray-400"
                    title="Imedent en Instagram"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                  </a>
                  <a 
                    href="https://wa.me/593968609865?text=Hola%20Inmedentec!%20Quisiera%20solicitar%20asistencia%20en%20línea." 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-7 h-7 rounded-md bg-slate-800/80 hover:bg-[#21C58E] hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-sm text-gray-400"
                    title="Asistencia Virtual"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Column 2: Geolocalized Coordinates & Direct Hub (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <h4 className="font-heading font-extrabold text-[11px] uppercase tracking-wider text-slate-400 border-l border-[#21C58E] pl-2">
                Datos de Contacto
              </h4>
              
              <div className="space-y-3 text-xs font-sans text-gray-400">
                {/* Physical address with external directions map action */}
                <div className="flex gap-2 items-start bg-slate-800/20 p-2.5 rounded-xl border border-slate-800/50">
                  <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div className="space-y-0.5 shrink">
                    <p className="text-[#F5F7FA] font-bold text-xs">Imedent Durán</p>
                    <p className="text-[11px] leading-relaxed">Av. Abel Gilbert 231 y calle Sibambe, Durán, Guayas, Ecuador.</p>
                    <a 
                      href="https://maps.google.com/?q=Imedent+Dur%C3%A1n+Abel+Gilbert"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[10px] text-[#0B5ED7] hover:underline font-bold mt-1"
                    >
                      <span>Ver en Google Maps</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>

                {/* Dial action lines with badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="flex items-center justify-between bg-slate-800/10 hover:bg-slate-800/20 px-3 py-2 rounded-xl border border-slate-800/40 transition-colors">
                    <a href="tel:+593968609865" className="flex items-center gap-1.5 text-[#21C58E] hover:underline font-bold text-[11px]">
                      <Phone className="w-3 h-3" />
                      <span>+593 96 860 9865</span>
                    </a>
                  </div>
                  
                  <div className="flex items-center justify-between bg-slate-800/10 hover:bg-slate-800/20 px-3 py-2 rounded-xl border border-slate-800/40 transition-colors">
                    <a href="tel:+593969370655" className="flex items-center gap-1.5 text-white hover:underline font-bold text-[11px]">
                      <Phone className="w-3 h-3 text-blue-400" />
                      <span>+593 96 937 0655</span>
                    </a>
                  </div>
                </div>

                {/* Mail link */}
                <div className="flex items-center justify-between pt-1 text-[11px]">
                  <a 
                    href="mailto:imedentsa@gmail.com" 
                    className="flex items-center gap-1.5 hover:text-white transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-blue-400" />
                    <span>imedentsa@gmail.com</span>
                  </a>
                  <span className="text-[9px] font-mono text-gray-500">Respuesta en menos de 24h</span>
                </div>
              </div>
            </div>

          </div>

          {/* Pre-Copyright Sub-Grid & Dynamic Back to Top Trigger */}
          <div className="pt-4 pb-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-800/20">
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px]">Servicio en línea 100% verificado y conectado</span>
            </div>
            
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group inline-flex items-center gap-1.5 text-[11px] text-gray-400 hover:text-white font-bold bg-slate-800/60 hover:bg-slate-800 px-3.5 py-1.5 rounded-lg transition-all border border-slate-700/30 hover:border-slate-600/50 cursor-pointer"
              title="Volver al inicio"
            >
              <span>Subir al Inicio</span>
              <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Legal Compliance & Copyright Bottom Row */}
          <div className="pt-4 flex flex-col lg:flex-row items-center justify-between gap-4 text-center lg:text-left">
            <div className="space-y-0.5">
              <p className="text-[10px] text-gray-500 font-sans leading-normal">
                &copy; {new Date().getFullYear()} Inmedentec Clínica Médica & Dental. Todos los derechos reservados. No garantizamos diagnósticos finales a través de consultas virtuales; toda sugerencia del asistente virtual debe ser validada presencialmente por un médico titulado.
              </p>
              <p className="text-[9px] text-gray-600 font-mono">
                ACESS Reg. No. SL-2024-092-A • Durán, Guayas, República del Ecuador.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 text-[9px] text-gray-500 shrink-0">
              <a href="#" className="hover:text-white hover:underline transition-colors">Protección de Datos</a>
              <span className="text-slate-800">|</span>
              <a href="#contacto" className="hover:text-white hover:underline transition-colors">Términos de Cita</a>
              <span className="text-slate-800">|</span>
              <a href="#servicios" className="hover:text-white hover:underline transition-colors">Catálogo Completo</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
