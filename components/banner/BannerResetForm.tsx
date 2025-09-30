import React, { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FluviToast } from "../ui/FluviToast";
import { uploadBanner } from "@/actions/profile/upload-banner-action";

type BannerResetFormProps = {
    imageUrl: string;
  setImageUrl: (url: string) => void;
}
export default function BannerResetForm({imageUrl, setImageUrl }: BannerResetFormProps) {
  const [banner, setBanner] = useState("");
  const [state, dispatch] = useActionState(uploadBanner, {
    errors: [],
    success: "",
    data: {
      banner: banner || "",
    },
  });

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => {
        toast.error(<FluviToast type={"error"} msg={error} />);
      });
    }

    if (state.success) {
      toast.success(<FluviToast type="success" msg={state.success} />);
      setImageUrl(""); // Reset the image URL after successful reset
      setBanner(""); // Clear the banner state
    }
  }, [state]);
  return (
    <>
      <form action={dispatch}>
        <input type="hidden" defaultValue={banner} name="banner" id="banner" />
        <button disabled={!imageUrl} type="submit" className=" text-md rounded-md p-2 px-3 cursor-pointer bg-brand-primary hover:bg-neutral-700 text-white transition-colors disabled:opacity-50">
          Eliminar
        </button>
      </form>
    </>
  );
}
