"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

type NavItemProps = {
  link: string;
  label: string;
};

export default function NavSubItem({ link, label }: NavItemProps) {
  const pathname = usePathname();
  const currentRoute = pathname.split("/")[2];
  const isActive = currentRoute === link;

  return (
    <Link
      href={"/admin/" + link}
      className={`flex capitalize items-center gap-3 p-2  py-3 text-[12px]  transition-all rounded-xl ${
        isActive
          ? "bg-white shadow-md text-neutral-600 font-semibold"
          : " text-white  hover:bg-gray-500"
      }`}
    >
      {label}
    </Link>
  );
}
