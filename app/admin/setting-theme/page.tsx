import ThemeContainer from "@/components/theme/ThemeContainer";
import getToken from "@/src/auth/token";
import { ThemeApiResponseSchema } from "@/src/schemas";
import React from "react";

async function getTheme(){
   const token = await getToken();
    const url = `${process.env.API_URL}/theme`;
  
    const req = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await req.json();
    const theme = ThemeApiResponseSchema.parse(json);
    return theme;
}
export default async function ThemePage() {
   const theme = await getTheme();
  return (
    <div className="flex-1 space-y-4 flex h-full flex-col bg-surface-base overflow-x-hidden overflow-y-auto">
      <header className="w-full p-10 flex-shrink-0">
        <h1 className="md:text-3xl text-xl font-black">Configura los colores de tu App</h1>
      </header>
      <ThemeContainer theme={theme} />
      {/* <ThemeContainer /> */}
    </div>
  );
}
