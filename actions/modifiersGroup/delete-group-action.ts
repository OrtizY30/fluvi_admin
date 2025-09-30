"use server";
  
import {
  ErrorResponSchema,
  ModifierGroup,
  SuccessSchema,
} from "@/src/schemas";
import getToken from "@/src/auth/token";
import { revalidatePath } from "next/cache";

type ActionStateType = {
  errors: string[];
  success: string;
};
export async function deleteGroup(
  modifiersGroupsId: ModifierGroup["id"],
  prevState: ActionStateType,
): Promise<ActionStateType> {

  
  const token = await getToken();

  //   Comprobar el password

  const checkPasswordUrl = `${process.env.API_URL}/auth/check-Password`;

  const checkPasswordReq = await fetch(checkPasswordUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }
  });

  const url = `${process.env.API_URL}/modifiersGroup/${modifiersGroupsId}`;

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
  revalidatePath("/admin/productos");

  return {
    ...prevState,
    errors: [],
    success: success,
  };
}
