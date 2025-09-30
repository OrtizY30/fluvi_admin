"use server";

import {
  ErrorResponSchema,
  SuccessSchema,
  VariantGroup,
} from "@/src/schemas";
import getToken from "@/src/auth/token";
import { revalidatePath } from "next/cache";

type ActionStateType = {
  errors: string[];
  success: string;
};
export async function deleteVariantGroup(
    prevState: ActionStateType,
   formData: FormData
): Promise<ActionStateType> {
const variantGroupId = formData.get("variantGroupId") as string;
  const token = await getToken();



  const url = `${process.env.API_URL}/variantsGroup/${variantGroupId}`;

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
  revalidatePath('admin/productos');

  return {
    ...prevState,
    errors: [],
    success: success,
  };
}
