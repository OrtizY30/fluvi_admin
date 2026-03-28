"use client";

import { updateProduct } from "@/actions/product/update-product-action";
import { Product } from "@/src/schemas";
import { Drawer, TextField, Typography, Button } from "@mui/material";
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
        toast.error(<FluviToast type="error" msg={error} />),
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
          type === "checkbox" ? String(checked ?? false) : value,
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
    [product, dispatch],
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
          borderTopLeftRadius: 0,
          overflow: "hidden",
          [theme.breakpoints.up("md")]: {
            borderTopLeftRadius: "50px",
            width: "1000px",
          },
          [theme.breakpoints.up("lg")]: {
            width: "1150px",
          },
        }),
      }}
    >
      <div className="w-full overflow-hidden bg-slate-50 relative h-full flex flex-col">
        {/* Header Superior - Editorial Style */}
        <div className="p-6 md:p-8 flex items-center justify-between bg-white border-b border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] z-[100]">
          <div className="flex items-center gap-5">
            <div
              className="bg-rose-50 p-3 rounded-2xl group cursor-pointer hover:bg-rose-100 transition-all shadow-sm"
              onClick={onClose}
            >
              <X className="size-6 text-[#E20A33] group-hover:rotate-90 transition-transform" />
            </div>
            <div>
              <Typography
                sx={{
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  color: "grey.800",
                  tracking: "-0.025em",
                  lineHeight: 1,
                  mb: 0.5,
                }}
              >
                Detalles del Producto
              </Typography>
              <Typography
                sx={{
                  fontSize: "8px",
                  color: "grey.400",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  lineHeight: 1,
                }}
              >
                ESTADÍSTICAS DE GESTIÓN Y CULINARIAS
              </Typography>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={onClose}
              variant="text"
              sx={{
                color: "#E20A33",
                fontWeight: "normal",
                fontSize: "0.8rem",
                boxShadow: "none",
                "&:hover": {
                  bgcolor: "transparent",
                  boxShadow: "none",
                  textDecoration: "underline",
                },
              }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              form="product-form"
              variant="contained"
              sx={{
                bgcolor: "#E20A33",
                borderRadius: "16px",
                px: 4,
                py: 1.2,
                fontWeight: "normal",
                textTransform: "none",
                fontSize: "1rem",
                boxShadow: "none",
                "&:hover": { bgcolor: "#ce072d", boxShadow: "none" },
              }}
            >
              Guardar Cambios
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-12 pt-10">
          <form id="product-form" noValidate className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-[44%_1fr] gap-16 items-start">
              {/* Columna Izquierda: Identidad y Datos Básicos */}
              <div className="space-y-10">
                {/* Imagen del Producto - Estilo Stitch Card */}
                <div className="relative aspect-video w-full overflow-hidden rounded-[25px] bg-white group transition-all hover:scale-[1.01]">
                  <ImageUpload
                    setImageUrl={setImageUrl}
                    image={formData.image}
                    imageUrl={imageUrl}
                    onChangeField={handleChangeField}
                  />
                  <div className="absolute top-8 left-8">
                    <span className="bg-[#E20A33] text-white text-[10px] px-3.5 py-1.5 font-semibold rounded-lg shadow-xl border border-white/20">
                      CULINARY MASTER
                    </span>
                  </div>
                </div>

                <div className="space-y-8 px-2">
                  <div>
                    <Typography
                      variant="overline"
                      sx={{
                        fontSize: "10px",
                        fontWeight: 900,
                        color: "grey.400",
                        ml: 1,
                        mb: 1,
                        display: "block",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                      }}
                    >
                      Nombre del Item
                    </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      name="name"
                      label="Product Name"
                      placeholder="Ej: Hamburguesa con Queso"
                      value={formData.name}
                      onChange={handleChange}
                      size="small"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "20px",
                          bgcolor: "white",
                          p: 0.5,
                          "&:hover": { bgcolor: "#f8fafc" },
                        },
                      }}
                    />
                  </div>

                  <div>
                    <Typography
                      variant="overline"
                      sx={{
                        fontSize: "10px",
                        fontWeight: 900,
                        color: "grey.400",
                        ml: 1,
                        mb: 1,
                        display: "block",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                      }}
                    >
                      Descripción Editorial
                    </Typography>
                    <TextField
                      name="description"
                      label="Product Description"
                      placeholder="Cuentales qué hace especial a este producto..."
                      value={formData.description}
                      onChange={handleChange}
                      fullWidth
                      multiline
                      rows={6}
                      variant="outlined"
                      size="small"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "24px",
                          bgcolor: "white",
                          p: 0.5,
                        },
                      }}
                    />
                  </div>

                  <ModeSimple
                    price={formData.price}
                    onChange={handleChange}
                    product={product!}
                  />
                </div>
              </div>

              {/* Columna Derecha: Gestión Integral (Opciones y Extras) */}
              <div className="space-y-10">
                <OpcionesAvanzadas
                  product={product}
                  modifiers={formData.modifiers}
                  setFormData={setFormData}
                  formData={formData}
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
        </div>

        {/* Sticky Footer Premium */}
        <div className="p-6 md:px-14 bg-white/70 backdrop-blur-3xl border-t border-gray-100 flex items-center justify-between z-50">
          <div className="hidden md:flex items-center gap-2">
            <div className="size-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">
              Auto-Syncing with Main Kitchen
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={onClose}
              variant="text"
              sx={{
                color: "grey.400",
                fontWeight: 700,
                px: 4,
                borderRadius: "16px",
                textTransform: "capitalize",
                fontSize: "0.875rem",
                "&:hover": { bgcolor: "grey.100" },
              }}
            >
              Descartar
            </Button>
            <Button
              type="submit"
              form="product-form"
              variant="contained"
              sx={{
                bgcolor: "#E20A33",
                borderRadius: "24px",
                px: 8,
                py: 2,
                fontWeight: 900,
                textTransform: "none",
                fontSize: "1rem",
                boxShadow: "0 20px 45px -12px rgba(226, 10, 51, 0.6)",
                "&:hover": {
                  bgcolor: "#c2082b",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              }}
            >
              Publicar Cambios
            </Button>
          </div>
        </div>
      </div>
    </Drawer>
  );
}
