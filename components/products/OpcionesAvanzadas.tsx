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
import {  useState } from "react";
import { WrenchScrewdriverIcon } from "@heroicons/react/16/solid";
import { useUserStore } from "@/store/useUserStore";
import { Product } from "@/src/schemas";
import OpenDrawerModifiersGroup from "../modifiersGroup/OpenDrawerModifiersGroup";
import { useModifiersStore } from "@/store/useModifiersStore";
import ModifiersDetail from "../modifiersGroup/Modifiers/ModifiersDetail";

type Props = {
  modifiers: number[];
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  formData: {
    name: string;
    price: number;
    description: string;
    image: string;
    isOnSale: boolean;
    discount: number;
    modifiers: number[];
  };
  product: Product;
};

export default function OpcionesAvanzadas({
  setFormData,
  formData,
  onChange,
  product,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const user = useUserStore((state) => state.user);

  const modifiersGroup = useModifiersStore((state) => state.modifierGroups);

  return (
    <Accordion
      sx={{
        // backgroundColor: "#eeeff0",
        // mt: 2,
        borderRadius: 4, // como los inputs
        // boxShadow: "1px 1px 4px gray",
        border: "1px solid #dddfe3", // similar al borde del input
        "&::before": { display: "none" }, // quita línea superior
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

      <AccordionDetails
        sx={{
          borderRadius: 4,
        }}
      >
        <div className="space-y-6">
          {/* Switch para producto en oferta */}
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
                setFormData((prev: Partial<Product>) => ({
                  ...prev,
                  isOnSale: !prev.isOnSale,
                }));

                // si quieres que dispare el mismo handler que otros inputs:
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

          {/* Campo de descuento */}
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
                    borderRadius: 4, // aquí se aplica el borderRadius al input
                  },
                }}
                slotProps={{
                  input: {
                    // 👈 aquí lo cambiamos

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
                        <span className=" text-gray-500 text-lg">$</span>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </div>
          )}

          {/* Checkboxes de grupos de adiciones */}
          <div className="space-y-4">
            <div className="flex w-full items-center justify-between">
              <div className="">
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
