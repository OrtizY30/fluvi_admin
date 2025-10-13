import { CircularProgress, TextField } from "@mui/material";
import React, { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FluviToast } from "../ui/FluviToast";
import { useSocialStore } from "@/store/useSocialStore";
import { updateSocial } from "@/actions/socials/update-socialMedia";
import { Facebook, Instagram } from "lucide-react";
import { PiTiktokLogo, PiWhatsappLogo } from "react-icons/pi";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { CountryCode, E164Number } from "libphonenumber-js/core";
import { useRouter } from "next/navigation";

type SocialMediaFormProps = {
  setOpen: () => void;
};
export default function SocialMediaForm({ setOpen }: SocialMediaFormProps) {
  const router = useRouter();
  const [country, setCountry] = useState<CountryCode | undefined>();
  const socialMedia = useSocialStore((state) => state.socialMedia);
  const [phone, setPhone] = useState<E164Number | undefined>(undefined);
  const [formData, setFormData] = useState({
    instagram: "",
    facebook: "",
    tiktok: "",
    whatsapp: "",
  });

  useEffect(() => {
    if (socialMedia) {
      setFormData({
        instagram: socialMedia.instagram || "",
        facebook: socialMedia.facebook || "",
        tiktok: socialMedia.tiktok || "",
        whatsapp: socialMedia.whatsapp || "",
      });
    }
    if (formData.whatsapp) {
      setPhone(formData.whatsapp as E164Number);
    }
  }, [socialMedia, formData.whatsapp]);

  useEffect(() => {
    // Ejemplo: navigator.language devuelve "es-CO" en Colombia
    const lang = navigator.language.split("-")[1]; // "CO"
    if (lang) {
      setCountry(lang.toUpperCase() as CountryCode);
    }
  }, []);

  const updateSocialMediaWithId = updateSocial.bind(null, socialMedia.id);
  const [state, dispatch, isPending] = useActionState(updateSocialMediaWithId, {
    errors: [],
    success: "",
    data: formData,
  });

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => {
        toast.error(<FluviToast type={"error"} msg={error} />);
      });
    }

    if (state.success) {
      toast.success(<FluviToast type="success" msg={state.success} />, {});
      setOpen();
      router.refresh();
    }
  }, [state, setOpen, router]);
  return (
    <form action={dispatch} className="p-3 w-full space-y-6">
      <div className="flex gap-2 items-center">
        <PiWhatsappLogo className="size-9 text-gray-600" />
        <PhoneInput
          name="whatsapp" // Muy importante para server action
          defaultCountry={country}
          international
          value={phone?.replace(/\s+/g, "") || ""} // aquí en lugar de defaultValue
          onChange={setPhone}
          className="w-full border border-gray-300 p-2 rounded-2xl"
        />
      </div>
      <div className="flex gap-2 items-center">
        <Instagram className="size-9 text-gray-600" strokeWidth={1.5} />

        <TextField
          className="w-full"
          id="outlined-basic"
          variant="outlined"
          name="instagram"
          label="Instagram"
          defaultValue={formData.instagram}
          // onChange={handleChange}
          size="small"
          sx={{
            width: '100%',
            "& .MuiOutlinedInput-root": {
              borderRadius: 4, // aquí se aplica el borderRadius al input
            },
            "& .MuiInputBase-input": {
              // fontWeight: 900,
              fontSize: "1rem",
            },
            "& .MuiInputLabel-root": {
              // fontWeight: 500,
              color: "#4a5565",
            },
          }}
        />
      </div>

      <div className="flex gap-2 items-center">
        <Facebook className="size-9 text-gray-600" strokeWidth={1.5} />

        <TextField
          className="w-full"
          id="outlined-basic"
          variant="outlined"
          name="facebook"
          label="Facebook"
          defaultValue={formData.facebook}
          // onChange={handleChange}
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 4, // aquí se aplica el borderRadius al input
            },
            "& .MuiInputBase-input": {
              // fontWeight: 900,
              fontSize: "1rem",
            },
            "& .MuiInputLabel-root": {
              // fontWeight: 500,
              color: "#4a5565",
            },
          }}
        />
      </div>

      <div className="flex gap-2 items-center">
        <PiTiktokLogo className="size-9 text-gray-600" />

        <TextField
          className="w-full"
          id="outlined-basic"
          variant="outlined"
          name="tiktok"
          label="Tiktok"
          defaultValue={formData.tiktok}
          // onChange={handleChange}
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 4, // aquí se aplica el borderRadius al input
            },
            "& .MuiInputBase-input": {
              // fontWeight: 900,
              fontSize: "1rem",
            },
            "& .MuiInputLabel-root": {
              // fontWeight: 500,
              color: "#4a5565",
            },
          }}
        />
      </div>

      <button
        disabled={isPending}
        type="submit"
        className="bg-brand-primary flex items-center justify-center disabled:bg-brand-primary/70 cursor-pointer p-2 text-white font-bold shadow-md rounded-xl w-full"
      >
        {isPending ? (
          <CircularProgress size="20px" sx={{ color: "white" }} />
        ) : (
          " Guardar"
        )}
      </button>
    </form>
  );
}
