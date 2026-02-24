"use client";

import Image from "next/image";
import Link from "next/link";

export default function FloatingSupportButton() {
  const message =
    "https://wa.me/573022670516?text=Hola%2C%20deseo%20hablar%20con%20soporte!";

  return (
    <Link
      href={message}
      title="Hablar con Soporte"
      className="fixed bottom-20 right-6 z-50  h-10 w-10 cursor-pointer"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image src={"/support.png"} fill alt="logo soporte" />
    </Link>
  );
}
