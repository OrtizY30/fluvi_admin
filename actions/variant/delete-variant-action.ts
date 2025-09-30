"use server";

import {
  ErrorResponSchema,
  SuccessSchema,
  Variant,
} from "@/src/schemas";
import getToken from "@/src/auth/token";
import { revalidatePath } from "next/cache";

type ActionStateType = {
  errors: string[];
  success: string;
};
export async function deleteVariant(
    variantId : Variant['id'],
    prevState: ActionStateType,
): Promise<ActionStateType> {
    
  const token = await getToken();



  const url = `${process.env.API_URL}/variants/${variantId}`;

  const req = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await req.json();
  console.log(json)
  if (!req.ok) {
    const { error } = ErrorResponSchema.parse(json);
    return {
      errors: [error!],
      success: "",
    };
  }

  const success = SuccessSchema.parse(json);
  revalidatePath('admin/productos');

  return {
    ...prevState,
    errors: [],
    success: success,
  };
}
