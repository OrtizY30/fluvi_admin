import React, { useState } from 'react'
import StoreForm from '../tiendas/StoreForm';
import { Pencil } from 'lucide-react';

export default function BtnEditStore() {
    const [open, setOpen] = useState(false)
    
      const openForm = () => {
        openDrawer(); // esta función actualiza la URL
      };
    
    
      const openDrawer = () => {
        setOpen(true)
      };
    
      const closeDrawer = () => {
        setOpen(false)
      };
  return (
    <>
       <button onClick={openForm} className="flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
            <Pencil className="size-4" />
            <p>Editar</p>
          </button>

          <StoreForm open={open} onClose={closeDrawer} />
    </>
  )
}
