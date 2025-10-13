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
import { HexColorPicker } from "react-colorful";
import { Popover } from "@headlessui/react";

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
    (e: { target: { name: string; value: string } }) => {
      const { name, value } = e.target;

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      if (debounceRef.current) clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(() => {
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
    startTransition(() => {
      dispatch(defaultTheme);
    });
  };

  const ColorField = ({
    label,
    name,
    value,
    placeholder,
  }: {
    label: string;
    name: string;
    value: string;
    placeholder: string;
  }) => (
    <div className="flex flex-col gap-1">
      <label className="md:text-md text-sm text-gray-800">{label}</label>
      <div className="flex items-center gap-3">
        <Popover className="relative">
          <Popover.Button
            className="border border-gray-200 p-1 h-10 w-14 rounded-md focus:outline-none cursor-pointer"
            style={{ backgroundColor: value }}
          />
          <Popover.Panel className="absolute z-20 mt-2 rounded-xl shadow-lg border bg-white p-2">
            <HexColorPicker
              color={value ?? ""}
              onChange={(color) =>
                handleChange({ target: { name: name, value: color } })
              }
            />
          </Popover.Panel>
        </Popover>
        <input
          name={name}
          value={value ?? ""}
          onChange={handleChange}
          placeholder={placeholder}
          className="border border-slate-300 p-2 text-sm rounded-md w-full focus:outline-none"
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-6 p-2 pb-20 md:p-10 md:pt-4">
      <button
        onClick={handleReset}
        disabled={isPending}
        type="button"
        className="rounded-lg cursor-pointer bg-blue-600 text-white w-32 h-10 font-bold"
      >
        {isPending ? (
          <CircularProgress size={"20px"} sx={{ color: "white" }} />
        ) : (
          "Reiniciar"
        )}
      </button>

      {/* General */}
      <div className="flex flex-col gap-3 w-full shadow-md rounded-xl md:p-6 p-2 bg-white border border-gray-200">
        <p className="text-xl font-bold">General</p>
        <div className="flex flex-col md:flex-row gap-6">
          <ColorField
            label="Color de fuentes"
            name="fontColor"
            value={formData.fontColor}
            placeholder="#0ea5e9"
          />
          <ColorField
            label="Color de fuentes secundarias"
            name="otherColors"
            value={formData.otherColors}
            placeholder="#0ea5e9"
          />
        </div>
      </div>

      {/* Botones */}
      <div className="flex flex-col gap-3 w-full shadow-md rounded-xl md:p-6 p-2 bg-white border border-gray-200">
        <p className="text-xl font-bold">Botones</p>
        <div className="flex flex-col md:flex-row gap-6">
          <ColorField
            label="Color de fondo"
            name="buttonBgColor"
            value={formData.buttonBgColor}
            placeholder="#0ea5e9"
          />
          <ColorField
            label="Color de fuente"
            name="buttonTextColor"
            value={formData.buttonTextColor}
            placeholder="#0ea5e9"
          />
          <ColorField
            label="Color de botones simples y descuentos"
            name="discountColor"
            value={formData.discountColor}
            placeholder="#0ea5e9"
          />
        </div>
      </div>

      {/* Fondo */}
      <div className="flex flex-col gap-3 w-full shadow-md rounded-xl md:p-6 p-2 bg-white border border-gray-200">
        <p className="text-xl font-bold">Fondo</p>
        <div className="flex flex-col md:flex-row gap-6">
          <ColorField
            label="Color de fondo"
            name="backgroundColor"
            value={formData.backgroundColor}
            placeholder="#0ea5e9"
          />
          <ColorField
            label="Color de tarjetas"
            name="cardContrastColor"
            value={formData.cardContrastColor}
            placeholder="#0ea5e9"
          />
        </div>
      </div>
    </div>
  );
}
