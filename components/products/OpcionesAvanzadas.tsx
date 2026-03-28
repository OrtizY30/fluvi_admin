"use client";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Switch,
  TextField,
  InputAdornment,
  inputBaseClasses,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { WrenchScrewdriverIcon } from "@heroicons/react/16/solid";
import { Product } from "@/src/schemas";
import OpenDrawerModifiersGroup from "../modifiersGroup/OpenDrawerModifiersGroup";
import { useModifiersStore } from "@/store/useModifiersStore";
import ModifiersDetail from "../modifiersGroup/Modifiers/ModifiersDetail";
import RecipeManager from "../inventory/RecipeManager";
type modifiersGroup = {
  id: number;
  name: string;
  modifiers: {
    id: number;
    name: string;
    price: number | null;
    discount?: number | undefined;
  }[];
  required: boolean;
  position: number;
  maxSelections: number;
};
type FormData = {
  name: string;
  price: number;
  description: string;
  image: string;
  isOnSale: boolean;
  discount: number;
  modifiers: number[];
  modifiersGroup: modifiersGroup[];
};

type Props = {
  modifiers: number[];
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  formData: FormData;
  product: Product;
};

export default function OpcionesAvanzadas({
  setFormData,
  formData,
  onChange,
  product,
}: Props) {
  const [expanded, setExpanded] = useState(false);

  const modifiersGroup = useModifiersStore((state) => state.modifierGroups);

  return (
    <div className="space-y-12 pb-24">
      {/* Sección: Estado de Venta / Ofertas */}
      <section className="space-y-6">
        <div className="flex items-center gap-4 border-l-[6px] border-[#E20A33] pl-6 py-1">
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-gray-800 mb-1">
              Estado de Venta
            </h2>
            <span className="text-[10px] text-gray-400 font-inter font-semibold uppercase tracking-widest">
              Pricing & Discounts
            </span>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[35px] border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest block mb-1">
                Producto en oferta
              </label>
              <p className="text-[10px] text-gray-400 font-medium">
                Activa precios especiales por tiempo limitado
              </p>
            </div>

            <Switch
              name="isOnSale"
              checked={formData.isOnSale}
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: "#E20A33",
                  "&:hover": { backgroundColor: "rgba(226, 10, 51, 0.08)" },
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "#E20A33",
                },
              }}
              onChange={(e) => {
                const checked = e.target.checked;
                setFormData((prev: FormData) => ({
                  ...prev,
                  isOnSale: checked,
                }));

                onChange({
                  target: {
                    name: "isOnSale",
                    value: checked ? "true" : "false",
                    type: "checkbox",
                    checked,
                  },
                } as unknown as React.ChangeEvent<HTMLInputElement>);
              }}
            />
          </div>

          {formData.isOnSale && (
            <div className="pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
              <TextField
                type="number"
                fullWidth
                variant="outlined"
                name="discount"
                label="Precio en Oferta"
                placeholder="0.00"
                value={formData.discount}
                onChange={onChange}
                size="small"
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "16px",
                    bgcolor: "white",
                  },
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <span className="text-rose-600 font-bold">$</span>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </div>
          )}
        </div>
      </section>

      {/* Sección: Modificadores */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-4 border-l-[6px] border-gray-300 pl-6 py-1">
            <div className="flex flex-col">
              <h2 className="text-sm font-black text-gray-800 uppercase tracking-[0.2em] leading-none mb-1">
                Modificadores
              </h2>
              <span className="text-[10px] text-gray-400 font-inter font-bold uppercase tracking-widest">
                Extras & Accompaniments
              </span>
            </div>
          </div>
          <OpenDrawerModifiersGroup />
        </div>

        <div className="grid grid-cols-1 gap-4">
          {modifiersGroup.map((group) => (
            <div key={group.id} className="relative group/mod transition-all">
              <ModifiersDetail product={product} modifiersGroup={group} />
            </div>
          ))}

          {modifiersGroup.length === 0 && (
            <div className="py-8 text-center bg-white border border-dashed border-gray-200 rounded-[24px]">
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
                Sin modificadores vinculados
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Sección: Receta */}
      <section className="space-y-6">
        <div className="flex items-center gap-4 border-l-[6px] border-gray-300 pl-6 py-1">
          <div className="flex flex-col">
            <h2 className="text-sm font-black text-gray-800 uppercase tracking-[0.2em] leading-none mb-1">
              Gestor de Receta
            </h2>
            <span className="text-[10px] text-gray-400 font-inter font-bold uppercase tracking-widest">
              Inventory & Cost Control
            </span>
          </div>
        </div>
        <RecipeManager
          productId={product.id}
          initialRecipe={product.recipeItems}
          productPrice={formData.price}
        />
      </section>
    </div>
  );
}
