import MainSocial from "@/components/sociales/MainSocial";
import getToken from "@/src/auth/token";
import { SocialMediaApiArrayResponseSchema } from "@/src/schemas";
import React from "react";

async function getSocialMedia() {
  const token = await getToken();

  const url = `${process.env.API_URL}/business/social`;
  const req = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await req.json();

  const socialMedia = SocialMediaApiArrayResponseSchema.parse(json);
  return socialMedia;
}
export default async function SocialesPage() {
  const socialMedia = await getSocialMedia();

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-surface-base">
      <header className=" px-11 p-6 flex-shrink-0 ">
        <h1 className="text-3xl font-semibold">Redes Sociales</h1>
      </header>

      <MainSocial socialMedia={socialMedia} />
    </div>
  );
}
