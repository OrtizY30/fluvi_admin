"use server";

import {
  ErrorResponSchema,
  Methods,
  SuccessSchema,
} from "@/src/schemas";
import getToken from "@/src/auth/token";

type ActionStateType = {
  errors: string[];
  success: string;
};
export async function deleteMethod(
  methodId: Methods["id"],
  prevState: ActionStateType,
): Promise<ActionStateType> {

  const token = await getToken();



  const url = `${process.env.API_URL}/business/payment-method/${methodId}`;

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
