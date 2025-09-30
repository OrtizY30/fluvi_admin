"use server";

import getToken from "@/src/auth/token";
import { SuccessSchema } from "@/src/schemas";
import { revalidatePath } from "next/cache";

type ActionStateType = {
  errors: string[];
  success: string;
  data: {
    name: string;
  };
};
export async function createMethod(
  prevState: ActionStateType,
  formData: FormData
): Promise<ActionStateType> {
  const name = formData.get("name")?.toString().trim() || "";

  if (!name) {
    const errors = ["El campo nombre es obligatorio"];
    return {
      errors: errors,
      success: "",
      data: {
        name,
      },
    };
  }
  const token = await getToken();

  const urlFetch = `${process.env.API_URL}/business/payment-method/`;

  const req = await fetch(urlFetch, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
    }),
  });

  const json = await req.json();
  revalidatePath("/admin/productos");
  const success = SuccessSchema.parse(json);

  return {
    ...prevState,
    errors: [],
    success: success,
    data: {
      name: ''
    },
  };
}
