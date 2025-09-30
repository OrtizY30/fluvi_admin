import { Pencil } from 'lucide-react';
import React, { useState } from 'react'
import SocialmediaModal from '../sociales/SocialModal';

export default function BtnEditSocialMedia() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div onClick={() => setOpen(true)} className="flex w-full justify-end items-center gap-1 text-blue-500 cursor-pointer hover:underline">
        <Pencil className="size-4" />
        <p className="">Editar</p>
      </div>

      <SocialmediaModal open={open} setOpen={() => setOpen(false)} />
    </>
  )
}
