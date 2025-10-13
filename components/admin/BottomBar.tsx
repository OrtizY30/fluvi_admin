import { GalleryVerticalEnd, Menu, Palette } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function BottomBar() {
  return (
    <div className='md:hidden h-16 w-full  fixed bottom-0 left-0 bg-brand-primary z-50 flex items-center justify-between'>
     <button className='flex cursor-pointer px-6 w-full  text-white text-xs font-bold'>
        <Link href={'/admin/setting-theme'} className='flex  w-full flex-col items-center justify-center'>
        <Palette className='size-6' strokeWidth={2} />
        Temas
        </Link>
     </button>
     <button className='flex cursor-pointer  px-6 w-full  text-white text-xs font-bold'>
       <Link href={'/admin/productos'} className='flex w-full flex-col items-center justify-center'>
         <GalleryVerticalEnd className='size-6' strokeWidth={2} />
         Menú
       </Link>
     </button>
     <button className='flex cursor-pointer  px-6 w-full  text-white text-xs font-bold'>
       <Link href={'#'} className='flex w-full flex-col items-center justify-center'>
         <Menu className='size-6' strokeWidth={2} />
         Más 
       </Link>
     </button>
    
    </div>
  ) 
}
 