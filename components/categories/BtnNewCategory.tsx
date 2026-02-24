"use client";

import { createCategory } from "@/actions/category/create-category-action";
import { PlusIcon } from "lucide-react";
import React, { startTransition, useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { FluviToast } from "../ui/FluviToast";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";

export default function BtnNewCategory() {
  const router = useRouter();
  const [state, dispatch, isPending] = useActionState(createCategory, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => {
        toast.error(<FluviToast type={"error"} msg={error} />);
      });
    }

    if (state.success) {
      toast.success(<FluviToast type="success" msg={state.success} />, {});
      router.refresh();
    }
  }, [state, router]);

  const handleCategory = () => {
    startTransition(() => {
      dispatch();
    });
  };
  return (
    <button
      disabled={isPending}
      onClick={handleCategory}
      type="button"
      className="btn text-xs min-w-32 "
    >
      {isPending ? (
        <CircularProgress size="20px" sx={{color: 'white'}} />
      ) : (
        <>
          <PlusIcon className="size-4 font-extrabold" />
          Nueva Categoria
        </>
      )}
    </button>
  );
}
