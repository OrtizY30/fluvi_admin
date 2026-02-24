'use client'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React from 'react'

export default function HeaderPedidos() {
  const router = useRouter();
  return (
    <header className="w-full space-y-3 pb-4 ">
      <button
        title="Página anterior"
        onClick={() => router.push('/admin/productos')}
        className="rounded-md cursor-pointer flex justify-center  w-20 shadow-sm md:m-4 m-2 shadow-black/30 p-2"
      >
        <ArrowLeft className="size-5 text-gray-500" strokeWidth={3} />
      </button>
     <h1 className="md:text-3xl px-10 text-xl font-black">Configuración de Pedidos</h1>
    </header>
     
  )
}
