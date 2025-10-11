import { GalleryVerticalEnd, Menu, Palette } from 'lucide-react'
import React from 'react'

export default function BottomBar() {
  return (
    <div className='md:hidden h-16 w-full fixed bottom-0 left-0 bg-brand-primary z-50 border-t border-t-gray-300 flex items-center justify-between'>
     <button className='flex cursor-pointer w-full px-6 flex-col items-center justify-center text-white text-xs font-bold'>
        <Palette className='size-6' strokeWidth={2.5} />
        Temas
     </button>
     <button className='flex cursor-pointer w-full px-6 flex-col items-center justify-center text-white text-xs font-bold'>
       <GalleryVerticalEnd className='size-6' strokeWidth={2.5} />
       Menú
     </button>
     <button className='flex cursor-pointer px-6 w-full flex-col items-center justify-center text-white text-xs font-bold'>
       <Menu className='size-6' strokeWidth={2.5} />
       Más
     </button>
    </div>
  ) 
}
