import Image from "next/image";
import BannerResetForm from "./BannerResetForm";
import { useUserStore } from "@/store/useUserStore";
import { useEffect, useState } from "react";

type BannerPhoneProps = {
  imageUrl: string;
  setImageUrl: (url: string) => void;
};
export default function BannerPhone({
  imageUrl,
  setImageUrl,
}: BannerPhoneProps) {
  const [banner, setBanner] = useState("");
  const user = useUserStore((state) => state.user);
  const business = user?.business;

  useEffect(() => {
    if (business?.banner) {
      setBanner(business.banner);
    }
  }, [business]);

  return (
    <>
      {/* Vista Previa del Celular */}
      <div className="lg:col-span-1">
        <div className="rounded-md shadow-md border border-gray-100 p-4 sticky top-0 space-y-2">
          <h3 className="text-lg font-bold text-gray-900 text-center">
            Vista previa del Menú Digital
          </h3>

          {/* Simulador de Celular */}
          <div
            className="relative mx-auto"
            style={{ width: "280px", height: "400px" }}
          >
            {/* Marco del celular */}
            <Image
              src="/phone.png"
              alt="Simulador de Celular"
              layout="fill"
              objectFit="contain"
            />

            {/* Contenido dentro del celular (ej: el banner) */}
            <div
              className="absolute"
              style={{
                top: "55px", // ajusta según tu diseño
                left: "69px",
                width: "140px",
                height: "260px", // o la altura de tu banner
                overflow: "hidden",
                // borderRadius: "5px",
              }}
            >
              {imageUrl && (
                <Image
                  src={imageUrl || banner}
                  alt="Banner"
                  layout="fill"
                  objectFit="cover"
                />
              )}
            </div>
          </div>

          {/* Información adicional */}
          <div className="text-center">
            <p className="text-xs text-gray-600">
              Así se verá tu banner en el menú digital de tus clientes
            </p>
          </div>

          {/* Botón para guardar banner*/}
          <div className=" flex gap-2 mt-4">
            <button
              form="banner-form"
              type="submit"
              disabled={!imageUrl || imageUrl === banner}
              className="btn-form disabled:opacity-30 w-full"
            >
              {/* <Save className="h-4 w-4 mr-2" /> */}
              Guardar
            </button>

            <BannerResetForm imageUrl={imageUrl} setImageUrl={setImageUrl} />
          </div>
        </div>
      </div>
    </>
  );
}
