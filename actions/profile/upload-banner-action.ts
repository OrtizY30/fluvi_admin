"use server";

import getToken from "@/src/auth/token";
import { DraftBannerSchema, SuccessSchema } from "@/src/schemas";
import { revalidatePath } from "next/cache";

type ActionStateType = {
  errors: string[];
  success: string;
  data: {
    banner: string
  };
};
export async function uploadBanner(
  prevState: ActionStateType,
  formData: FormData
): Promise<ActionStateType> {
  const banner = formData.get("banner")?.toString() || '';

  const bannerProfile = DraftBannerSchema.safeParse({
    banner : banner
  });



  // Simulate a server-side action
  if (!bannerProfile.success) {
    const errors = bannerProfile.error.errors.map((err) => err.message);
    return {
      errors: errors,
      success: "",
      data: {
        banner: "",
      },
    };
  }

  

  const token = await getToken();

  const url = `${process.env.API_URL}/profile/banner`;

  const req = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      banner: bannerProfile.data.banner,
    }),
  });

  const json = await req.json();

  revalidatePath("/admin/banner");
  const success = SuccessSchema.parse(json);

  return {
    ...prevState,
    errors: [],
    success: success,
    data: {
      banner: bannerProfile.data.banner || "",
    },
  };
}
