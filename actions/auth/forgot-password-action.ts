"use server";

import {
  ErrorResponSchema,
  ForgotPasswordSchema,
  SuccessSchema,
} from "@/src/schemas";

type ActionStateType = {
  errors: string[];
  success: string;
  data: { email: string };
};

export async function forgotPassword(
  prevState: ActionStateType,
  formData: FormData
) {
  const email = formData.get("email") as string;
  const parseResult = ForgotPasswordSchema.safeParse({
    email,
  });

  if (!parseResult.success) {
    return {
      errors: parseResult.error.issues
        .map((issue) => issue.message)
        .filter((msg): msg is string => Boolean(msg)), // ✅ Filtra undefined
      success: "",
      data: { email },
    };
  }

  const url = `${process.env.API_URL}/auth/forgot-password`;

  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const json = await req.json();

  if (!req.ok) {
    const { error } = ErrorResponSchema.parse(json);
    return {
      errors: [error].filter((e): e is string => Boolean(e)), // ✅ filtra undefined
      success: "",
      data: { email },
    };
  }

  const success = SuccessSchema.parse(json);
  // Aquí harías la lógica de envío del email, etc...

  return {
    ...prevState,
    errors: [],
    success: success,
    data: { email },
  };
}
