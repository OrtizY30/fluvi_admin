"use server";

import {
  ErrorResponSchema,
  Product,
  SuccessSchema,
} from "@/src/schemas";
import getToken from "@/src/auth/token";

type ActionStateType = {
  errors: string[];
  success: string;
};
export async function deleteProduct(
  ProductId: Product["id"],
  prevState: ActionStateType,
): Promise<ActionStateType> {

  const token = await getToken();



  const url = `${process.env.API_URL}/products/${ProductId}`;

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

  return {
    ...prevState,
    errors: [],
    success: success,
  };
}
