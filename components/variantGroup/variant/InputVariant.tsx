import { updateVariant } from "@/actions/variant/update-variant-action";
import { FluviToast } from "@/components/ui/FluviToast";
import { Variant } from "@/src/schemas";
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

export default function InputVariant({ variant }: { variant: Variant }) {
  const [formData, setFormData] = useState({
    name: variant.name,
  });
  const updateVariantWithId = updateVariant.bind(null, variant.id);

  const [state, dispatch] = useActionState(updateVariantWithId, {
    errors: [],
    success: "",
    data: formData
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
    }
  }, [state]);

  // 🔥 Manejar cambios con debounce
  const handleChange = useCallback(
  (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      if (value.trim() && value !== String(variant[name as keyof Variant] ?? "")) {
        const fd = new FormData();
        fd.append("field", name);   // 👈 el input decide el campo
        fd.append("value", value);  // 👈 el valor actualizado

        startTransition(() => {
          dispatch(fd);
        });
      }
    }, 1000);
  },
  [variant, dispatch]
);

  return (
    <TextField
      id="standard-basic"
      name="name"
      label="Variante"
      variant="standard"
      value={formData.name}
      onChange={handleChange}
      size="small"
      sx={{
        "& .MuiInputBase-input": {
          fontSize: "1rem",
          padding: "0px 0",
          mt: "-5px",
        },
        "& .MuiInputLabel-root": {
          fontSize: "0.875rem",

        },
           "& .MuiOutlinedInput-root": {
              borderRadius: 4, // aquí se aplica el borderRadius al input
            },
      }}
      
    />
  );
}
