"use client";

import Image from "next/image";
import Link from "next/link";

export default function FloatingSupportButton() {
  const message =
    "https://wa.me/573015879165?text=Hola%2C%20deseo%20hablar%20con%20soporte!";

  return (
    <Link
      href={message}
      title="Hablar con Soporte"
      className="fixed bottom-6 right-16 z-50  h-20 w-20 cursor-pointer"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image src={"/support.png"} fill alt="logo soporte" />
    </Link>
  );
}
