"use server";

import getToken from "@/src/auth/token";
import { DraftBranchSchema, SuccessSchema } from "@/src/schemas";
import { revalidatePath } from "next/cache";

type ActionStateType = {
  errors: string[];
  success: string;
  data: {
    name: string;
    address: string;
    phone: string;
  };
};
export async function createBranch(
  prevState: ActionStateType,
  formData: FormData
): Promise<ActionStateType> {
  const name = formData.get("name")?.toString() || "";
  const address = formData.get("address")?.toString() || "";
  const phone = formData.get("phone")?.toString() || "";

  const branch = DraftBranchSchema.safeParse({
    name,
    address,
    phone,
  });

  // Simulate a server-side action
  if (!branch.success) {
    const errors = branch.error.errors.map((err) => err.message);
    return {
      errors: errors,
      success: "",
      data: {
        name,
        address,
        phone,
      },
    };
  }

  const token = await getToken();

  const url = `${process.env.API_URL}/business/branch`;

  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: branch.data.name,
      address: branch.data.address,
      phone: branch.data.phone,
    }),
  });

  const json = await req.json();

  if (!req.ok) {
    // Si el backend manda { error: "mensaje" }
    const message =
      typeof json === "object" && json?.error
        ? json.error
        : "Error inesperado al crear la sucursal.";

    return {
      ...prevState,
      errors: [message],
      success: "",
      data: {
        name,
        address,
        phone,
      },
    };
  }

  revalidatePath("/admin");
  const success = SuccessSchema.parse(json);

  return {
    ...prevState,
    errors: [],
    success: success,
    data: {
      name: "",
      address: "",
      phone: "",
    },
  };
}
