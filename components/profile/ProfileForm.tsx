"use client";
import { updateProfile } from "@/actions/profile/update-profile-action";
import { CameraAltOutlined } from "@mui/icons-material";
import React, { useActionState, useEffect } from "react";
import ImageProfileUpload from "./ImageProfileUpload";
import LogoProfileUpload from "./LogoProfileUpload";
import { toast } from "react-toastify";
import { FluviToast } from "../ui/FluviToast";
import { useUserStore } from "@/store/useUserStore";
import { Save, UserRound } from "lucide-react";

export default function ProfileForm() {
  const user = useUserStore((state) => state.user);
  const business = user?.business;
  const [state, dispatch] = useActionState(updateProfile, {
    errors: [],
    success: "",
    data: {
      name: business?.name || "",
      description: business?.description || "",
      image: business?.image || "",
      logo: business?.logo || "",
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
  return (
    <div className="lg:col-span-2">
      <div className="p-6 rounded-md shadow-md border border-gray-100  ">
        <div>
          <div className="flex items-center text-lg gap-2 font-bold">
            <UserRound strokeWidth={2} className="size-6" />
            Información del Restaurante
          </div>
          <p className="text-sm  text-gray-500">
            Actualiza la información básica de tu restaurante
          </p>
        </div>
        <div className="mt-6">
          <form action={dispatch} className="space-y-6">
            {/* Nombre del Restaurante */}
            <div className="space-y-2">
              <label htmlFor="name" className="label-input">
                Nombre del Restaurante
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="input"
                defaultValue={state.data.name || business?.name || ""}
                placeholder="Ingresa el nombre de tu restaurante"
              />
            </div>

            {/* Descripción */}
            <div className="space-y-2 flex flex-col">
              <label className="label-input" htmlFor="description">
                Descripción
              </label>
              <textarea
                className="focus:outline-none border border-gray-300 rounded-md p-2"
                name="description"
                id="description"
                defaultValue={
                  state.data.description || business?.description || ""
                }
                placeholder="Describe tu restaurante..."
                rows={4}
              />
            </div>

            {/* Imagen Principal */}
            <ImageProfileUpload
              image={state.data.image || business?.image || ""}
            />
            <div className="rounded-lg bg-blue-50 p-3">
              <div className="flex items-start gap-2">
                <CameraAltOutlined
                  fontSize="small"
                  className=" text-blue-600 mt-0.5"
                />
                <div className="text-xs text-blue-800">
                  <p className="font-medium">Recomendación de imagen:</p>
                  <p>
                    Usa formato vertical de <strong>1080 x 1920 px</strong>{" "}
                    (ideal para celulares)
                  </p>
                </div>
              </div>
            </div>

            {/* Logo del Restaurante */}
            <LogoProfileUpload
              image={state.data.logo || business?.logo || ""}
            />

            <button
              type="submit"
              className="btn-form flex justify-center w-full"
            >
              <Save className="4" strokeWidth={1.5} />
              Guardar Perfil
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
