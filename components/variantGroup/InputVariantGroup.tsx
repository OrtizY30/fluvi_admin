import {  VariantGroup } from "@/src/schemas";
import { TextField } from "@mui/material";
import React, {
  useActionState,
  useEffect,
  useState,
  useCallback,
  useRef,
  startTransition,
} from "react";
import { toast } from "react-toastify";
import { FluviToast } from "../ui/FluviToast";
import { updateTitleVariantGroup } from "@/actions/variantGroup/update-title-action";
import { useRouter } from "next/navigation";

export default function InputVariantGroup({
  variantGroup,
}: {
  variantGroup: VariantGroup;
}) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: variantGroup?.title || "",
  });
  const updateTitleVariantGroupWithId = updateTitleVariantGroup.bind(
    null,
    variantGroup!.id
  );

  const [state, dispatch] = useActionState(updateTitleVariantGroupWithId, {
    errors: [],
    success: "",
    data: {
      title: formData.title,
    },
  });

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (state.errors?.length) {
      state.errors.forEach((error) =>
        toast.error(<FluviToast type="error" msg={error} />)
      );
    }
    if (state.success) {
      toast.success(<FluviToast type="success" msg={state.success} />);
      router.refresh()
    }
  }, [state, router]);

  // 🔥 Manejar cambios con debounce
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      setFormData((prev) => ({ ...prev, title: value }));

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        if (value.trim() && value !== variantGroup?.title) {
          const fd = new FormData();
          fd.append("title", value.trim());

          startTransition(() => {
            dispatch(fd);
          });
        }
      }, 2000); // ⏳ espera 2s desde la última tecla
    },
    [variantGroup?.title, dispatch]
  );

  return (
    <TextField
      id="outlined-basic"
      variant="outlined"
      size="small"
      name="title"
      label="Ponle un título a tus variantes"
      value={formData.title}
      onChange={handleChange}
      className="w-full"
      sx={{
        mb: 2,

        "& .MuiOutlinedInput-root": {
          borderRadius: 4, // aquí se aplica el borderRadius al input
        },
      }}
    />
  );
}
