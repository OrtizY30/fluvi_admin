import HeaderTheme from "@/components/theme/HeaderTheme";
import ThemeContainer from "@/components/theme/ThemeContainer";
import ContainerPhone from "@/components/ui/ContainerPhone";
import getToken from "@/src/auth/token";
import { ThemeApiResponseSchema } from "@/src/schemas";
import React from "react";

async function getTheme() {
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
    <div className="flex-1 space-y-4 flex min-h-screen flex-col bg-surface-base overflow-x-hidden overflow-y-auto">
      <div className=" w-full mx-auto grid grid-cols-1 lg:grid-cols-3 h-full">
        <div className="lg:col-span-2 overflow-y-auto bg-surface-base-secundary relative">

        <HeaderTheme />
        <ThemeContainer theme={theme} />
        </div>
      <ContainerPhone/>
      </div>
    </div>
  );
}
