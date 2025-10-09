import { updateVariant } from "@/actions/variant/update-variant-action";
import { FluviToast } from "@/components/ui/FluviToast";
import { Variant } from "@/src/schemas";
import { InputAdornment, inputBaseClasses, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import React, {
  startTransition,
  useActionState,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "react-toastify";

export default function InputVariantPrice({ variant }: { variant: Variant }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    price: variant.price,
  });
  const updateVariantWithId = updateVariant.bind(null, variant.id);

  const [state, dispatch] = useActionState(updateVariantWithId, {
    errors: [],
    success: "",
    data: formData,
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
      router.refresh();
    }
  }, [state, router]);

  // 🔥 Manejar cambios con debounce
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      // convertir a número si el campo es price o discount
      const parsedValue =
        name === "price" || name === "discount"
          ? value === ""
            ? ""
            : Number(value)
          : value;

      setFormData((prev) => ({ ...prev, [name]: parsedValue }));

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        if (
          value.trim() &&
          value !== String(variant[name as keyof Variant] ?? "")
        ) {
          const fd = new FormData();
          fd.append("field", name);
          fd.append("value", String(parsedValue)); // 👈 lo mandamos como string, backend lo parsea

          startTransition(() => {
            dispatch(fd);
          });
        }
      }, 1000);
    },
    [variant, dispatch]
  );

  return (
    <div>
      <TextField
        type="number"
        id="outlined-basic"
        variant="outlined"
        name="price"
        label="Precio"
        value={formData.price}
        onChange={handleChange}
        size="small"
        sx={{
             "& .MuiOutlinedInput-root": {
              borderRadius: 4, // aquí se aplica el borderRadius al input
            },
        }}
        slotProps={{
          input: {
            // 👈 aquí lo cambiamos
            startAdornment: (
              <InputAdornment
                position="start"
                sx={{
                  opacity: 0,
                  pointerEvents: "none",
                  [`[data-shrink=true] ~ .${inputBaseClasses.root} > &`]: {
                    opacity: 1,
                  },
                }}
              >
                <span className=" text-gray-500 text-lg">$</span>
              </InputAdornment>
            ),
          },
        }}
      />
    </div>
  );
}
