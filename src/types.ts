export interface Service {
  id: string;
  name: string;
  specialty: "odontologia" | "medicina";
  description: string;
  iconName: string; // matches lucide icon name
  longerDetails?: string;
  prepInfo?: string;
  duration: string;
  priceEstimate?: string;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  iconName: string;
  highlightText: string;
}

export interface Promo {
  id: string;
  title: string;
  subtitle: string;
  discount: string;
  originalPrice?: string;
  promoPrice: string;
  description: string;
  validity: string;
  specialty: "odontologia" | "medicina";
  badge: string;
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  rating: number;
  text: string;
  avatarSeed: string;
  treatment: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "Odontología" | "Medicina" | "General";
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  image: string;
  category: "Salud Bucal" | "Salud Familiar" | "Bienestar";
  readTime: string;
  date: string;
  content: string;
}

export interface Appointment {
  id?: string;
  name: string;
  email: string;
  phone: string;
  specialty: string;
  service: string;
  date: string;
  timeSlot: string;
  comments?: string;
  status?: string;
  createdAt?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: string;
}
