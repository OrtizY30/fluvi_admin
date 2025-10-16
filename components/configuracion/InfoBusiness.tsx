"use client";

import { Branch } from "@/src/schemas";
import { useBusinessStore } from "@/store/useBusinessStore";
import { TextField } from "@mui/material";
import BtnEditStore from "./BtnEditStore";
import BtnEditHorary from "./BtnEditHorary";
import BtnEditSocialMedia from "./BtnEditSocialMedia";
import { FluviToast } from "../ui/FluviToast";
import { toast } from "react-toastify";
import {
  startTransition,
  useActionState,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { updateProfile } from "@/actions/profile/update-profile-action";
import { Store } from "lucide-react";
import { useRouter } from "next/navigation";

type ContentTiendaProps = {
  branches?: Branch[];
};

export default function InfoBusiness({ branches }: ContentTiendaProps) {
  const business = useBusinessStore((state) => state.business);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: business?.name || "",
    description: business?.description || "",
  });

  // sincronizar formData cuando cambie business
  useEffect(() => {
    if (!business) return;

    setFormData({
      name: business.name || "",
      description: business.description || "",
    });
  }, [business]);

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
      router.refresh(); // refrescar la página para obtener los datos actualizados
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
    <div className="w-full md:p-6 p-2 bg-white mx-auto space-y-3 border md:rounded-xl border-gray-200  md:shadow-md">
      <div className="flex items-center gap-2 text-gray-800">
        <Store strokeWidth={2} />
        <h1 className="font-black text-xl">Informacion del Negocio</h1>
      </div>

      <div className="p-2 md:px-10 py-3 flex md:flex-row flex-col items-center text-gray-800 border-b border-gray-200">
        <p className="w-full font-semibold">Nombre del negocio</p>
        <TextField
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full"
          id="outlined-basic"
          variant="outlined"
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 4, // aquí se aplica el borderRadius al input
            },
          }}
        />
        {/* <InputNameProfile name={business!.name} /> */}
      </div>

      <div className="p-2 md:px-10 py-3 flex md:flex-row flex-col items-center text-gray-800 border-b border-gray-200">
        <p className="w-full font-semibold">Descripción del negocio</p>
        <TextField
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full"
          multiline
          rows={4}
          id="outlined-basic"
          variant="outlined"
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 4, // aquí se aplica el borderRadius al input
            },
          }}
        />
        {/* <InputNameProfile name={business!.name} /> */}
      </div>

      {/* Contenedor de tiendas */}
      <div className="p-2 md:px-10 text-gray-800 py-3 flex items-center border-b border-gray-200">
        <p className="w-full font-semibold">Tiendas</p>
        <div className="flex flex-col justify-end gap-4  w-full">
          {branches && branches.length > 0 ? (
            branches.map((branch) => (
              <div className="flex items-center " key={branch.id}>
                <p className="text-xs text-gray-600">{branch.name}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 font-bold">
              No tienes tiendas disponibles
            </p>
          )}
        </div>
        <BtnEditStore />
      </div>

      {/* Contenedor de horario */}
      <div className="p-2 md:px-10 text-gray-800 py-3 flex items-center border-b border-gray-200">
        <p className="w-full font-semibold">Horario de atención</p>
        <BtnEditHorary />
      </div>

      {/* Contenedor de Redes Sociales */}
      <div className="p-2 md:px-10 text-gray-800 py-3 flex items-center border-b border-gray-200">
        <p className="w-full font-semibold">Redes sociales</p>
        <BtnEditSocialMedia />
      </div>
    </div>
  );
}
