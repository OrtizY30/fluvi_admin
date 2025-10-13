"use server";

import getToken from "@/src/auth/token";
import { SuccessSchema } from "@/src/schemas";
import { revalidatePath } from "next/cache";

type ActionStateType = {
  errors: string[];
  success: string;
};
export async function createCategory(
  prevState: ActionStateType,
): Promise<ActionStateType> {


  const token = await getToken();
  console.log("Token en createCategory:", token); // Verifica que el token se obtiene correctamente

  const url = `${process.env.API_URL}/categories`;

  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  });

  const json = await req.json();
  revalidatePath("/admin");
  const success = SuccessSchema.parse(json);

  return {
    ...prevState,
    errors: [],
    success: success
  };
}
