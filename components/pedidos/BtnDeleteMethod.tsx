import { deleteMethod } from '@/actions/paymentMethod/delete-method-action';
import { Methods } from '@/src/schemas'
import { IconButton } from '@mui/material'
import {  Trash2 } from 'lucide-react'
import React, { startTransition, useActionState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { FluviToast } from '../ui/FluviToast';
import { useRouter } from 'next/navigation';

export default function BtnDeleteMethod({methodId} : {methodId : Methods['id']}) {
    const router = useRouter()
      const deleteMethodWithId = deleteMethod.bind(null, methodId);
      const [state, dispatch, isPending] = useActionState(deleteMethodWithId, {
        errors: [],
        success: "",
      });
    
      const handleClick = () => {
        startTransition(() => {
          dispatch();
        });
      };
    
      useEffect(() => {
        if (state.errors) {
          state.errors.forEach((error) => {
            toast.error(<FluviToast type={"error"} msg={error} />);
          });
        }
    
        if (state.success) {
          toast.success(<FluviToast type="success" msg={state.success} />);
          router.refresh()
        }
      }, [state]);
  return (
    <IconButton disabled={isPending} onClick={handleClick}>
      <Trash2  className='size-5 -mt-1 cursor-pointer text-red-600 hover:text-red-800 transition-all disabled:opacity-60' strokeWidth={1.5}/>
    </IconButton>
  )
}
