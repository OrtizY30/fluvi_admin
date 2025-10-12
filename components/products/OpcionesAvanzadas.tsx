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
  }
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
    <Accordion
      sx={{
        borderRadius: 4,
        border: "1px solid #dddfe3",
        "&::before": { display: "none" },
      }}
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <div className="flex items-center gap-3">
          <WrenchScrewdriverIcon className="size-7 text-gray-700" />
          <div className="flex flex-col">
            <p className="label-input">Opciones Avanzadas</p>
            <p className="text-xs text-gray-600 mt-1">
              Descuentos y modificadores para el producto
            </p>
          </div>
        </div>
      </AccordionSummary>

      <AccordionDetails sx={{ borderRadius: 4 }}>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <label className="label-input">Producto en oferta</label>
              <p className="text-xs text-gray-600">
                Activa si el producto tiene descuento 
              </p>
            </div>

            <Switch
              name="isOnSale"
              checked={formData.isOnSale}
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
            <div>
              <TextField
                type="number"
                className="w-full"
                id="outlined-basic"
                variant="outlined"
                name="discount"
                label="Precio en oferta"
                value={formData.discount}
                onChange={onChange}
                size="small"
                sx={{
                  backgroundColor: "#f8fafc",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 4,
                  },
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{
                          opacity: 0,
                          pointerEvents: "none",
                          [`[data-shrink=true] ~ .${inputBaseClasses.root} > &`]:
                            {
                              opacity: 1,
                            },
                        }}
                      >
                        <span className="text-gray-500 text-lg">$</span>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </div>
          )}

          <div className="space-y-4">
            <div className="flex w-full items-center justify-between">
              <div>
                <label className="label-input">Modificadores</label>
                <p className="text-xs text-gray-600 mt-0">
                  Adiciones, salsas, extras, etc.
                </p>
              </div>
              <OpenDrawerModifiersGroup />
            </div>

            {modifiersGroup.map((group) => (
              <ModifiersDetail
                key={group.id}
                product={product}
                modifiersGroup={group}
              />
            ))}
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
