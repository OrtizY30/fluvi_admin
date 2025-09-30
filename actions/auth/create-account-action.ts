"use server";

import {
  ActionStateType,
  ErrorResponSchema,
  RegisterShcema,
  SuccessSchema,
} from "@/src/schemas";



export async function register(prevState: ActionStateType, formData: FormData) {
  const registerForm = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    password_confirmation: formData.get("password_confirmation") as string,
    subscriptionType: formData.get("subscriptionType") as string,
    phone: formData.get("phone") as string,
    country: formData.get("country") as string,
  };

  const dataRegister = RegisterShcema.safeParse(registerForm);

  if (!dataRegister.success) {
    const errors = dataRegister.error.errors.map((error) => error.message);
    return {
      errors,
      success: "",
      data: registerForm,
      errorServer: "",
    };
  }

  const res = await fetch(`${process.env.API_URL}/auth/create-account`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(dataRegister.data),
  });

  const json = await res.json();

  if (res.status === 409) {
    const { error } = ErrorResponSchema.parse(json);
    return {
      errors: [error],
      errorServer: error,
      success: "",
      data: registerForm,
    };
  }
  const success = SuccessSchema.parse(json);
  // Aquí podrías opcionalmente resetear el formulario (solo si quieres)
  return {
    errors: [],
    errorServer: "",
    success,
    data: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      subscriptionType: "",
      phone: "",
      country: "",
    },
  };
}
