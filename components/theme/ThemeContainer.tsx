"use client";

import { updateTheme } from "@/actions/profile/update-theme-action";
import React, {
  startTransition,
  useActionState,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "react-toastify";
import { FluviToast } from "../ui/FluviToast";
import { Theme } from "@/src/schemas";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";

type ThemeProfileProps = {
  theme: Theme;
};
export default function ThemeContainer({ theme }: ThemeProfileProps) {
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const [formData, setFormData] = useState({
    fontColor: theme.fontColor || "",
    otherColors: theme.otherColors || "",
    discountColor: theme.discountColor || "",
    buttonBgColor: theme.buttonBgColor || "",
    buttonTextColor: theme.buttonTextColor || "",
    backgroundColor: theme.backgroundColor || "",
    cardContrastColor: theme.cardContrastColor || "",
  });

  const updateThemeWithId = updateTheme.bind(null, theme.id);
  const [state, dispatch, isPending] = useActionState(updateThemeWithId, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => {
        toast.error(<FluviToast type={"error"} msg={error} />);
      });
    }

    if (state.success) {
      toast.success(<FluviToast type="success" msg={state.success} />, {});
      router.refresh();
    }
  }, [state, router]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;

      // actualizar el formData local
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      // limpiar debounce previo
      if (debounceRef.current) clearTimeout(debounceRef.current);

      // disparar el update al backend con el campo cambiado
      debounceRef.current = setTimeout(() => {
        const fd = new FormData();
        fd.append(name, String(value)); // 👈 el backend recibe { [name]: value }
        startTransition(() => {
          dispatch({ [name]: value });
        });
      }, 2000);
    },
    [dispatch]
  );

  const handleReset = () => {
    const defaultTheme = {
      fontColor: "#262626",
      otherColors: "#99a1af",
      discountColor: "#e20a33",
      buttonBgColor: "#e20a33",
      buttonTextColor: "#ffffff",
      backgroundColor: "#f3f4f6",
      cardContrastColor: "#ffffff",
    };
    setFormData(defaultTheme);

    // ✅ Envolver en transición
    startTransition(() => {
      dispatch(formData);
    });
  };
  return (
    <div className="space-y-6 p-2 md:p-10 md:pt-4 ">
      <button
        onClick={handleReset}
        disabled={isPending}
        type="button"
        className="rounded-lg cursor-pointer bg-blue-600 text-white w-32 h-10 font-bold "
      >
        {isPending ? (
          <CircularProgress size={"20px"} sx={{ color: "white" }} />
        ) : (
          "Reiniciar"
        )}
      </button>
      <div className="flex flex-col gap-3 w-full shadow-md rounded-xl md:p-6 p-2 bg-white border border-gray-200">
        <p className="text-xl font-bold ">General</p>

        <div className="flex md:flex-col gap-1 md:gap-6">
          <div className="flex flex-col gap-1">
            <label
              className="md:text-md text-sm  text-gray-800"
              htmlFor="primary-color"
            >
              Color de fuentes
            </label>
            <div className="flex items-center gap-3">
              <input
                placeholder="Selecciona un color"
                name="fontColor"
                type="color"
                value={formData.fontColor ?? ""}
                onChange={handleChange}
                className=" border border-gray-200 p-1 h-10 w-14 appearance-none rounded-md focus:outline-none  cursor-pointer"
              />
              <input
                name="fontColor"
                value={formData.fontColor ?? ""}
                onChange={handleChange}
                placeholder="#0ea5e9"
                className=" border border-slate-300 p-2 text-sm rounded-md w-full focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label
              className="md:text-md text-sm  text-gray-800"
              htmlFor="primary-color"
            >
              Color de fuentes secundarias
            </label>
            <div className="flex items-center gap-3">
              <input
                placeholder="Selecciona un color"
                name="otherColors"
                type="color"
                value={formData.otherColors ?? ""}
                onChange={handleChange}
                className=" border border-gray-200 p-1 h-10 w-14 appearance-none rounded-md focus:outline-none  cursor-pointer"
              />
              <input
                name="otherColors"
                value={formData.otherColors ?? ""}
                onChange={handleChange}
                placeholder="#0ea5e9"
                className=" border border-slate-300 p-2 text-sm rounded-md w-full focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full shadow-md rounded-xl md:p-6 p-2 bg-white border border-gray-200">
        <p className="text-xl font-bold ">Botones</p>

        <div className="flex md:flex-col gap-1 md:gap-6">
          <div className="flex flex-col gap-1">
            <label
              className="md:text-md text-sm  text-gray-800"
              htmlFor="primary-color"
            >
              Color de fondo
            </label>
            <div className="flex items-center gap-3">
              <input
                placeholder="Selecciona un color"
                name="buttonBgColor"
                type="color"
                value={formData.buttonBgColor ?? ""}
                onChange={handleChange}
                className=" border border-gray-200 p-1 h-10 w-14 appearance-none rounded-md focus:outline-none  cursor-pointer"
              />
              <input
                name="buttonBgColor"
                value={formData.buttonBgColor ?? ""}
                onChange={handleChange}
                placeholder="#0ea5e9"
                className=" border border-slate-300 p-2 text-sm rounded-md w-full focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label
              className="md:text-md text-sm  text-gray-800"
              htmlFor="primary-color"
            >
              Color de fuente
            </label>
            <div className="flex items-center gap-3">
              <input
                placeholder="Selecciona un color"
                name="buttonTextColor"
                type="color"
                value={formData.buttonTextColor ?? ""}
                onChange={handleChange}
                className=" border border-gray-200 p-1 h-10 w-14 appearance-none rounded-md focus:outline-none  cursor-pointer"
              />
              <input
                name="buttonTextColor"
                value={formData.buttonTextColor ?? ""}
                onChange={handleChange}
                placeholder="#0ea5e9"
                className=" border border-slate-300 p-2 text-sm rounded-md w-full focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label
              className="md:text-md text-sm  text-gray-800"
              htmlFor="primary-color"
            >
              Color de botones simples y descuentos
            </label>
            <div className="flex items-center gap-3">
              <input
                placeholder="Selecciona un color"
                name="discountColor"
                type="color"
                value={formData.discountColor ?? ""}
                onChange={handleChange}
                className=" border border-gray-200 p-1 h-10 w-14 appearance-none rounded-md focus:outline-none  cursor-pointer"
              />
              <input
                name="discountColor"
                value={formData.discountColor ?? ""}
                onChange={handleChange}
                placeholder="#0ea5e9"
                className=" border border-slate-300 p-2 text-sm rounded-md w-full focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full shadow-md rounded-xl md:p-6 p-2 bg-white border border-gray-200">
        <p className="text-xl font-bold ">Fondo</p>

        <div className="flex gap-6 flex-col justify-start">
          <div className="flex md:flex-col gap-1">
            <label
              className="md:text-md text-sm  text-gray-800"
              htmlFor="primary-color"
            >
              Color de fondo
            </label>
            <div className="flex items-center gap-3">
              <input
                placeholder="Selecciona un color"
                name="backgroundColor"
                type="color"
                value={formData.backgroundColor ?? ""}
                onChange={handleChange}
                className=" border border-gray-200 p-1 h-10 w-14 appearance-none rounded-md focus:outline-none  cursor-pointer"
              />
              <input
                name="backgroundColor"
                value={formData.backgroundColor ?? ""}
                onChange={handleChange}
                placeholder="#0ea5e9"
                className=" border border-slate-300 p-2 text-sm rounded-md w-full focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label
              className="md:text-md text-sm  text-gray-800"
              htmlFor="primary-color"
            >
              Color de tarjetas
            </label>
            <div className="flex items-center gap-3">
              <input
                placeholder="Selecciona un color"
                name="cardContrastColor"
                type="color"
                value={formData.cardContrastColor ?? ""}
                onChange={handleChange}
                className=" border border-gray-200 p-1 h-10 w-14 appearance-none rounded-md focus:outline-none  cursor-pointer"
              />
              <input
                name="cardContrastColor"
                value={formData.cardContrastColor ?? ""}
                onChange={handleChange}
                placeholder="#0ea5e9"
                className=" border border-slate-300 p-2 text-sm rounded-md w-full focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
