'use server'

import getToken from "@/src/auth/token";
import { ErrorResponSchema, SocialMedia, SuccessSchema } from "@/src/schemas";
import { revalidatePath } from "next/cache";

type ActionStateType = {
  errors: string[];
  success: string;
};
export async function deleteSocial(
   prevState: ActionStateType,
  formData: FormData
): Promise<ActionStateType> {
  const socialId = formData.get("id");

  if (!socialId) {
    return {
      errors: ["ID no proporcionado"],
      success: "",
    };
  }
  const token = await getToken();

  const url = `${process.env.API_URL}/business/social/${socialId}`;

  const req = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await req.json();
  if (!req.ok) {
    const { error } = ErrorResponSchema.parse(json);
    return {
      errors: [error!],
      success: "",
    };
  }
  const success = SuccessSchema.parse(json);
  revalidatePath("/admin");

  return {
    ...prevState,
    errors: [],
    success: success,
  };
}