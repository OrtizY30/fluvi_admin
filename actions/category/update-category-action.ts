"use server";

import getToken from "@/src/auth/token";
import { DraftCategorySchema, SuccessSchema } from "@/src/schemas";
import { revalidatePath } from "next/cache";

type ActionStateType = {
  errors: string[];
  success: string;
  data: {
    name: string;
  };
};
export async function updateCategory(
  categoryId: number,
  prevState: ActionStateType,
  formData: FormData
): Promise<ActionStateType> {
  const name = formData.get("name")?.toString() || "";

  const category = DraftCategorySchema.safeParse({
    name,
  });

  // Simulate a server-side action
  if (!category.success) {
    const errors = category.error.errors.map((err) => err.message);
    return {
      errors: errors,
      success: "",
      data: {
        name,
      },
    };
  }

  const token = await getToken();

  const url = `${process.env.API_URL}/categories/${categoryId}/field`;

  const req = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      field: "name",           // 👈 obligatorio
      value: category.data.name, // 👈 obligatorio
    }),
  });

  const json = await req.json();
console.log(json)
  revalidatePath("/admin");
  const success = SuccessSchema.parse(json);

  return {
    ...prevState,
    errors: [],
    success: success,
    data: {
      name: "",
    },
  };
}
