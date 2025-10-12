"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function HeaderTheme() {
  const router = useRouter();
  return (
    <header className="w-full space-y-3 ">
      <button
        title="Página anterior"
        onClick={() => router.back()}
        className="rounded-md cursor-pointer shadow-sm md:m-4 m-2 shadow-black/30 p-2"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>
      <h1 className="md:text-3xl px-10 text-xl font-black">
        Configura los colores de tu App
      </h1>
    </header>
  );
}
