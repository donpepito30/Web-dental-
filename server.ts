import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory store for demonstrations and persistence of bookings in the session
const bookings: Array<{
  id: string;
  name: string;
  email: string;
  phone: string;
  specialty: string;
  service: string;
  date: string;
  timeSlot: string;
  comments?: string;
  status: "Pendiente" | "Confirmada";
  createdAt: string;
}> = [
  {
    id: "BK-1002",
    name: "María Fernanda Lopez",
    email: "maria.lopez@example.com",
    phone: "0991234567",
    specialty: "medicina",
    service: "Medicina Familiar",
    date: "2026-06-25",
    timeSlot: "10:30",
    comments: "Chequeo de rutina anual",
    status: "Confirmada",
    createdAt: new Date().toISOString()
  }
];

// Lazy Gemini Client Initialization to prevent crash if key is missing
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!geminiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("⚠️ Warning: GEMINI_API_KEY environment variable is not set. Chatbot will run in offline mode.");
      return null;
    }
    try {
      geminiClient = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    } catch (err) {
      console.error("❌ Failed to initialize GoogleGenAI client:", err);
      return null;
    }
  }
  return geminiClient;
}

// 🩺 API Routes

// 1. Get current bookings (useful for client validation)
app.get("/api/bookings", (req, res) => {
  res.json({ success: true, count: bookings.length, data: bookings });
});

// 2. Schedule a new appointment
app.post("/api/bookings", (req, res) => {
  const { name, email, phone, specialty, service, date, timeSlot, comments } = req.body;

  if (!name || !email || !phone || !specialty || !service || !date || !timeSlot) {
    return res.status(400).json({
      success: false,
      message: "Por favor complete todos los campos obligatorios para agendar su cita."
    });
  }

  // Check if same slot is taken (basic conflict check)
  const isDuplicate = bookings.some(
    (b) => b.date === date && b.timeSlot === timeSlot && b.specialty === specialty
  );

  if (isDuplicate) {
    return res.status(409).json({
      success: false,
      message: "Este horario ya se encuentra ocupado. Por favor, selecciona otra hora o fecha."
    });
  }

  const newBooking = {
    id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
    name,
    email,
    phone,
    specialty,
    service,
    date,
    timeSlot,
    comments,
    status: "Pendiente" as const,
    createdAt: new Date().toISOString()
  };

  bookings.push(newBooking);

  res.status(201).json({
    success: true,
    message: "¡Cita agendada de forma exitosa! Se ha registrado como Pendiente de confirmación.",
    data: newBooking
  });
});

