import { Service, Benefit, Promo, Testimonial, FAQItem, BlogPost } from "./types";

export const SERVICES_DATA: Service[] = [
  {
    id: "med-gen",
    name: "Medicina General",
    specialty: "medicina",
    description: "Consulta médica integral familiar, diagnóstico oportuno de dolencias comunes y manejo de patologías generales para todas las edades.",
    longerDetails: "Nuestra consulta de Medicina General brinda acompañamiento clínico completo. Atendemos problemas de salud agudos y crónicos, realizamos chequeos físicos preventivos de rutina, emitimos certificados de salud oficiales y damos orientación médica de cabecera con alto estándar de calidez humana.",
    iconName: "Medicina",
    duration: "30 - 45 min",
    priceEstimate: "Clínica Familiar Durán"
  },
  {
    id: "med-eco",
    name: "Ecografías Especializadas",
    specialty: "medicina",
    description: "Ultrasonidos diagnósticos: ecografía abdominal, pélvica, de partes blandas, tiroides e informes médicos interpretados de inmediato.",
    longerDetails: "Equipos de ecografía de alta definición operados por médicos de amplia trayectoria. Realizamos valoraciones visuales internas precisas de órganos pélvicos, útero, ovarios, vías urinarias y tiroides, asegurando un informe inmediato acompañado de interpretación profesional.",
    iconName: "Ecografia",
    duration: "20 - 30 min",
    priceEstimate: "Resultados Inmediatos"
  },
  {
    id: "med-lab",
    name: "Exámenes de Laboratorio Clínico",
    specialty: "medicina",
    description: "Pruebas bioquímicas completas, hemogramas, glucosa, perfil lipídico, hepático, renal, orina y cultivos microbiológicos.",
    longerDetails: "Análisis clínicos bajo estrictas normas de bioseguridad. Ofrecemos perfiles integrales de prevención que incluyen control lipídico (colesterol/triglicéridos), pruebas de glucosa para control de diabetes, análisis de orina y coprológicos con entrega rápida por correo electrónico.",
    iconName: "Examenes",
    duration: "15 - 20 min",
    priceEstimate: "Resultados Seguros"
  },
  {
    id: "med-card",
    name: "Cardiología & Control de Presión",
    specialty: "medicina",
    description: "Valoración cardiovascular, electrocardiograma (EKG) computarizado, prevención de riesgo coronario e hipertensión.",
    longerDetails: "Chequeo preventivo del corazón enfocado en identificar latidos atípicos, arritmias y evaluar la presión arterial sistemática. Incluye la toma e interpretación clínica de electrocardiograma (EKG) de última generación por médicos capacitados.",
    iconName: "Cardiologia",
    duration: "30 - 45 min",
    priceEstimate: "Incluye EKG"
  },
  {
    id: "odont-gen",
    name: "Odontología General & Profilaxis",
    specialty: "odontologia",
    description: "Limpieza profunda por ultrasonido, resinas estéticas, prevenciones de caries, restauraciones cómodas sin dolor.",
    longerDetails: "Tratamientos dentales modernos enfocados en devolver salud, estética y funcionalidad a tu sonrisa. Empleamos restauraciones con resinas biológicamente compatibles alineadas al tono del diente y profilaxis con ultrasonidos indoloros.",
    iconName: "Odontologia",
    duration: "45 - 60 min",
    priceEstimate: "Tecnología sin dolor"
  }
];

export const BENEFITS_DATA: Benefit[] = [
  {
    id: "ben-1",
    title: "Medicina Familiar & Diagnóstico",
    description: "Atención unificada en consulta familiar, laboratorios, ecografías y cardiología. Todo lo que tu familia necesita agrupado con el mayor cuidado.",
    iconName: "ShieldCheck",
    highlightText: "Atención Multifuncional"
  },
  {
    id: "ben-2",
    title: "Equipos Tecnológicos Digitales",
    description: "Uso de ecógrafos de alta definición, electrocardiogramas modernos y laboratorios de respuesta rápida para tranquilidad inmediata de tu salud.",
    iconName: "Cpu",
    highlightText: "Diagnósticos Precisos"
  },
  {
    id: "ben-3",
    title: "Staff Médico Certificado",
    description: "Médicos graduados y licenciados en constante capacitación, con registro y acreditación del Ministerio de Salud Pública de Ecuador.",
    iconName: "UserCheck",
    highlightText: "Acompañamiento Profesional"
  },
  {
    id: "ben-4",
    title: "Excelente Ubicación en Durán",
    description: "Nos encontramos en Av. Abel Gilbert 231 y calle Sibambe, Durán, Guayas, Ecuador. Fácil acceso con parqueo y transporte conveniente.",
    iconName: "MapPin",
    highlightText: "Durán / Guayaquil"
  }
];

