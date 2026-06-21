import { Service, Benefit, Promo, Testimonial, FAQItem, BlogPost } from "./types";

export const SERVICES_DATA: Service[] = [
  {
    id: "med-gen",
    name: "Medicina General",
    specialty: "medicina",
    description: "Consulta médica para niños, adultos y adultos mayores.",
    iconName: "Medicina",
    duration: "30 min",
    priceEstimate: "Clínica Familiar Durán"
  },
  {
    id: "med-eco",
    name: "Ecografías Especializadas",
    specialty: "medicina",
    description: "Ecografías y ultrasonidos digestivos, pélvicos, obstétricos e informes médicos al instante.",
    iconName: "Ecografia",
    duration: "20 min",
    priceEstimate: "Resultados Inmediatos"
  },
  {
    id: "med-lab",
    name: "Exámenes de Laboratorio Clínico",
    specialty: "medicina",
    description: "Análisis clínicos completos de sangre, orina, glucosa y perfiles hormonales rápidos.",
    iconName: "Examenes",
    duration: "15 min",
    priceEstimate: "Resultados Seguros"
  },
  {
    id: "med-card",
    name: "Cardiología & Control de Presión",
    specialty: "medicina",
    description: "Evaluación del corazón con electrocardiograma para prevenir riesgos cardiovasculares.",
    iconName: "Cardiologia",
    duration: "30 min",
    priceEstimate: "Incluye EKG"
  },
  {
    id: "odont-gen",
    name: "Odontología General & Profilaxis",
    specialty: "odontologia",
    description: "Limpieza dental ultrasónica indolorosa, profilaxis, calzas y prevención familiar de caries.",
    iconName: "Odontologia",
    duration: "45 min",
    priceEstimate: "Tecnología sin dolor"
  }
];

export const BENEFITS_DATA: Benefit[] = [
  {
    id: "ben-1",
    title: "Profesionales certificados",
    description: "",
    iconName: "ShieldCheck",
    highlightText: ""
  },
  {
    id: "ben-2",
    title: "Equipos modernos",
    description: "",
    iconName: "Cpu",
    highlightText: ""
  },
  {
    id: "ben-3",
    title: "Atención integral",
    description: "",
    iconName: "UserCheck",
    highlightText: ""
  },
  {
    id: "ben-4",
    title: "Atención cercana y personalizada",
    description: "",
    iconName: "MapPin",
    highlightText: ""
  }
];

export const PROMOS_DATA: Promo[] = [
  {
    id: "promo-chequeo",
    title: "Chequeo Familiar",
    subtitle: "Consulta + glucosa",
    discount: "",
    originalPrice: "",
    promoPrice: "$35",
    description: "Consulta + glucosa",
    validity: "",
    specialty: "medicina",
    badge: "Chequeo Familiar"
  },
  {
    id: "promo-eco",
    title: "Pack de Ecografías",
    subtitle: "Abdomen + pelvis",
    discount: "",
    originalPrice: "",
    promoPrice: "$40",
    description: "Abdomen + pelvis",
    validity: "",
    specialty: "medicina",
    badge: "Ecografías"
  },
  {
    id: "promo-dental",
    title: "Profilaxis Completa",
    subtitle: "Limpieza + pulido",
    discount: "",
    originalPrice: "",
    promoPrice: "$20",
    description: "Limpieza + pulido",
    validity: "",
    specialty: "odontologia",
    badge: "Dental"
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "test-1",
    name: "Estefanía Carvajal",
    city: "Durán, Abel Gilbert",
    rating: 5,
    text: "La atención en Imedent Centro Médico es espectacular. El doctor me atendió por medicina general y me mandó los exámenes de laboratorio ahí mismo. Es muy cómodo hacer todo en un solo lugar y muy económico.",
    avatarSeed: "Estefania",
    treatment: "Consulta Medicina General"
  },
  {
    id: "test-2",
    name: "Dr. Alejandro Rivera",
    city: "Guayaquil, San Marino",
    rating: 5,
    text: "Por mi trabajo viajo mucho a Durán. Vine para hacerme un electrocardiograma preventivo por cardiología y una ecografía. El servicio es sumamente rápido y los informes médicos son muy claros. Recomendado 100%.",
    avatarSeed: "Alejandro",
    treatment: "Cardiología & Ecografías de Control"
  },
  {
    id: "test-3",
    name: "Mónica Sotomayor",
    city: "Durán, El Recreo",
    rating: 5,
    text: "Excelente clínica para toda la familia. Llevé a mi abuelito para chequeo de hipertensión (cardiología) y la limpieza dental de mi hijo. Todo el personal es sumamente cariñoso, profesional y atento.",
    avatarSeed: "Monica",
    treatment: "Odontología & Chequeo Hipertensión"
  },
  {
    id: "test-4",
    name: "Ing. Pablo Endara",
    city: "Durán, Centro",
    rating: 5,
    text: "Fui por una ecografía abdominal y me sorprendieron las instalaciones nuevas del centro médico. Los resultados me llegaron súper rápido a mi correo. Un servicio impecable y transparente.",
    avatarSeed: "Pablo",
    treatment: "Ecografía Diagnóstica Abdominal"
  }
];

