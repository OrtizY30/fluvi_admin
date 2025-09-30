"use server";

import getToken from "@/src/auth/token";
import { Business, SuccessSchema } from "@/src/schemas";
import { revalidatePath } from "next/cache";

type ActionStateType = {
  errors: string[];
  success: string;
};
export async function updateProfile(
  prevState: ActionStateType,
  data: Partial<Business>
): Promise<ActionStateType> {
  const token = await getToken();

  const url = `${process.env.API_URL}/profile`;

  const req = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const json = await req.json();
  
  revalidatePath("/admin/productos");
  const success = SuccessSchema.parse(json);

  return {
    ...prevState,
    errors: [],
    success: success,
  };
}
