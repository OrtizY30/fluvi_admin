import { updateModifier } from "@/actions/modifier/update-modifier-action";
import { FluviToast } from "@/components/ui/FluviToast";
import { Modifier } from "@/src/schemas";
import {
  IconButton,
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
import { useRouter } from "next/navigation";
import { ClipboardList } from "lucide-react";
import RecipeManager from "../../inventory/RecipeManager";

export default function ModifierDetailsDrawer({
  modifier,
}: {
  modifier: Modifier;
}) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: modifier.name || "",
    price: modifier.price ?? "",
  });

  const [expanded, setExpanded] = useState(false);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const [state, dispatch] = useActionState(
    updateModifier.bind(null, modifier.id),
    { errors: [], success: "" }, // 👈 estado inicial
  );

  useEffect(() => {
    if (state.errors.length) {
      state.errors.forEach((error) =>
        toast.error(<FluviToast type="error" msg={error} />),
      );
    }
    if (state.success) {
      toast.success(<FluviToast type="success" msg={state.success} />);
      router.refresh();
      // onClose();
    }
  }, [state, router]);

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
           if (name === "name" && value.trim() === "") {
            return;
          }
          dispatch({ [name]: parsedValue === "" ? null : parsedValue });
        });
      }, 2000);
    },
    [dispatch],
  );

  return (
    <div className="flex flex-wrap items-center justify-between gap-y-2">
      <div className="w-full flex gap-2">
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
              borderRadius: 4,
            },
            "& .MuiInputBase-input": {
              fontSize: "16px", // 👈 tamaño del texto que escribes
            },
            "& .MuiInputLabel-root": {
              fontSize: "16px", // 👈 tamaño del label cuando está normal
            },
            "& .MuiInputLabel-shrink": {
              fontSize: "14px", // 👈 tamaño del label cuando se eleva (opcional)
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
              borderRadius: 4,
            },
            "& .MuiInputBase-input": {
              fontSize: "16px", // 👈 tamaño del texto que escribes
            },
            "& .MuiInputLabel-root": {
              fontSize: "16px", // 👈 tamaño del label cuando está normal
            },
            "& .MuiInputLabel-shrink": {
              fontSize: "14px", // 👈 tamaño del label cuando se eleva (opcional)
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

      <div className="flex items-center gap-2">
        <IconButton
          size="small"
          onClick={() => setExpanded(!expanded)}
          className={expanded ? "text-brand-primary" : "text-gray-400"}
        >
          <ClipboardList size={20} />
        </IconButton>
        <BtnDeleteModifier modifier={modifier} />
      </div>

      {expanded && (
        <div className="w-full mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <RecipeManager
            modifierId={modifier.id}
            initialRecipe={modifier.recipeItems}
          />
        </div>
      )}
    </div>
  );
}
