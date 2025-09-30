"use server";

import getToken from "@/src/auth/token";
import {
  DraftSocialSchema,
  SocialMedia,
  SuccessSchema,
} from "@/src/schemas";
import { revalidatePath } from "next/cache";

type ActionStateType = {
  errors: string[];
  success: string;
  data: {
    instagram : string,
        facebook: string,
        tiktok: string,
        whatsapp: string,
  };
};
export async function updateSocial(
  socialId: SocialMedia['id'],
  prevState: ActionStateType,
  formData: FormData
): Promise<ActionStateType> {
  const instagram = formData.get("instagram")?.toString().trim() || "";
  const facebook = formData.get("facebook")?.toString().trim() || "";
  const tiktok = formData.get("tiktok")?.toString().trim() || "";
  const whatsapp = formData.get("whatsapp")?.toString().trim() || "";

  const social = DraftSocialSchema.safeParse({
    instagram,
    facebook,
    tiktok,
    whatsapp,
  });

  // Simulate a server-side action
  if (!social.success) {
    const errors = social.error.errors.map((err) => err.message);
    return {
      errors: errors,
      success: "",
      data: {
        instagram,
        facebook,
        tiktok,
        whatsapp,
      },
    };
  }

  const token = await getToken();

  const urlFetch = `${process.env.API_URL}/business/social/${socialId}`;

  const req = await fetch(urlFetch, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      instagram: social.data.instagram,
      facebook: social.data.facebook,
      tiktok: social.data.tiktok,
      whatsapp: social.data.whatsapp,
    }),
  });

  const json = await req.json();
  console.log(json)
  revalidatePath("/admin/productos");
  const success = SuccessSchema.parse(json);

  return {
    ...prevState,
    errors: [],
    success: success,
    data: {
      instagram : '',
        facebook : '',
        tiktok: '',
        whatsapp: '',
    },
  };
}
