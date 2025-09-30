"use client";

import { updateProfile } from "@/actions/profile/update-profile-action";
import { getImagetPath } from "@/src/utils";
import { Camera, ImagePlus } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import {
  startTransition,
  useActionState,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "react-toastify";
import { FluviToast } from "../ui/FluviToast";
import { Business } from "@/src/schemas";
import ModalChangeImage from "./ModalChangeImage";

export default function ImageProfileUpload({
  image,
}: {
  image: Business["image"];
}) {
  const [imageUrl, setImageUrl] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    if (image) setImageUrl(getImagetPath(image));
  }, [image]);

  const [state, dispatch, isPending] = useActionState(updateProfile, {
    success: "",
    errors: [],
  });

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (state.errors?.length) {
      state.errors.forEach((error) =>
        toast.error(<FluviToast type="error" msg={error} />)
      );
    }
    if (state.success) {
      toast.success(<FluviToast type="success" msg={state.success} />);
    }
  }, [state]);

  // 🔥 Manejar cambios con debounce
  const handleChange = useCallback(
    (url: string | null) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(() => {
        startTransition(() => {
          dispatch({ image: url ?? "" }); // 👈 si url es null, se manda vacío
        });
      }, 1000);
    },
    [dispatch, startTransition]
  );
  return (
    <CldUploadWidget
      uploadPreset="Fluvi-app"
      options={{
        maxFiles: 1,
        multiple: false, // importante
        cropping: true, // ✅ Activa recorte
        croppingAspectRatio: 16 / 9, // Opcional: 16 / 9 = horizontal
        showSkipCropButton: false, // Opcional: fuerza al usuario a recortar
      }}
      onSuccess={(result, { widget }) => {
        if (result.event === "success") {
          widget.close();
          if (
            result.info &&
            typeof result.info === "object" &&
            "secure_url" in result.info
          ) {
            const url = (result.info as { secure_url: string }).secure_url;
            setImageUrl(url);
            handleChange(url);
          }
        }
      }}
    >
      {({ open }) => (
        
        <>
          <div
            className={`${
              isPending && "opacity-50"
            } relative bg-surface-base flex flex-col justify-center items-center w-full h-full`}
          >
            {/** Imagen nueva local (si existe, tiene prioridad sobre la del backend) */}
            {image && !imageUrl ? (
              <>
                <div
                  onClick={handleClickOpen}
                  title="Cambiar imagen"
                  className=" cursor-pointer absolute hover:bg-blue-500 transition bg-btn-secondary p-2 rounded-full text-gray-100 z-10"
                >
                  <Camera className="size-7" strokeWidth={2.5} />
                </div>
                <Image
                  fill
                  // className="rounded-full p-2  "
                  src={getImagetPath(image)}
                  alt="Imagen del portada"
                  style={{ objectFit: "cover" }}
                />
              </>
            ) : imageUrl ? (
              <>
                <div
                  onClick={handleClickOpen}
                  title="Cambiar imagen"
                  className=" cursor-pointer absolute hover:bg-blue-500 transition bg-btn-secondary p-2 rounded-full text-gray-100 z-10"
                >
                  <Camera className="size-7" strokeWidth={2.5} />
                </div>
                <Image
                  fill
                  // className="rounded-full p-2"
                  src={imageUrl}
                  alt="Imagen de portada"
                  style={{ objectFit: "cover" }}
                />
              </>
            ) : (
              <div
                onClick={() => open()}
                className="flex w-full h-full cursor-pointer bg-slate-200 p-1 flex-col items-center justify-center"
              >
                <div
                  title="Subir imagen"
                  className="flex flex-col items-center justify-center  font-bold  "
                >
                  <div className=" cursor-pointer  hover:bg-blue-500 transition  bg-btn-secondary p-1.5 rounded-full text-gray-100 ">
                    <Camera className="size-6" strokeWidth={2.5} />
                  </div>
                  <p className="text-xs font-bold text-btn-secondary">
                    Subir Imagen
                  </p>
                </div>
              </div>
            )}
          </div>
          <ModalChangeImage
            setImageUrl={setImageUrl}
            handleChange={handleChange}
            openWidget={() => open()}
            openDialog={openDialog}
            handleClose={handleClose}
          />
        </>
      )}
    </CldUploadWidget>
  );
}
