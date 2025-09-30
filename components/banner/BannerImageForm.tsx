"use client";

import { uploadBanner } from "@/actions/profile/upload-banner-action";
import { CldUploadWidget } from "next-cloudinary";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { FluviToast } from "../ui/FluviToast";
import { ImagePlus, Info } from "lucide-react";

type BannerImageUploadProps = {
  imageUrl: string;
  setImageUrl: (url: string) => void;
}
export default function BannerImageForm({imageUrl, setImageUrl}: BannerImageUploadProps) {
const [state, dispatch] = useActionState(uploadBanner, {
    errors: [],
    success: "",
    data: {
      banner: imageUrl || "",
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
    <CldUploadWidget
      uploadPreset="Fluvi-app"
      options={{
        maxFiles: 1,
        cropping: true, // ✅ Activa recorte
        multiple: false, // importante
        croppingAspectRatio: 9 / 16, // Opcional: 9/16 = vertical
        showSkipCropButton: false, // Opcional: fuerza al usuario a recortar
      }}
      onSuccess={(result, { widget }) => {
        if (result.event === "success") {
          widget.close();
          // @ts-expect-error Prop temporarily missing types
          setImageUrl(result.info?.secure_url);
        }
      }}
    >
      {({ open }) => (
        <>
          <form action={dispatch} id="banner-form" className=" rounded-md shadow-md border border-gray-50 p-6">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900">
                Subir Banner Promocional
              </h2>
              <p className="text-xs text-gray-600">
                Sube una imagen que se mostrará como banner en tu menú digital
              </p>
            </div>

            <label htmlFor="image" className="label-input">
              Imagen del Banner
            </label>
            <div
              className="relative mt-2 cursor-pointer hover:opacity-70 transition p-10 border-2 border-dashed border-gray-300 rounded-md flex flex-col justify-center items-center gap-4 text-neutral-600 bg-slate-100 hover:bg-slate-200 w-full"
              onClick={() => open()}
            >
             <ImagePlus className="size-10" strokeWidth={2} />
              <p className="text-md font-semibold">Agregar Banner</p>

              
            </div>
            {/* Recomendaciones */}
            <div className="mt-4 mb-4 bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
               
                <Info className="size-6 text-amber-600 mt-0.5 flex-shrink-0"  strokeWidth={2} />
                <div>
                  <h4 className="text-xs font-medium text-amber-900 mb-2">
                    Recomendaciones para tu Banner
                  </h4>
                  <ul className="text-xs text-amber-800 space-y-1">
                    <li>
                      • <strong>Dimensiones ideales:</strong> 1080 x 1920 px
                      (formato vertical)
                    </li>
                    <li>
                      • <strong>Texto legible:</strong> Usa fuentes grandes y
                      colores contrastantes
                    </li>
                    <li>
                      • <strong>Mensaje claro:</strong> Información concisa y
                      llamativa
                    </li>
                    <li>
                      • <strong>Calidad alta:</strong> Imagen nítida y
                      profesional
                    </li>
                    <li>
                      • <strong>Actualización:</strong> Cambia el banner
                      regularmente para mantener interés
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <input
              type="hidden"
              name="banner"
              defaultValue={imageUrl}
            />

            {/* Botones de Acción */}

           

           
          </form>

         
        </>
      )}
    </CldUploadWidget>
  );
}