// 3. Gemini Chatbot Assistant handler
app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ success: false, message: "Mensaje vacío." });
  }

  const ai = getGeminiClient();
  const systemInstruction = `
Eres "ImedentBot", un asistente virtual altamente profesional, empático y servicial para "Imedent Centro Médico" en Durán, Ecuador.
Tu objetivo es guiar a pacientes sobre los servicios de Medicina General / Familiar, Ecografías Especializadas, Análisis de Laboratorio, Cardiología y Odontología General, responder inquietudes, y motivarles de forma cálida a registrar su cita en el formulario de la página o derivarlos a nuestro canal de WhatsApp.

INFORMACIÓN COMPLETA DE IMEDENT:
1. Ubicación Física: Av. Abel Gilbert 231 y calle Sibambe, Durán, Guayas, Ecuador. Código Postal 092408.
2. WhatsApp oficial: +593 96 860 9865. Teléfono: +593 96 937 0655.
3. Horario de Atención: Lunes a Viernes de 08:30 a 19:00 y Sábados de 09:00 a 14:00.
4. Servicios Especializados:
   - Medicina General y Familiar: Diagnóstico clínico de niños, adultos y adultos mayores, control de presión, asma, diabetes.
   - Ecografías Especializadas: Ecografía abdominal, ginecológica, pélvica, de mama, obstétrica, tiroidea.
   - Exámenes de Laboratorio Clínico: Hemogramas, glucosa, colesterol, triglicéridos, orina, heces, pruebas hormonales.
   - Cardiología Clínica: Consulta cardiológica especializada, electrocardiogramas (EKG), control de hipertensión arterial.
   - Odontología General y Estética: Profilaxis ultrasónica, calzas de resina de alta estética, extracciones, restauración y prótesis dentales.
5. Personalización y Captura de Contactos (Lead Qualifying):
   - Si el usuario te pregunta por precios, coberturas o quiere agendar directamente contigo, pídele muy amablemente su Nombre y Teléfono de contacto.
   - Si te lo da, agradécele y dile que un asesor humano le contactará pronto para finalizar, pero invítale a usar el formulario interactivo en esta misma página web para una reserva inmediata.
6. Directrices de Comunicación:
   - Responde siempre en español fluido, usando tono moderno, elegante, cálido y comprensivo.
   - Usa un formato estructurado en tus respuestas con viñetas elegantes cuando detalles servicios o pasos. No satures con párrafos gigantescos.
   - Si el usuario muestra miedo u otra emoción ante la cita médica, valida su sentimiento de inmediato: "Entiendo perfectamente tus dudas o recelos de acudir al médico/odontólogo, pero en Imedent Centro Médico nos enfocamos en una atención 100% personalizada, indolora y cercana para toda la familia durandeña".
   - Si no tienes la respuesta o la pregunta es altamente especializada/quirúrgica, sugiere contactar a nuestro equipo médico o de atención vía WhatsApp al +593 96 860 9865 o agendar una cita de evaluación.
`;

  if (!ai) {
    // Elegant fallback simulation if API key is not present
    let fallbackText = "¡Hola! Bienvenido a Imedent Centro Médico en Durán. Actualmente estoy operando en modo de consulta de soporte de contingencia.\n\n";
    const lower = message.toLowerCase();

    if (lower.includes("odont") || lower.includes("dient") || lower.includes("dentis") || lower.includes("limp")) {
      fallbackText += "Ofrecemos servicios de **Odontología de primer nivel**: profilaxis ultrasónica, diagnóstico, restauración estética y calzas de resina. ¿Te gustaría agendar un chequeo dental familiar?";
    } else if (lower.includes("eco") || lower.includes("ultraso") || lower.includes("abdomen") || lower.includes("tiroid")) {
      fallbackText += "Contamos con el servicio de **Ecografías Especializadas** (abdominales, ginecológicas, pélvicas, de mama, obstétricas y tiroides) con informes detallados y precisos al instante. ¿Deseas agendar tu estudio?";
    } else if (lower.includes("lab") || lower.includes("analis") || lower.includes("sangr") || lower.includes("exame")) {
      fallbackText += "Realizamos todos los **Análisis Clínicos y de Laboratorio** (sangre, orina, heces, perfil lipídico, hormonal, etc.) con resultados garantizados. ¿Quieres agendar una toma de muestras?";
    } else if (lower.includes("cardio") || lower.includes("coraz") || lower.includes("electro") || lower.includes("hiper")) {
      fallbackText += "Tenemos la especialidad de **Cardiología Clínica** con consulta especializada y electrocardiogramas (EKG) de lectura profesional. ¿Necesitas un control de tu salud cardiovascular?";
    } else if (lower.includes("medici") || lower.includes("famil") || lower.includes("doctor") || lower.includes("consul")) {
      fallbackText += "Nuestra consulta de **Medicina General y Familiar** está orientada a la prevención y diagnóstico rídigo para todas las edades de la población de Durán. ¿Deseas agendar tu consulta?";
    } else if (lower.includes("horar") || lower.includes("cuando") || lower.includes("atend")) {
      fallbackText += "Atendemos de **Lunes a Viernes de 08:30 a 19:00** y los **Sábados de 09:00 a 14:00**.";
    } else if (lower.includes("donde") || lower.includes("ubic") || lower.includes("direcc")) {
      fallbackText += "Estamos ubicados en Durán, Guayas: **Av. Abel Gilbert 231 y calle Sibambe**, al lado del acceso principal de fácil tránsito.";
    } else {
      fallbackText += "¡Con mucho gusto te oriento! Ofrecemos consulta de Medicina Familiar, Ecografías Especializadas, Laboratorio, Cardiología clínica y Odontología integral en Durán. Puedes usar nuestro formulario interactivo en la pantalla para reservar tu turno en tiempo real. ¿Cómo te llamas y a qué número de WhatsApp te podemos escribir?";
    }
    return res.json({ success: true, response: fallbackText, model: "offline-fallback" });
  }

  try {
    // Construct conversation using history or contents safely with strict turn alternations
    // History looks like Array<{ role: 'user'|'model', text: string }>
    const contents: any[] = [];
    let lastRole: string | null = null;
    
    // Add history
    if (history && Array.isArray(history)) {
      history.forEach((h: any) => {
        const text = (h.text || "").trim();
        if (!text) return; // skip empty messages
        
        const currentRole = h.role === "user" ? "user" : "model";
        
        // Rule 1: The conversation must start with a 'user' message.
        if (contents.length === 0 && currentRole !== "user") {
          return; // skip if the first message is 'model'
        }
        
        // Rule 2: Strict role alternation (no consecutive same roles)
        if (currentRole === lastRole) {
          // Append text to the previous message parts to avoid consecutive identical roles
          const prevContent = contents[contents.length - 1];
          if (prevContent && prevContent.parts && prevContent.parts[0]) {
            prevContent.parts[0].text += "\n" + text;
          }
        } else {
          contents.push({
            role: currentRole,
            parts: [{ text }]
          });
          lastRole = currentRole;
        }
      });
    }

    // Add current message (must be "user")
    const currentMsgText = (message || "").trim();
    if (currentMsgText) {
      if (lastRole === "user" && contents.length > 0) {
        // If the last message was also user, combine them to maintain alternation
        contents[contents.length - 1].parts[0].text += "\n" + currentMsgText;
      } else {
        contents.push({
          role: "user",
          parts: [{ text: currentMsgText }]
        });
      }
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        topP: 0.9,
      }
    });

    const reply = response.text || "Disculpas, he tenido un inconveniente procesando tu solicitud. Por favor contáctanos por WhatsApp al +593 96 860 9865 o intenta nuevamente.";
    res.json({ success: true, response: reply, model: "gemini-3.5-flash" });
  } catch (error: any) {
    console.error("❌ Gemini API Error:", error);
    res.status(500).json({
      success: false,
      message: "Error de comunicación con el consultor de IA.",
      error: error.message
    });
  }
});

// 🗺️ SEO & Sitemaps Endpoints
app.get("/sitemap.xml", (req, res) => {
  res.header("Content-Type", "application/xml");
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://imedent.ec/</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://imedent.ec/#servicios</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://imedent.ec/#beneficios</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://imedent.ec/#promociones</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://imedent.ec/#reserva</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://imedent.ec/#blog</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>`);
});

app.get("/robots.txt", (req, res) => {
  res.header("Content-Type", "text/plain");
  res.send(`User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://imedent.ec/sitemap.xml`);
});


// 🚀 Vite Middleware & Static files serving

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("🛠️ Vite middleware mounted in active dev development mode.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Imedent Centro Médico App Server running actively on http://localhost:${PORT}`);
  });
}

startServer();
