"use client";
import { Package } from "lucide-react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import NavSubItem from "../ui/NavSubItem";

type MenuItem = {
  label: string;
  link: string;
};

const inventoryItems: MenuItem[] = [
  { label: "Control de stock", link: "inventario" },
  { label: "Movimientos", link: "inventario/movimientos" },
];

export default function MenuInventory() {
  return (
    <>
      <Accordion
        sx={{
          boxShadow: "none",
          border: "none",
          "&:before": { display: "none" },
          background: "transparent",
          borderRadius: 0,
          m: 0,
          p: 0,
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
          expandIcon={<ExpandMore sx={{ color: "white" }} />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div className="flex items-center justify-between w-full px-3 py-2 rounded-lg ">
            <div className="flex w-full text-white font-bold items-center gap-3 text-sm  transition-all">
              <Package className="size-5" />
              <p>Inventario</p>
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
            {inventoryItems.map((item) => (
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
