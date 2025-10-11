import { updateProfile } from "@/actions/profile/update-profile-action";
import { Business } from "@/src/schemas";
import { TextField } from "@mui/material";
import React, {
  startTransition,
  useActionState,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "react-toastify";
import { FluviToast } from "../ui/FluviToast";
import { useRouter } from "next/navigation";

export default function InputNameProfile({ name }: { name: Business["name"] }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
  });

  useEffect(() => {
    setFormData({ name: name! });
  }, [name]);

  const [state, dispatch] = useActionState(updateProfile, {
    success: "",
    errors: [],
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
       router.refresh(); // 👈 refrescar la página para ver los cambios
    }
  }, [state, router]);

  // 🔥 Manejar cambios con debounce
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;

      const parsedValue: string | null = value;

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
          if (parsedValue !== "") {
            // solo mando si hay valor
            dispatch({ [name]: parsedValue });
          }
        });
      }, 1000);
    },
    [dispatch]
  );

  return (
    <div className="w-full">
      <TextField
        name="name"
        onChange={handleChange}
        id="standard-basic"
        label="Nombre de la tienda"
        variant="standard"
        value={formData.name ?? ""}
        className="w-full font-bold text-white rounded-sm"
        sx={{
          mb: 1,
          background: "#ffffff5b",
          p: 1,
          "& .MuiInputBase-input": {
            fontWeight: 900,
            fontSize: "1.2rem",
          },
          "& .MuiInputLabel-root": {
          fontWeight: 500,
          color: '#000000',
          p: 1,
          mt: .5
        },
        }}
      />
    </div>
  );
}
