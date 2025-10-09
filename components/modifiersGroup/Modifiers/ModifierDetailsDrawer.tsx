import { updateModifier } from "@/actions/modifier/update-modifier-action";
import { FluviToast } from "@/components/ui/FluviToast";
import { Modifier } from "@/src/schemas";
import {
  InputAdornment,
  inputBaseClasses,
  TextField,
} from "@mui/material";
import React, {
  startTransition,
  useActionState,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "react-toastify";
import BtnDeleteModifier from "./BtnDeleteModifier";

export default function ModifierDetailsDrawer({
  modifier,
}: {
  modifier: Modifier;
}) {
  const [formData, setFormData] = useState({
    name: modifier.name || "",
    price: modifier.price ?? "",
  });

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const [state, dispatch] = useActionState(
    updateModifier.bind(null, modifier.id),
    { errors: [], success: "" } // 👈 estado inicial
  );

  useEffect(() => {
    if (state.errors.length) {
      state.errors.forEach((error) =>
        toast.error(<FluviToast type="error" msg={error} />)
      );
    }
    if (state.success) {
      toast.success(<FluviToast type="success" msg={state.success} />);
      // onClose();
    }
  }, [state]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;

      let parsedValue: string | number | null = value;

      if (name === "price") {
        parsedValue = value === "" ? "" : Number(value);
      }

      // actualizar el formData local
      setFormData((prev) => ({
        ...prev,
        [name]: parsedValue,
      }));

      // limpiar debounce previo
      if (debounceRef.current) clearTimeout(debounceRef.current);

      // disparar el update al backend con el campo cambiado
      debounceRef.current = setTimeout(() => {
        startTransition(() => {
          dispatch({ [name]: parsedValue === "" ? null : parsedValue });
        });
      }, 1000);
    },
    [dispatch]
  );

  return (
    <div className="flex items-center justify-between">
      <div className="w-full flex gap-4">
        <TextField
          className=""
          id="outlined-basic"
          variant="outlined"
          name="name"
          label="Modificador"
          value={formData.name}
          onChange={handleChange}
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 4, // aquí se aplica el borderRadius al input
            },
          }}
        />

        <TextField
          type="number"
          className="w-32"
          id="outlined-basic"
          variant="outlined"
          name="price"
          label="Precio"
          value={formData.price ?? ""}
          onChange={handleChange}
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 4, // aquí se aplica el borderRadius al input
            },
          }}
          inputProps={{
            step: "0.01", // 👈 Aquí va el step
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

      <div>
        <BtnDeleteModifier modifier={modifier} />
      </div>
    </div>
  );
}
