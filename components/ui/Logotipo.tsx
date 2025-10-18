import Image from 'next/image'
import React from 'react'

export default function Logotipo() {
  return (
    <div className="h-[25%] flex items-center justify-end flex-col">
      <div className="w-[400px] h-20 relative ">
        <Image src={"/logo-fluvi.svg"} fill alt="logo fluvi" />
      </div>
      <p className='text-white text-xs font-semibold'>
        Tu menú digital con pedidos directos a WhatsApp.
      </p>
    </div>
  )
}
