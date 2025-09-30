"use server";

import getToken from "@/src/auth/token";
import { ErrorResponSchema, SuccessSchema } from "@/src/schemas";

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function toogleAvailabilityProduct(
  productId: number,
  prevState: ActionStateType
) {
  const token = await getToken();

  const url = `${process.env.API_URL}/products/${productId}/toggle-availability`;

  const req = await fetch(url, {
    method: "PATCH",
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

  return {
    errors: [],
    success,
  };
}
