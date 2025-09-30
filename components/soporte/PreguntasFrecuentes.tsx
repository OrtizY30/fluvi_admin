"use client";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function PreguntasFrecuentes() {
 const faqData = [
  {
    id: 1,
    category: "general",
    question: "¿Qué es Fluvi?",
    answer:
      "Fluvi es una plataforma que ayuda a simplificar los pedidos por WhatsApp, reduciendo errores y mejorando la eficiencia operativa del restaurante.",
    tags: ["fluvi", "pedidos", "eficiencia"],
  },
  {
    id: 2,
    category: "general",
    question: "¿Cómo funciona Fluvi?",
    answer:
      "Creas tu menú digital desde el panel de administración, lo compartes con tus clientes y ellos hacen sus pedidos por WhatsApp. Todo se gestiona sin complicaciones.",
    tags: ["funcionamiento", "menú", "whatsapp"],
  },
  {
    id: 3,
    category: "facturacion",
    question: "¿Qué pasa si no cancelo mi suscripción a tiempo?",
    answer:
      "Tienes un plazo de 5 días para cancelar el pago de tu suscripción. Si no lo haces, tu cuenta será suspendida temporalmente hasta regularizar el pago.",
    tags: ["suscripción", "facturación", "plazo"],
  },
  {
    id: 4,
    category: "funcionalidades",
    question: "¿Cómo funciona la app del menú?",
    answer:
      "El restaurante envía el enlace de la app al cliente. El cliente lo abre, revisa los productos, elige lo que desea y al finalizar es redirigido automáticamente a WhatsApp para enviar el pedido.",
    tags: ["menú", "cliente", "flujo"],
  },
  {
    id: 5,
    category: "funcionalidades",
    question: "¿Cómo agrego un producto?",
    answer:
      "Desde tu panel de administración puedes hacer clic en 'Agregar producto', antes de agregar un producto asegurate de haber creado por lo menos una categoría, llenar los detalles como nombre, precio, descripción y subir una imagen. Guardas y estará disponible en tu menú.",
    tags: ["productos", "panel", "gestión"],
  },
  {
    id: 6,
    category: "planes",
    question: "¿Qué beneficios me trae tener un dominio propio?",
    answer:
      "Tener un dominio propio te da una presencia profesional y fácil de recordar. Con el plan Pro también puedes agregar las sucursales que desees, permitiendo a tus clientes elegir la más cercana. Ideal para cadenas o restaurantes con varias ubicaciones.",
    tags: ["dominio", "pro", "sucursales"],
  },
  {
    id: 7,
    category: "facturacion",
    question: "¿Debo pagar comisiones por ventas?",
    answer:
      "No, Fluvi no cobra ninguna comisión por ventas. Solo pagas una suscripción mensual fija según el plan que elijas.",
    tags: ["comisiones", "ventas", "pagos"],
  },
  {
    id: 8,
    category: "marketing",
    question: "¿Cómo puedo hacer que mi menú sea más visible?",
    answer:
      "Puedes compartir tu menú en redes sociales, agregarlo a tus historias o biografía de Instagram, e incluirlo en mensajes automáticos de WhatsApp para aumentar el alcance.",
    tags: ["visibilidad", "marketing", "redes sociales"],
  },
  {
    id: 9,
    category: "recomendaciones",
    question: "¿Qué consejos me dan para mejorar la experiencia del cliente?",
    answer:
      "Desde Fluvi recomendamos crear un mensaje de WhatsApp automático que incluya el enlace a tu app de menú, facilitando el acceso rápido para tus clientes.",
    tags: ["consejos", "experiencia", "automatización"],
  },
  {
    id: 10,
    category: "general",
    question: "¿Qué diferencia a Fluvi de otras plataformas?",
    answer:
      "Fluvi está 100% enfocado en pedidos por WhatsApp, sin apps complicadas ni comisiones. Te da el control completo de tu menú, productos y comunicación directa con tus clientes.",
    tags: ["comparación", "fluvi", "ventajas"],
  },
   {
    id: 11,
    category: "funcionalidades",
    question: "¿Qué son los complementos?",
    answer:
      "Los complementos son opciones adicionales que puedes agregar a un producto, como salsas, toppings o extras. Esto permite personalizar cada pedido según el gusto del cliente.",
    tags: ["complementos", "extras", "personalización"],
  },
   {
    id: 12,
    category: "cuenta",
    question: "¿Cómo puedo actualizar mis datos?",
    answer:
      "Puedes solicitar cambios desde el panel de administración o contactando a soporte. Los datos sensibles como email, dominio o número celular requieren aprobación del equipo de Fluvi y pueden tardar hasta 24 horas en ser actualizados.",
    tags: ["cuenta", "datos", "actualización", "seguridad"],
  },
];

  return (
    <div className="shadow-md max-w-7xl mx-auto rounded-md border border-gray-100">
      <div className=" p-6">
        <p className="text-xl font-bold">Preguntas Frecuentes</p>
        <p className="text-sm text-gray-500 ">
          Respondemos tus dudas más comunes
        </p>
      </div>

      {faqData.map((item, index) => (
        <Accordion key={index} sx={{}}>
          <AccordionSummary  expandIcon={<ExpandMoreIcon />}>
          <div>

            <p className="text-xl font-semibold">{item.question}</p>

            <div className="flex gap-1 mt-1">
              {item.tags.map((tag, index) => (
                <span
                key={index}
                  className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded"
                >
                  {tag}
                </span>
              ))}
                  </div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <p className="text-md text-slate-500 font-semibold">
              {item.answer}
            </p>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
