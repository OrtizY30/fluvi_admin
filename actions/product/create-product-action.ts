"use server";

import getToken from "@/src/auth/token";
import { SuccessSchema } from "@/src/schemas";
import { revalidatePath } from "next/cache";

type ActionStateType = {
  errors: string[];
  success: string;
};
export async function createProduct(
  categoryId: number,
  prevState: ActionStateType,
): Promise<ActionStateType> {

  const token = await getToken();

  const url = `${process.env.API_URL}/products/category/${categoryId}`;

  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  });

  const json = await req.json();
  console.log(json)
  revalidatePath("/admin/product");
  const success = SuccessSchema.parse(json);

  return {
    ...prevState,
    errors: [],
    success: success
  };
}
