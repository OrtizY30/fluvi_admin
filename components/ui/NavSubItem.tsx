"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  ArrowRightStartOnRectangleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { IoStorefrontOutline } from "react-icons/io5";
import { Clock3, Component, Hamburger, Headset, Layers, LinkIcon, QrCode, TvMinimal, UserRound } from 'lucide-react';

type NavItemProps = {
  link: string;
  label: string;
};

export default function NavSubItem({ link, label }: NavItemProps) {
  const pathname = usePathname();
  const currentRoute = pathname.split("/")[2];
  const isActive = currentRoute === link;
  const getIcon = (type: string) => {
    switch (type) {
      case "productos":
        return <Hamburger className="size-5" strokeWidth={2} />;

      case "categories":
        // return <HiOutlineViewGridAdd className="size-5" />;
        return <Layers className="size-5" strokeWidth={2} />;

      case "complementos":
        return <Component className="size-5" strokeWidth={2} />;

      case "banner":
        return <TvMinimal className="size-5" strokeWidth={2} />;

      case "tiendas":
        return <IoStorefrontOutline className="size-5"  strokeWidth={2} />;

      case "horarios":
        return <Clock3  className="size-5" strokeWidth={2} />;

      case "sociales":
        return <LinkIcon className="size-5" strokeWidth={2} />;

      case "perfil":
        return <UserRound strokeWidth={2}   className="size-5"/>;

      case "qr-code":
        return <QrCode className="size-5" strokeWidth={2} />;

      case "soporte":
        return <Headset className="size-5" strokeWidth={2} />;

      case "logout":
        return <ArrowRightStartOnRectangleIcon className="size-5" />;

      case "settings":
        return <Cog6ToothIcon className="size-5" />;
      default:
        return null;
    }
  };

  return (
    
    <Link
      href={"/admin/" + link}
      className={`flex items-center gap-3 p-2  py-3 text-[12px]  transition-all rounded-xl ${
        isActive
          ? "bg-white shadow-md text-neutral-600 font-semibold"
          :  " text-white  hover:bg-gray-500"
      }`}
    >
      {/* <span className={isActive ? "text-white p-1 rounded-md bg-brand-primary" : ""}>
        {getIcon(icon)}
      </span> */}
      {label}
    </Link>
  );
}
