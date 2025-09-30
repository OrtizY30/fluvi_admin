"use server";

import getToken from "@/src/auth/token";
import { SuccessSchema } from "@/src/schemas";
import { revalidatePath } from "next/cache";

type ActionStateType = {
  errors: string[];
  success: string;
};
export async function toggleModifierGroup(
  productId: number,
  modifierGroupId: number,
  prevState: ActionStateType
): Promise<ActionStateType> {
  const token = await getToken();

  const url = `${process.env.API_URL}/products/${productId}/modifiers`;

  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      modifierGroupId, // enviamos como array aunque sea uno
    }),
  });

  const json = await req.json();
  revalidatePath("/admin/producto");
  const success = SuccessSchema.parse(json);

  return {
    ...prevState,
    errors: [],
    success: success,
  };
}
