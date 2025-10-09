"use server";

import { ErrorResponSchema, SuccessSchema, TokenSchema } from "@/src/schemas";

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function validateToken(token: string, prevState: ActionStateType) {
  const resetPasswordToken = TokenSchema.safeParse(token);

  if (!resetPasswordToken.success) {
    return {
      errors: resetPasswordToken.error.issues
        .map((issue) => issue.message)
        .filter((msg): msg is string => Boolean(msg)), // ✅ Filtra undefined
      success: "",
    };
  }
 
  const url = `${process.env.API_URL}/auth/validate-token`;

  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      token: resetPasswordToken.data,
    }),
  });

  const json = await req.json();
  if (!req.ok) {
    const { error } = ErrorResponSchema.parse(json);
    return {
      errors: [error].filter((e): e is string => Boolean(e)), // ✅ filtra undefined
      success: "",
    };
  }
  const success = SuccessSchema.parse(json);
  return {
    errors: [],
    success,
  };
}
