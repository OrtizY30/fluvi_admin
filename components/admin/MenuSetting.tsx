"use client";
import { Settings } from "lucide-react";
import NavSubItem from "../ui/NavSubItem";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

type MenuItem = {
  label: string;
  link: string;
};

const productItems: MenuItem[] = [
  { label: "Información del negocio", link: "setting-business" },
  { label: "Qr-code", link: "qr-code" },

];
export default function MenuSetting() {
  return (
    <>
      <Accordion
        disableGutters // <-- PROPIEDAD CLAVE: Elimina los márgenes automáticos al expandirse
        elevation={0}
        sx={{
          boxShadow: "none",
          border: "none",
          "&:before": { display: "none" },
          background: "transparent",
          m: 0,
          p: 0,
          // Forzamos que no haya margen extra al expandirse
          "&.Mui-expanded": {
            margin: 0,
          },
        }}
      >
        <AccordionSummary
          sx={{
            m: 0,
            p: 0,
            minHeight: 0, // <-- Elimina la altura mínima por defecto
            "& .MuiAccordionSummary-content": {
              m: 0,
              p: 0,
            },
            // Evita que el contenido se mueva al expandirse
            "& .MuiAccordionSummary-content.Mui-expanded": {
              margin: 0,
            },
            // Evita que el contenedor del icono de expansión cambie de tamaño
            "&.Mui-expanded": {
              minHeight: 0,
            },
          }}
          expandIcon={<ExpandMore sx={{ color: 'white' }} />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          {/* Tu contenido actual */}
          <div className="flex items-center justify-between w-full px-3 py-2 rounded-lg">
            <div className="flex w-full text-white font-bold items-center gap-3 text-sm transition-all">
              <Settings className="size-5" />
              <p>Configuraciones</p>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            m: 0,
            p: 0,
            pb: 1, // Un pequeño padding inferior suele verse mejor que el margen negativo
          }}
        >
          <ul className="ml-6 transition-all mt-1 space-y-2 border-l border-white text-xs pl-3">
            {productItems.map((item) => (
              <li key={item.label}>
                <NavSubItem link={item.link} label={item.label} />
              </li>
            ))}
          </ul>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
