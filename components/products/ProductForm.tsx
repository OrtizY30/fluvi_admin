"use client";

import { updateProduct } from "@/actions/product/update-product-action";
import { Product } from "@/src/schemas";
import { Drawer, TextField } from "@mui/material";
import {
  startTransition,
  useActionState,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "react-toastify";
import { FluviToast } from "../ui/FluviToast";
import ImageUpload from "./ImageUpload";
import OpcionesAvanzadas from "./OpcionesAvanzadas";
import ModeSimple from "./ModeSimple";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

type ProductFormProps = {
  product: Product;
  open: boolean;
  setOpen: () => void;
};

export default function ProductForm({
  open,
  setOpen,
  product,
}: ProductFormProps) {
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: product?.name || "",
    price: product?.price || 0,
    description: product?.description || "",
    image: product?.image || "",
    isOnSale: product?.isOnSale || false,
    discount: product?.discount || 0,
    modifiers: product?.modifiers?.map((m) => m.modifierGroup.id) || [],
    modifiersGroup: product?.modifiers?.map((m) => m.modifierGroup) || [],
  });
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const updateProductWithId = updateProduct.bind(null, product!.id!);
  const [state, dispatch] = useActionState(updateProductWithId, {
    errors: [],
    success: "",
    data: formData,
  });

  useEffect(() => {
    if (state.errors.length) {
      state.errors.forEach((error) =>
        toast.error(<FluviToast type="error" msg={error} />)
      );
    }
    if (state.success) {
      toast.success(<FluviToast type="success" msg={state.success} />);
      // onClose();
      router.refresh(); // refrescar la página para obtener los datos actualizados
    }
  }, [state, router]);

  const onClose = () => {
    setOpen();
  };

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value, type } = e.target;

      // 👇 Si el input es un checkbox, forzamos el cast
      const checked =
        type === "checkbox" && "checked" in e.target
          ? (e.target as HTMLInputElement).checked
          : undefined;

      // actualizar estado local
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));

      // limpiar debounce previo
      if (debounceRef.current) clearTimeout(debounceRef.current);

      // nuevo debounce
      debounceRef.current = setTimeout(() => {
        if (!product) return;

        const fd = new FormData();
        fd.append("field", name);
        fd.append(
          "value",
          type === "checkbox" ? String(checked ?? false) : value
        );

        startTransition(() => {
          // Si es el campo "name" y está vacío, no disparamos la acción
          if (name === "name" && value.trim() === "") {
            return;
          }

          // Para todo lo demás, sí la disparamos
          dispatch(fd);
        });
      }, 2000); // ⏳ espera 2s desde la última tecla
    },
    [product, dispatch]
  );

  const handleChangeField = (field: string, value: string) => {
    const fd = new FormData();
    fd.append("field", field);
    fd.append("value", value);

    startTransition(() => {
      dispatch(fd);
    });
  };
  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor="right"
      PaperProps={{
        sx: (theme) => ({
          borderTopLeftRadius: 0, // por defecto en mobile (xs)
          overflow: "hidden",
          [theme.breakpoints.up("md")]: {
            borderTopLeftRadius: "26px", // en md o superior
          },
        }),
      }}
    >
      <div className="md:w-md w-screen  overflow-hidden bg-slate-50 relative h-full flex flex-col">
        {/* Imagen */}
        <div className="absolute  z-50 top-2 bg-black/50 rounded-full left-2 cursor-pointer text-white p-2">
          <X onClick={onClose} className="size-6" />
        </div>
        <ImageUpload
          setImageUrl={setImageUrl}
          image={formData.image}
          imageUrl={imageUrl}
          onChangeField={handleChangeField}
        />

        <div className="flex-1 overflow-y-auto p-2 py-6 md:p-6">
          <form id="product-form" noValidate className="space-y-6">
            {/* 👇 Modo oculto */}

            {/* Nombre */}
            <div>
              <TextField
                className="w-full"
                id="outlined-basic"
                variant="outlined"
                name="name"
                label="Producto"
                value={formData.name}
                onChange={handleChange}
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 4, // aquí se aplica el borderRadius al input
                  },
                }}
              />
            </div>

            {/* Descripción */}
            <div>
              <TextField
                name="description"
                label="Descripción"
                value={formData.description}
                onChange={handleChange}
                className="w-full"
                multiline
                rows={3} // Puedes ajustar cuántas filas quieres por defecto
                id="outlined-basic"
                variant="outlined"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 4, // aquí se aplica el borderRadius al input
                  },
                }}
              />
            </div>

            {/* Toggle entre Simple / Variantes */}
            <ModeSimple
              price={formData.price}
              onChange={handleChange}
              product={product!}
            />

            <OpcionesAvanzadas
              product={product}
              modifiers={formData.modifiers}
              setFormData={setFormData}
              formData={formData}
              onChange={handleChange}
            />
          </form>
        </div>
      </div>
    </Drawer>
  );
}
