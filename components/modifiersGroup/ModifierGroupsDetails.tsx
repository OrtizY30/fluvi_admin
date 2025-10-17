import { ModifierGroup } from "@/src/schemas";
import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
} from "@mui/material";
import BtnDeleteModifiersGroup from "./BtnDeleteModifiersGroup";
import InputModifiersGroup from "./InputModifiersGroup";
import {
  startTransition,
  useActionState,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { updateModifierGroup } from "@/actions/modifiersGroup/update-group-action";
import { toast } from "react-toastify";
import { FluviToast } from "../ui/FluviToast";
import ModifierDetailsDrawer from "./Modifiers/ModifierDetailsDrawer";
import BtnCreateModifier from "@/components/modifiersGroup/Modifiers/BtnCreateModifier";
import { useRouter } from "next/navigation";

type ModifierDetailsProps = {
  modifiersGroups: ModifierGroup;
  expanded: boolean;
  toggleModifiersGroups: (id: number) => void;
};

export default function ModifierGroupsDetails({
  modifiersGroups,
  expanded,
  toggleModifiersGroups,
}: ModifierDetailsProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: modifiersGroups.name || "",
    required: modifiersGroups.required || false,
    selectionType: modifiersGroups.selectionType || "SINGLE",
  });

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const [state, dispatch] = useActionState(updateModifierGroup.bind(null, modifiersGroups.id),
    { 
      errors: [], 
      success: "" 
    } // 👈 estado inicial
  );

  useEffect(() => {
    if (state.errors.length) {
      state.errors.forEach((error) =>
        toast.error(<FluviToast type="error" msg={error} />)
      );
    }
    if (state.success) {
      toast.success(<FluviToast type="success" msg={state.success} />);
      router.refresh(); // 👈 refrescar la página para ver los cambios
    }
  }, [state, router]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;

      let parsedValue: string | number | boolean = value;
      if (name === "required") {
        parsedValue = value === "true"; // <- convierte el string a boolean
      } else if (name === "selectionType") {
        // aquí lo mandamos como enum
        parsedValue = value as "SINGLE" | "MULTIPLE";
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
        const fd = new FormData();
        fd.append(name, String(parsedValue)); // 👈 el backend recibe { [name]: value }
        startTransition(() => {
          dispatch({ [name]: parsedValue });
        });
      }, 1000);
    },
    [dispatch]
  );

  return (
    <Accordion
      key={modifiersGroups.id}
      expanded={!!expanded} // 👈 solo abre si está en true
      sx={{
        border: "1px solid rgb(240, 239, 239)",
        // borderRadius: 2,
        boxShadow: "0px 0px 0px rgba(0,0,0,0.1)",
        overflow: "hidden",
      }}
    >
      <AccordionSummary
        sx={{
          bgcolor: "#f4f6f8",
          // borderBottom: "1px solid rgb(234, 233, 233)",
          maxHeight: 4,
          "& .MuiAccordionSummary-content": { margin: 0 },
          "& .MuiAccordionSummary-content.Mui-expanded": { margin: 0 },
          padding: "0px 0px",
        }}
        component="div"
        expandIcon={
          <IconButton
            component="span"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              toggleModifiersGroups(modifiersGroups.id);
            }}
            className="rounded-xl"
          >
            <ExpandMore
              style={{
                transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s",
              }}
            />
          </IconButton>
        }
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex w-full gap-2 px-4 items-center">
            <InputModifiersGroup
              name={formData.name}
              handleChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2">
            {/* <p className="font-semibold text-sm">{formatCurrency(variant.price, user!.country)}</p> */}

            {/* <BtnDeleteVariant variant={variant} /> */}
            <BtnDeleteModifiersGroup modifiersGroups={modifiersGroups} />
          </div>
        </div>
      </AccordionSummary>

      <AccordionDetails sx={{ borderRadius: 2, padding: 0 }}>
        <form className="space-y-4 md:p-4 p-2">
          {/* Required */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">¿Es obligatorio?</label>

            <div className="flex gap-4">
              <label className="text-gray-500 text-sm">
                <input
                  className="accent-brand-primary"
                  type="radio"
                  name="required"
                  value="true"
                  checked={formData.required === true}
                  onChange={handleChange}
                />{" "}
                Sí
              </label>
              <label className="text-gray-500 text-sm">
                <input
                  className="accent-brand-primary"
                  type="radio"
                  name="required"
                  value="false"
                  checked={formData.required === false}
                  onChange={handleChange}
                />{" "}
                No
              </label>
            </div>
          </div>

          {/* Selected Type */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">
              ¿Cuantos modificadores se pueden seleccionar?
            </label>
            <div className="flex gap-4">
              <label className="text-gray-500 text-sm">
                <input
                  className="accent-brand-primary"
                  type="radio"
                  name="selectionType"
                  value="SINGLE"
                  checked={formData.selectionType === "SINGLE"}
                  onChange={handleChange}
                />{" "}
                Solo uno
              </label>

              <label className="text-gray-500 text-sm">
                <input
                  className="accent-brand-primary"
                  type="radio"
                  name="selectionType"
                  value="MULTIPLE"
                  checked={formData.selectionType === "MULTIPLE"}
                  onChange={handleChange}
                />{" "}
                Varios
              </label>
            </div>
          </div>
        </form>

        <div className="border-t-2  flex gap-2 flex-col items-center justify-center border-slate-200 md:p-4 p-2 ">
          <div className="w-full my-3">
            <p className="text-md text-left font-bold">Modificadores</p>
          </div>
          {modifiersGroups.modifiers.length > 0 ? (
            <>
              <div className="w-full flex flex-col gap-4 ">
                {modifiersGroups.modifiers.map((modifier) => (
                  <ModifierDetailsDrawer
                    key={modifier.id}
                    modifier={modifier}
                  />
                ))}
              </div>
            </>
          ) : (
            <p className="text-center text-sm text-gray-700 font-bold">
              Aún no tienes modificadores disponibles
            </p>
          )}

          <BtnCreateModifier modifiersGroup={modifiersGroups} />
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
