"use server";

import getToken from "@/src/auth/token";
import { SuccessSchema } from "@/src/schemas";
import { revalidatePath } from "next/cache";

type ActionStateType = {
  errors: string[];
  success: string;
  
};
export async function toogleStatus(
  prevState: ActionStateType,
): Promise<ActionStateType> {

  const token = await getToken();

  const url = `${process.env.API_URL}/business/open-close`;

  const req = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await req.json();

  revalidatePath("/admin/horarios");
  const success = SuccessSchema.parse(json);

  return {
    ...prevState,
    errors: [],
    success: success,
  };
}
