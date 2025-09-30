"use client";

import React, { startTransition, useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FluviToast } from "../ui/FluviToast";
import { updateTheme } from "@/actions/profile/update-theme-action";
import { Palette } from "lucide-react";

type ThemeProfileProps = {
  theme: {
    id: number;
    primary: string;
    secondary: string;
  };
};
export default function ThemeProfile({ theme }: ThemeProfileProps) {
  const [themeData, setThemeData] = useState({
    primary: theme.primary,
    secondary: theme.secondary,
  });

  const updateThemeWithId = updateTheme.bind(null, theme.id);
  const [state, dispatch] = useActionState(updateThemeWithId, {
    errors: [],
    success: "",
    data: {
      primary: themeData.primary,
      secondary: themeData.secondary,
    },
  });

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => {
        toast.error(<FluviToast type={"error"} msg={error} />);
      });
    }

    if (state.success) {
      toast.success(<FluviToast type="success" msg={state.success} />, {});
    }
  }, [state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setThemeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
  const defaultTheme = {
    primary: "#E20F32",
    secondary: "#FFFFFD",
  };
  setThemeData(defaultTheme);
  
const formData = new FormData();
  formData.append("primary", defaultTheme.primary);
  formData.append("secondary", defaultTheme.secondary);

  // ✅ Envolver en transición
  startTransition(() => {
    dispatch(formData);
  });
};
  return (
    <div className="space-y-6">
      <div className="bg-surface-base p-6 rounded-md  border border-gray-200 ">
        <div className="mb-4 space-y-2">
          <div className="flex items-center gap-2 font-bold">
            <Palette className="size-6" strokeWidth={1.5} />
            Tema del Restaurante
          </div>
          <p className="text-sm text-gray-500">
            Personaliza los colores de tu app
          </p>
        </div>

        <div>
          <form action={dispatch} className="space-y-4">
            {/* Color Primario */}
            <div className="space-y-2">
              <label className="label-input" htmlFor="primary-color">
                Color Primario
              </label>
              <div className="flex items-center gap-3">
                <input
                  placeholder="Selecciona un color"
                  name="primary"
                  type="color"
                  value={themeData.primary}
                  onChange={handleChange}
                  className=" h-10 w-20 rounded-md focus:outline-none border p-2 border-gray-300 cursor-pointer"
                />
                <input
                  name="primary"
                  value={themeData.primary}
                  onChange={handleChange}
                  placeholder="#0ea5e9"
                  className=" border border-slate-300 p-2 text-sm rounded-md w-full focus:outline-none"
                />
              </div>
            </div>

            {/* Color Secundario */}
            <div className="space-y-2">
              <label className="label-input" htmlFor="secondary-color">
                Color Secundario
              </label>
              <div className="flex items-center gap-3">
                <input
                  placeholder="Selecciona un color"
                  name="secondary"
                  type="color"
                  value={themeData.secondary}
                  onChange={handleChange}
                  className=" h-10 w-20 rounded-md focus:outline-none border p-2 border-gray-300 cursor-pointer"
                />
                <input
                  name="secondary"
                  value={themeData.secondary}
                  onChange={handleChange}
                  placeholder="#0ea5e9"
                  className=" border border-slate-300 p-2 text-sm rounded-md w-full focus:outline-none"
                />
              </div>
            </div>

            <hr className="text-gray-300" />

            {/* Vista previa */}
            <div className="space-y-3">
              <label className="label-input">Vista Previa</label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div
                    className="p-3 border border-slate-200 rounded-full text-white"
                    style={{ backgroundColor: themeData.primary }}
                  ></div>
                  <p className="text-xs text-gray-800">Color Primario</p>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="p-3 border border-slate-200 rounded-full text-black"
                    style={{ backgroundColor: themeData.secondary }}
                  ></div>
                  <p className="text-xs text-gray-800">Color Secundario</p>
                </div>
              </div>
            </div>

            <div>
              <button type="submit" className="btn w-full">
                Aplicar Tema
              </button>

              <button
                type="button"
                onClick={handleReset}
                className=" shadow-xs text-white bg-brand-primary py-2 rounded-md text-sm cursor-pointer transition-all w-full mt-2 hover:bg-neutral-700"
              >
                Reestablecer Tema
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Información adicional */}
      <div className="bg-surface-base p-6 rounded-md  border border-gray-200 ">
        <div>
          <p className="text-sm font-bold mb-3">Consejos</p>
        </div>
        <div className="space-y-3 text-xs text-gray-600">
          <div className="flex items-start gap-2">
            <div className="p-1 rounded-full bg-brand-primary mt-1.5" />
            <p>
              El color primario se aplica a elementos interactivos, como botones
              e íconos principales, para resaltar acciones importantes.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <div className="p-1 rounded-full bg-brand-primary mt-1.5" />
            <p>
              El color secundario se utiliza en fondos y elementos decorativos
              para complementar la identidad visual de la app.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <div className="p-1 rounded-full bg-brand-primary mt-1.5" />
            <p>
              Elige colores que representen tu marca y garanticen una lectura
              clara en todos los dispositivos.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <div className="p-1 rounded-full bg-brand-primary mt-1.5" />
            <p>
              Se recomienda un logotipo cuadrado para una visualización óptima
              en la plataforma.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <div className="p-1 rounded-full bg-brand-primary mt-1.5" />
            <p>
              La imagen principal será visible en la app móvil y debe estar
              optimizada para un formato vertical.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
