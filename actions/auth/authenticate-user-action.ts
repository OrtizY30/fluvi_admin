"use server";

import { ErrorResponSchema, LoginSchema } from "@/src/schemas";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type ActionStateType = {
  errors: string[];
  data: {
    email: string;
    password: string;
  };
};

export async function authenticate(
  prevState: ActionStateType,
  formData: FormData
) {
  const loginCredentials = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const auth = LoginSchema.safeParse(loginCredentials);

  if (!auth.success) {
    return {
      errors: auth.error.errors.map((issue) => issue.message),
      data: loginCredentials,
    };
  }

  const url = `${process.env.API_URL}/auth/login`;

  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email: auth.data.email.toLowerCase(),
      password: auth.data.password,
    }),
  });

  const json = await req.json();

  if (!req.ok) {
    const {error} = ErrorResponSchema.parse(json);

    return {
      errors: [error ?? "Ocurrió un error inesperado. Intenta más tarde."],
      data: loginCredentials,
    };
  }


  //   Setear Cookies
  const authCookies = await cookies();

  authCookies.set({
    name: "FLUVI_AUTH_TOKEN",
    value: json,
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 días
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  redirect("/admin/productos");
}
