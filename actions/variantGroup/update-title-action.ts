"use server";

import { ErrorResponSchema, SuccessSchema, VariantGroup } from "@/src/schemas";
import getToken from "@/src/auth/token";
import { revalidatePath } from "next/cache";

type ActionStateType = {
  errors: string[];
  success: string;
  data: {
    title: string;
  }
};
export async function updateTitleVariantGroup(
  variantGroupId: VariantGroup["id"],
  prevState: ActionStateType,
  formData: FormData
): Promise<ActionStateType> {
  const title = formData.get("title") as string;
  const token = await getToken();

  const url = `${process.env.API_URL}/variantsGroup/${variantGroupId}`;

  const req = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title }),
  });
  const json = await req.json();
  if (!req.ok) {
    const { error } = ErrorResponSchema.parse(json);
    return {
      errors: [error!],
      success: "",
      data:{
        title
      }
    };
  }

  const success = SuccessSchema.parse(json);
 revalidatePath("/admin/productos");

  return {
    ...prevState,
    errors: [],
    success: success,
  };
}
