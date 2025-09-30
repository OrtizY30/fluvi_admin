"use server";

import getToken from "@/src/auth/token";
import {
  SuccessSchema,
} from "@/src/schemas";
import { revalidatePath } from "next/cache";

type ActionStateType = {
  errors: string[];
  success: string;
};
export async function toogleActiveMethod(
  methodId: Number,
  prevState: ActionStateType,
): Promise<ActionStateType> {


  const token = await getToken();

  const urlFetch = `${process.env.API_URL}/business/payment-method/${methodId}/toggle`;

  const req = await fetch(urlFetch, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
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
