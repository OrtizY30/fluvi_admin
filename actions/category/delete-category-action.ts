"use server";

import {
  Category,
  ErrorResponSchema,
  PasswordValidationSchema,
  SuccessSchema,
} from "@/src/schemas";
import getToken from "@/src/auth/token";
import { revalidatePath } from "next/cache";

type ActionStateType = {
  errors: string[];
  success: string;
};
export async function deleteCategory(
  categoryId: Category["id"],
  prevState: ActionStateType,
  formData: FormData
): Promise<ActionStateType> {
  const currentPassword = PasswordValidationSchema.safeParse(
    formData.get("password")
  );

  if (!currentPassword.success) {
    return {
      errors: currentPassword.error.issues.map((issue) => issue.message),
      success: "",
    };
  }
  const token = await getToken();

  //   Comprobar el password

  const checkPasswordUrl = `${process.env.API_URL}/auth/check-Password`;

  const checkPasswordReq = await fetch(checkPasswordUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: currentPassword.data,
    }),
  });
  const checkPasswordJson = await checkPasswordReq.json();

  if (!checkPasswordReq.ok) {
    const { error } = ErrorResponSchema.parse(checkPasswordJson);
    return {
      errors: [error!],
      success: "",
    };
  }

  // Despues de validar el password eliminamos la categoria

  const url = `${process.env.API_URL}/categories/${categoryId}`;

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
revalidatePath('/admin/product')
  return {
    ...prevState,
    errors: [],
    success: success,
  };
}
