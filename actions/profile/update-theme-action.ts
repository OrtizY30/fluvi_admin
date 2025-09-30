"use server";

import getToken from "@/src/auth/token";
import { DraftThemeSchema, ErrorResponSchema, SuccessSchema, Theme } from "@/src/schemas";
import { revalidatePath } from "next/cache";

type ActionStateType = {
  errors: string[];
  success: string;
};
export async function updateTheme(
  themeId: number,
  prevState: ActionStateType,
   data: Partial<Theme>
): Promise<ActionStateType> {

  const token = await getToken();

  const url = `${process.env.API_URL}/theme/${themeId}/field`;

  const req = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const json = await req.json();

   
    if (!req.ok) {
      const { error } = ErrorResponSchema.parse(json);
      return {
        errors: [error!],
        success: "",
      };
    }

  revalidatePath("/admin/setting-theme");
  const success = SuccessSchema.parse(json);

  return {
    errors: [],
    success: success
  };
}
