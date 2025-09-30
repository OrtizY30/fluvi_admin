"use server";

import getToken from "@/src/auth/token";
import { DraftHorarySchema, SuccessSchema } from "@/src/schemas";
import { revalidatePath } from "next/cache";

type ActionStateType = {
  errors: string[];
  success: string;
  data: {
    day: string;
    openTime: string;
    closeTime: string;
  };
};
export async function updateHorary(
  horaryId: number,
  prevState: ActionStateType,
  formData: FormData
): Promise<ActionStateType> {
    const day = formData.get("day")?.toString() || "";
  const openTime = formData.get("openTime")?.toString() || "";
  const closeTime = formData.get("closeTime")?.toString() || "";

  const horary = DraftHorarySchema.safeParse({
    day,
    openTime,
    closeTime,
  });

  // Simulate a server-side action
  if (!horary.success) {
    const errors = horary.error.errors.map((err) => err.message);
    return {
      errors: errors,
      success: "",
      data: {
        day,
        openTime,
        closeTime,
      },
    };
  }

  const token = await getToken();

  const url = `${process.env.API_URL}/business/horary/${horaryId}`;

  const req = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
        day: horary.data.day,
      openTime: horary.data.openTime,
      closeTime: horary.data.closeTime,
    }),
  });

  const json = await req.json();

  revalidatePath("/admin/horarios");
  const success = SuccessSchema.parse(json);

  return {
    ...prevState,
    errors: [],
    success: success,
    data: {
      day: horary.data.day,
      openTime: horary.data.openTime,
      closeTime: horary.data.closeTime,
    },
  };
}
