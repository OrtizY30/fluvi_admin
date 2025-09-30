"use client";
import { Cog, GalleryVerticalEnd, Settings } from "lucide-react";
import NavSubItem from "../ui/NavSubItem";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

type MenuItem = {
  label: string;
  link: string;
};

const productItems: MenuItem[] = [
  { label: "Información del negocio", link: "setting-business" },
  { label: "Qr-code", link: "Qr-code" },

];
export default function MenuSetting() {
  return (
    <>
      <Accordion
        sx={{
          boxShadow: "none", // sin sombra
          border: "none", // sin borde
          "&:before": { display: "none" }, // quita la línea superior que mete MUI
          background: "transparent", // sin fondo
          borderRadius: 0, // sin esquinas redondeadas
          m: 0, // sin márgenes
          p: 0, // sin padding
        }}
      >
        <AccordionSummary
          sx={{
            m: 0,
           py: 1,
            px: 0,
            minHeight: "auto",
            "& .MuiAccordionSummary-content": {
              m: 0,
              p: 0,
            },
          }}
          expandIcon={<ExpandMore sx={{color: 'white'}} />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div className="flex items-center justify-between w-full px-3 py-2 rounded-lg ">
            <div className="flex w-full text-white font-bold items-center gap-3 text-sm  transition-all">
            
              <Settings className="size-5"/>
              <p>Configuraciones</p>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            m: 0,
            mt: -2,
            p: 0,
          }}
        >
          <ul
            className={` ml-6 transition-all mt-1 space-y-2 border-l border-white text-xs  pl-3 `}
          >
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