export const FAQS_DATA: FAQItem[] = [
  {
    id: "faq-1",
    question: "¿Cuáles son los horarios de atención?",
    answer: "Atendemos de lunes a viernes de 8:00 a 18:00 y sábados de 8:00 a 14:00.",
    category: "General"
  },
  {
    id: "faq-2",
    question: "¿Cómo puedo reservar una cita?",
    answer: "Puede reservar directamente en nuestra web ingresando al formulario o vía WhatsApp.",
    category: "General"
  },
  {
    id: "faq-3",
    question: "¿Qué métodos de pago aceptan?",
    answer: "Aceptamos efectivo, transferencias bancarias directas y tarjetas de débito o crédito.",
    category: "General"
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "post-1",
    title: "Hipertensión: El Enemigo Silencioso y Cómo Prevenirlo",
    excerpt: "Conoce por qué el monitoreo preventivo de tu presión arterial y un electrocardiograma oportuno pueden salvar vidas en adultos y jóvenes.",
    slug: "hipertension-prevencion-cardiovascular",
    image: "https://images.unsplash.com/photo-1579684389782-64d84b5e902a?auto=format&fit=crop&q=80&w=600",
    category: "Bienestar",
    readTime: "4 min de lectura",
    date: "18 de Junio, 2026",
    content: "La hipertensión arterial constituye una de las principales afecciones cardiovasculares silenciosas en el Ecuador. En Imedent Centro Médico ayudamos a los pacientes a monitorear su presión arterial de forma adecuada y tomar electrocardiogramas (EKG) de control."
  },
  {
    id: "post-2",
    title: "La Importancia de las Ecografías en el Diagnóstico Temprano",
    excerpt: "Desde el examen del hígado graso hasta el control de la salud pélvica, descubre cómo los ultrasonidos guían soluciones médicas sin dolor.",
    slug: "importancia-ecografia-diagnostico-temprano",
    image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=600",
    category: "Salud Familiar",
    readTime: "5 min de lectura",
    date: "10 de Junio, 2026",
    content: "Las ecografías son técnicas diagnósticas por imagen no invasivas e indoloras. Permiten analizar en tiempo real los órganos internos como la vesícula, el hígado, riñones o el útero."
  },
  {
    id: "post-3",
    title: "Limpieza Dental Ultrasonido: Mucho Más que Sonreír",
    excerpt: "El sarro acumulado es el causante de sangrado de encías y pérdida dental. Aprende por qué la profilaxis ultrasónica es segura y necesaria.",
    slug: "limpieza-dental-ultrasonido-segura",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600",
    category: "Salud Bucal",
    readTime: "3 min de lectura",
    date: "02 de Junio, 2026",
    content: "La acumulación del cálculo dental o sarro duro no puede ser retirada por la cerda del cepillo tradicional. Requiere el uso de raspadores de ultrasonido."
  }
];
