"use server";

import { RegisterShcema, ErrorResponSchema, SuccessSchema } from "@/src/schemas";

export type ActionStateType = {
  errors: string[];
  success: string;
  data: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    subscriptionType: string;
    phone: string;
    country: string;
  };
};

export async function register(prevState: ActionStateType, formData: FormData): Promise<ActionStateType> {
  const registerForm = { 
    name: (formData.get("name") as string) ?? "",
    email: (formData.get("email") as string) ?? "",
    password: (formData.get("password") as string) ?? "",
    password_confirmation: (formData.get("password_confirmation") as string) ?? "",
    subscriptionType: (formData.get("subscriptionType") as string) ?? "",
    phone: (formData.get("phone") as string) ?? "",
    country: (formData.get("country") as string) ?? "",
  };

  // ✅ Validación con Zod
  const parsed = RegisterShcema.safeParse(registerForm);
  if (!parsed.success) {
    return {
      ...prevState,
      errors: parsed.error.errors.map((err) => err.message),
      success: "",
      data: registerForm,
    };
  }

  try {
    const res = await fetch(`${process.env.API_URL}/auth/create-account`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });

    const json = await res.json();

    if (!res.ok) {
      const { error } = ErrorResponSchema.parse(json);
      return {
        ...prevState,
        errors: [error!],
        success: "",
        data: registerForm,
      };
    }

    const parsedSuccess = SuccessSchema.safeParse(json);
    const successMessage = parsedSuccess.success ? parsedSuccess.data : "Cuenta creada correctamente";

    return {
      errors: [],
      success: successMessage,
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
  } catch (error) {
    return {
      ...prevState,
      errors: ["Error de conexión con el servidor"],
      success: "",
      data: registerForm,
    };
  }
}
