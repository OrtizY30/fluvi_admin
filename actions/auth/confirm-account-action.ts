"use server";

import { ErrorResponSchema, SuccessSchema, TokenSchema } from "@/src/schemas";


type ActionStateType = {
  errors: string[];
  success: string;
};
export async function confirmAccount(
  token: string,
  prevState: ActionStateType
) {

  const confirmToken = TokenSchema.safeParse(token);


  if (!confirmToken.success) {
    return {
      errors: confirmToken.error.issues.map((issue) => issue.message),
      success: "",
    };
  }

  try {
    const res = await fetch(`${process.env.API_URL}/auth/confirm-account`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        token: confirmToken.data,
      }),
    });

    const json = await res.json();

    console.log(res.ok);
    console.log(json);

    if (!res.ok) {
      const { error } = ErrorResponSchema.parse(json);
      return {
        errors: [error],
        success: "",
      };
    }

    const success = SuccessSchema.parse(json)

    // Aquí podrías opcionalmente resetear el formulario (solo si quieres)
    return {
      errors: [],
      success
    };
  } catch (error) {
    // console.log(error)
    return {
      ...prevState,
      errors: ["Error de conexión con el servidor"],
      success: "",
    };
  }
}
