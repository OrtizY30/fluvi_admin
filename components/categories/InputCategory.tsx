import { updateCategory } from "@/actions/category/update-category-action";
import { Category } from "@/src/schemas";
import { TextField } from "@mui/material";
import React, {
  useActionState,
  useEffect,
  useState,
  useTransition,
  useCallback,
  useRef,
  startTransition,
} from "react";
import { toast } from "react-toastify";
import { FluviToast } from "../ui/FluviToast";

export default function InputCategory({ category }: { category: Category }) {
  const [formData, setFormData] = useState({ name: category.name });
  const updateCategoryWithId = updateCategory.bind(null, category.id);

  const [state, dispatch] = useActionState(updateCategoryWithId, {
    errors: [],
    success: "",
    data: {
      name: formData.name,
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
    }
  }, [state]);

  // 🔥 Manejar cambios con debounce
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      setFormData((prev) => ({ ...prev, name: value }));

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        if (value.trim() && value !== category.name) {
          const fd = new FormData();
          fd.append("name", value.trim());

          startTransition(() => {
            dispatch(fd);
          });
        }
      }, 1000); // ⏳ espera 600ms desde la última tecla
    },
    [category.name, dispatch, startTransition]
  );

  return (
    <TextField
      id="standard-basic"
      name="name"
      label="Categoría"
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
      }}
    />
  );
}
