"use client";

import { getImagetPath } from "@/src/utils";
import { Camera, Share } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

type ImageUploadProps = {
  image?: string;
  onChangeField: (field: string, value: string) => void;
  setImageUrl: Dispatch<SetStateAction<string>>;
  imageUrl?: string;
};

export default function ImageUpload({
  image,
  onChangeField,
  setImageUrl,
  imageUrl,
}: ImageUploadProps) {
  return (
    <CldUploadWidget
      uploadPreset="Fluvi-app"
      options={{
        maxFiles: 1,
        multiple: false,
        cropping: true,
        croppingAspectRatio: 1,
        showSkipCropButton: false,
      }}
      onSuccess={(result, { widget }) => {
        if (result.event === "success") {
          widget.close();

          // @ts-expect-error faltan tipos de cloudinary
          const url = result.info?.secure_url as string;

          setImageUrl(url);

          // 🔥 dispara el update del backend
          onChangeField("image", url);
        }
      }}
    >
      {({ open }) => (
        <div
          className="relative cursor-pointer hover:opacity-70 transition p-10 flex flex-col justify-center items-center gap-3 h-64 text-neutral-600 shadow-md bg-slate-100 hover:bg-slate-200 w-full"
          onClick={() => open()}
        >
          {/** Imagen nueva local (si existe, tiene prioridad sobre la del backend) */}
          {image && !imageUrl ? (
            <>
              <div
                title="Subir imagen"
                className=" absolute bg-btn-secondary p-2 rounded-full text-gray-100 z-10"
              >
                <Camera className="size-8" strokeWidth={1.5} />
              </div>
              <Image
                fill
                src={getImagetPath(image)}
                alt="Imagen del producto"
                style={{ objectFit: "cover" }}
              />
            </>
          ) : imageUrl ? (
            <>
              <div
                title="Subir imagen"
                className=" absolute bg-btn-secondary p-2 rounded-full text-gray-100 z-10"
              >
                <Camera className="size-8" strokeWidth={1.5} />
              </div>
              <Image
                fill
                src={imageUrl}
                alt="Imagen del producto"
                style={{ objectFit: "cover" }}
              />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <p className="text-lg font-semibold">Subir imagen</p>
              <Share className="size-10" strokeWidth={1.5} />
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
}
