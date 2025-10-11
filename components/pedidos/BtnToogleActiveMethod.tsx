import { Methods } from "@/src/schemas";
import React, {
  startTransition,
  useActionState,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { FluviToast } from "../ui/FluviToast";
import { toogleActiveMethod } from "@/actions/paymentMethod/toogle-active-method-action";
import { useRouter } from "next/navigation";

export default function BtnToogleActiveMethod({ method }: { method: Methods }) {
  const router = useRouter();
  // 🔧 Agregamos estado local para manejar el switch
  const [isChecked, setIsChecked] = useState(method.active);

  // 🔧 Atamos la acción al ID del producto
  const toggleWithId = toogleActiveMethod.bind(null, method.id);

  // 🔧 useActionState para controlar estado del action
  const [state, dispatch, isPending] = useActionState(toggleWithId, {
    errors: [],
    success: "",
  });

  // 🔧 revertimos si falla el cambio
  useEffect(() => {
    if (state.errors.length > 0) {
      toast.error(<FluviToast type="error" msg={state.errors[0]} />);
      setIsChecked(method.active); // 🔧 revertir si error
    }

    if (state.success) {
      toast.success(<FluviToast type="success" msg={state.success} />);
      router.refresh(); // 🔧 refrescamos la página para ver cambios
    }
  }, [state, method.active, router]);

  // 🔧 Optimistic UI con cambio inmediato y luego dispatch
  const handleChange = () => {
    setIsChecked((prev) => !prev);
    startTransition(() => {
      dispatch(); // 🔧 hace el request al backend
    });
  };
  return (
  

    <label key={method.id} className="flex cursor-pointe w-full justify-between items-center">
      <span className="capitalize font-bold text-gray-700 text-md">
        {method.name}
      </span>
      <div>

      <input
      disabled={isPending}
        type="checkbox"
        value={method.name}
        checked={isChecked}
        onChange={handleChange}
        className="peer w-5 h-5 r accent-blue-700"
        />
        </div>
    </label>
        
  );
}
