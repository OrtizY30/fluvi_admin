"use client";
import { deleteSocial } from "@/actions/socials/delete-social";
import { SocialMedia } from "@/src/schemas";
import {
  ArrowTopRightOnSquareIcon,
  RssIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { startTransition, useActionState, useEffect } from "react";
import { TbBrandFacebook, TbBrandInstagram } from "react-icons/tb";
import { toast } from "react-toastify";
import { FluviToast } from "../ui/FluviToast";
import Image from "next/image";
import { ExternalLink, Trash2 } from "lucide-react";

type SocialDetailsProps = {
  socialMedia: SocialMedia[];
};
export default function SocialDetails({ socialMedia }: SocialDetailsProps) {
  const [state, dispatch] = useActionState(deleteSocial, {
    errors: [],
    success: "",
  });

  function handleDelete(socialId: number) {
    const form = new FormData();
    form.append("id", String(socialId));
    startTransition(() => {
      dispatch(form);
    });
  }

  const instagram = socialMedia.filter((item) => item.platform === "INSTAGRAM");
  const facebook = socialMedia.filter((item) => item.platform === "FACEBOOK");
  const tiktok = socialMedia.filter((item) => item.platform === "TIKTOK");

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => {
        toast.error(<FluviToast type={"error"} msg={error} />);
      });
    }

    if (state.success) {
      toast.success(<FluviToast type="success" msg={state.success} />, {});
    }
  }, [state]);

  return (
    <div className="p-4 flex flex-col gap-4 justify-between items-center">
     <div
       
          className="border w-full  border-gray-200 rounded-md p-4 shadow-xs"
        >
        <div className="flex items-center gap-4 justify-between">

          <div className="flex items-center gap-3">
           <div className="w-10 h-10 rounded-md">
             <Image
             src={'/instagram.png'}
             alt="logo faceboobk"
             width={40}
             height={40}
             />
            </div>
            <div>
              <h3 className="text-md font-medium text-gray-900">Instagram</h3>
              <p className="text-xs text-gray-500">
                {instagram.length ? `@${instagram[0].name}` : ""}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {instagram.length ? (
              <>
                <div className="bg-green-400 rounded-full p-1"></div>
                <p className="text-xs font-bold text-green-400">Conectado</p>
              </>
            ) : (
              <>
                <div className="bg-red-400 rounded-full p-1"></div>
                <p className="text-xs font-bold text-red-400">Desconectado</p>
              </>
            )}
          </div>

          <div className=" flex-1 flex gap-2 justify-end">
            <Link
              href={instagram.length ? instagram[0].url : ""}
              target="_blank"
              className={`flex-1 max-w-24 hover:text-white hover:bg-blue-900  hover:border-blue-900 cursor-pointer rounded-md p-2 flex items-center justify-center text-xs gap-2 bg-transparent border transition-all border-gray-200 ${
                instagram.length === 0
                  ? "pointer-events-none text-gray-400"
                  : ""
              }`}
            >
              <ExternalLink className="size-4 "  strokeWidth={1.5} />
           
              Ver Perfil
            </Link>
            <button
              onClick={() => handleDelete(instagram[0].id)}
              disabled={instagram.length === 0}
              title="Editar"
              className="flex-1 max-w-24 hover:text-white hover:border-red-500 cursor-pointer rounded-md p-2 flex items-center hover:bg-red-500 justify-center text-xs gap-2 bg-transparent border transition-all border-gray-200 disabled:opacity-50"
            >
               <Trash2 className="size-4"  strokeWidth={1.5} />
              Eliminar
            </button>
          </div>
        </div>
      </div>

     <div
   
          className="border w-full  border-gray-200 rounded-md p-4 shadow-xs"
        >
        <div className="flex items-center gap-4 justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md">
             <Image
             src={'/facebook.png'}
             alt="logo faceboobk"
             width={40}
             height={40}
             />
            </div>
            <div>
              <h3 className="text-md font-medium text-gray-900">Facebook</h3>
              <p className="text-xs text-gray-500 capitalize">
                {facebook.length ? facebook[0].name : ""}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {facebook.length ? (
              <>
                <div className="bg-green-400 rounded-full p-1"></div>
                <p className="text-xs font-bold text-green-400">Conectado</p>
              </>
            ) : (
              <>
                <div className="bg-red-400 rounded-full p-1"></div>
                <p className="text-xs font-bold text-red-400">Desconectado</p>
              </>
            )}
          </div>

          <div className=" flex-1 justify-end flex gap-2">
            <Link
              href={facebook.length ? facebook[0].url : ""}
              target="_blank"
              title="Ver perfil"
              className={`flex-1 max-w-24 hover:text-white hover:bg-blue-900  hover:border-blue-900 cursor-pointer rounded-md p-2 flex items-center justify-center text-xs gap-2 bg-transparent border transition-all border-gray-200 ${
                facebook.length === 0 ? "pointer-events-none text-gray-400" : ""
              }`}
            >
              <ExternalLink className="size-4 "  strokeWidth={1.5} />
              Ver Perfil
            </Link>
            <button
              onClick={() => handleDelete(facebook[0].id)}
              disabled={facebook.length === 0}
              title="Editar"
              className="flex-1 max-w-24 hover:text-white hover:border-red-500 cursor-pointer rounded-md p-2 flex items-center hover:bg-red-500 justify-center text-xs gap-2 bg-transparent border transition-all border-gray-200 disabled:opacity-50"
            >
               <Trash2 className="size-4"  strokeWidth={1.5} />
              Eliminar
            </button>
          </div>
        </div>
      </div>

     <div
    
          className="border w-full  border-gray-200 rounded-md p-4 shadow-xs"
        >
        <div className="flex items-center gap-4 justify-between">
          <div className="flex items-center gap-3">
           <div className="w-10 h-10 rounded-md">
             <Image
             src={'/tiktok.png'}
             alt="logo faceboobk"
             width={40}
             height={40}
             />
            </div>
            <div>
              <h3 className="text-md font-medium text-gray-900">Tik Tok</h3>
              <p className="text-xs text-gray-500">
                {tiktok.length ? `@${tiktok[0].name}` : ""}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {tiktok.length ? (
              <>
                <div className="bg-green-400 rounded-full p-1"></div>
                <p className="text-xs font-bold text-green-400">Conectado</p>
              </>
            ) : (
              <>
                <div className="bg-red-400 rounded-full p-1"></div>
                <p className="text-xs font-bold text-red-400">Desconectado</p>
              </>
            )}
          </div>

          <div className=" flex-1 flex gap-2 justify-end">
            <Link
              href={tiktok.length ? tiktok[0].name : ""}
              target="_blank"
              title="Ver perfil"
              className={`flex-1 max-w-24 hover:text-white hover:bg-blue-900  hover:border-blue-900 cursor-pointer rounded-md p-2 flex items-center justify-center text-xs gap-2 bg-transparent border transition-all border-gray-200 ${
                tiktok.length === 0 ? "pointer-events-none text-gray-400" : ""
              }`}
            >
              <ExternalLink className="size-4 "  strokeWidth={1.5} />
              Ver Perfil
            </Link>
            <button
              onClick={() => handleDelete(tiktok[0].id)}
              disabled={tiktok.length === 0}
              title="Editar"
              className="flex-1 max-w-24 hover:text-white hover:border-red-500 cursor-pointer rounded-md p-2 flex items-center hover:bg-red-500 justify-center text-xs gap-2 bg-transparent border transition-all border-gray-200 disabled:cursor-auto disabled:opacity-50"
            >
              <Trash2 className="size-4"  strokeWidth={1.5} />
              
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