export const PROMOS_DATA: Promo[] = [
  {
    id: "promo-chequeo",
    title: "Chequeo Clínico Familiar",
    subtitle: "Consulta + Glucosa + Perfil de Rutina",
    discount: "Ahorra $25",
    originalPrice: "$60",
    promoPrice: "$35",
    description: "Consulta de Medicina General con evaluación física de rutina más análisis básicos de glucosa de laboratorio clínico. Ideal para descartar diabetes y prediabetes.",
    validity: "Válido hasta finales de este mes",
    specialty: "medicina",
    badge: "Más Solicitado"
  },
  {
    id: "promo-eco",
    title: "Pack de Ecografías Especiales",
    subtitle: "Abdomen + Pélvica de Control",
    discount: "Ahorra $20",
    originalPrice: "$60",
    promoPrice: "$40",
    description: "Diagnóstico visual interno mediante ecografía de alta resolución de órganos abdominales y pélvicos. Incluye informe médico con interpretación del profesional.",
    validity: "Válido únicamente para reservas previas",
    specialty: "medicina",
    badge: "Diagnóstico Clave"
  },
  {
    id: "promo-dental",
    title: "Sonrosa Radiante Profilaxis",
    subtitle: "Limpieza Ultrasonido + Pulido",
    discount: "Ahorra $15",
    originalPrice: "$35",
    promoPrice: "$20",
    description: "Elimina de forma eficaz cálculos de sarro duro inaccesibles al cepillado habitual con equipo ultrasónico indoloro y pulido con pasta flúor profiláctica.",
    validity: "Cupos limitados por semana",
    specialty: "odontologia",
    badge: "Estética Básica"
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
    question: "¿Dónde se encuentra ubicado Imedent Centro Médico?",
    answer: "Estamos ubicados en la Av. Abel Gilbert 231 y calle Sibambe, en Durán, Guayas, Ecuador (cerca de Guayaquil, código postal 092408). Ofrecemos parqueo fácil y transporte directo en el sector.",
    category: "General"
  },
  {
    id: "faq-2",
    question: "¿Cuáles son los métodos de contacto y agendamiento?",
    answer: "Puedes agendar por vía telefónica convencional a nuestro número principal +593 96 937 0655 o mandarnos un mensaje rápido por WhatsApp al +593 96 860 9865. Atendemos de forma proactiva tus consultas.",
    category: "General"
  },
  {
    id: "faq-3",
    question: "¿Qué tipo de ecografías realizan en el centro médico?",
    answer: "Ofrecemos ecografías diagnósticas pélvica, obstétrica, abdominal completa (hígado, vesícula, páncreas, riñones), partes blandas, tiroides y controles con informe médico e interpretación inmediata por el profesional calificado.",
    category: "Medicina"
  },
  {
    id: "faq-4",
    question: "¿Tienen convenios para exámenes de laboratorio clínico?",
    answer: "Sí, poseemos un catálogo completo de análisis de sangre, orina, perfil de colesterol, exámenes preventivos, hormonales y coprológicos. Entregamos tus resultados directamente a tu correo electrónico personal en menos de 24 horas.",
    category: "Medicina"
  },
  {
    id: "faq-5",
    question: "¿Ofrecen tratamientos dentales en el centro médico?",
    answer: "Sí, contamos con el servicio de Odontología General. Realizamos profilaxis (limpieza profunda por ultrasonido) sin dolor, calzas con resina estética de alta duración, extracciones dentales simples y prevención odontológica familiar.",
    category: "Odontología"
  },
  {
    id: "faq-6",
    question: "¿Cómo contactar a través de redes sociales?",
    answer: "Puedes mantenerte al día con todas nuestras campañas preventivas de salud familiar, paquetes mensuales y consejos prácticos en salud siguiéndonos en nuestra cuenta oficial de Instagram imedent_ec.",
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
    content: "La hipertensión arterial constituye una de las principales afecciones cardiovasculares silenciosas en el Ecuador. En Imedent Centro Médico ayudamos a los pacientes a monitorear su presión arterial de forma adecuada y tomar electrocardiogramas (EKG) de control. El diagnóstico proactivo, junto con una alimentación equilibrada baja en sodio y actividad física de rutina, disminuye sustancialmente el riesgo de infarto agudo de miocardio."
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
    content: "Las ecografías son técnicas diagnósticas por imagen no invasivas e indoloras. Permiten analizar en tiempo real los órganos internos como la vesícula, el hígado, riñones o el útero. Son sumamente recomendadas anualmente para descartar colelitiasis (cálculos en la vesícula), evaluar quistes ováricos, miomas, y descartar alteraciones que requieran medicamentos tempranos o procedimientos menores."
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
    content: "La acumulación del cálculo dental o sarro duro no puede ser retirada por la cerda del cepillo tradicional. Requiere el uso de raspadores de ultrasonido, los cuales vibran de forma milimétrica para fracturar la placa bacteriana dura que produce gingivitis y mal aliento crónico. En Imedent Centro Médico ofrecemos una experiencia suave para mantener dientes limpios y sanos en una sesión rápida."
  }
];
