"use server";

import getToken from "@/src/auth/token";
import { ErrorResponSchema, Modifier, SuccessSchema } from "@/src/schemas";
import { revalidatePath } from "next/cache";

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function updateModifier(
  id: Modifier["id"],
  prevState: ActionStateType,
  data: Partial<Modifier>
): Promise<ActionStateType> {
  const token = await getToken();
  const req = await fetch(`${process.env.API_URL}/modifiers/${id}/field`, {
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


  const success = SuccessSchema.parse(json);
  revalidatePath("/admin/productos");

  return {
    errors: [],
    success: success,
  };
}
