"use server";

import getToken from "@/src/auth/token";
import { SuccessSchema } from "@/src/schemas";
import { revalidatePath } from "next/cache";

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function updateProductOrder(
  prevState: ActionStateType,
  payload: { id: number; position: number }[],
): Promise<ActionStateType> {
  try {
    const token = await getToken();

    const url = `${process.env.API_URL}/products/order`;

    console.log(payload)
    const req = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ order: payload }), // 👈 aquí payload, no prevState
    });

    const json = await req.json();
    console.log("Backend response:", json);

    if (!req.ok) {
      return {
        ...prevState,
        errors: [json.message ?? "Error desconocido"],
        success: "",
      };
    }

    const success = SuccessSchema.parse(json);

    revalidatePath("/admin/productos");

    return {
      ...prevState,
      errors: [],
      success,
    };
  } catch (error) {
    console.error("Error en updateProductOrder:", error);
    return {
      ...prevState,
      errors: ["Error al actualizar productos"],
      success: "",
    };
  }
}
