"use server";

import getToken from "@/src/auth/token";
import {  SuccessSchema } from "@/src/schemas";
import { revalidatePath } from "next/cache";

type ActionStateType = {
  errors: string[];
  success: string;
  data: {
    name: string;
    price: number | null;
    description: string;
    image: string;
    isOnSale: boolean;
    discount: number;
    modifiers: number[];
  };
};

export async function updateProduct(
  productId: number,
  prevState: ActionStateType,
  formData: FormData
): Promise<ActionStateType> {
  const field = formData.get("field")?.toString();
  const value = formData.get("value")?.toString();

  if (!field) {
    return { errors: ["Campo requerido"], success: "", data: prevState.data };
  }

  const token = await getToken();
  const req = await fetch(
    `${process.env.API_URL}/products/${productId}/field`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ field, value }),
    }
  );

  const json = await req.json();
  
  const success = SuccessSchema.parse(json);

  revalidatePath("/admin/productos");

  return {
    errors: [],
    success,
    data: prevState.data,
  };
}
