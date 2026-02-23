"use client";

import { useState, useEffect } from "react";
import {
  Drawer,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  IconButton,
  InputAdornment,
} from "@mui/material";
import {
  X,
  Save,
  Package,
  Scale,
  AlertTriangle,
  DollarSign,
  Edit3,
} from "lucide-react";
import {
  createIngredient,
  updateIngredient,
} from "@/actions/inventory/ingredients-actions";
import { toast } from "react-toastify";
import { FluviToast } from "../ui/FluviToast";
import { Ingredient } from "@/src/schemas";

type IngredientFormProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  ingredient?: Ingredient | null; // Null if creating new
};

const UNITS = [
  { value: "GRAMS", label: "Gramos (g)" },
  { value: "KILOGRAMS", label: "Kilogramos (kg)" },
  { value: "MILLILITERS", label: "Mililitros (ml)" },
  { value: "LITERS", label: "Litros (L)" },
  { value: "UNITS", label: "Unidades (un)" },
];

export default function IngredientForm({
  open,
  setOpen,
  ingredient,
}: IngredientFormProps) {
  const [loading, setLoading] = useState(false);
  const isEditing = !!ingredient;

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    try {
      const res = isEditing
        ? await updateIngredient(ingredient.id, formData)
        : await createIngredient(formData);

      if (res.error) {
        toast.error(<FluviToast type="error" msg={res.error} />);
      } else {
        toast.success(
          <FluviToast
            type="success"
            msg={isEditing ? "Insumo actualizado" : "Insumo creado"}
          />,
        );
        setOpen(false);
      }
    } catch (err) {
      toast.error(
        <FluviToast type="error" msg="Error al procesar la solicitud" />,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={() => setOpen(false)}
      PaperProps={{
        sx: {
          width: { xs: "100%", md: 480 },
          borderTopLeftRadius: { xs: 0, md: "24px" },
          borderBottomLeftRadius: { xs: 0, md: "24px" },
          overflow: "hidden",
        },
      }}
    >
      <Box className="h-full flex flex-col bg-white">
        {/* Header */}
        <Box className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <Box className="flex items-center gap-4">
            <div className="p-3 bg-brand-primary/10 rounded-2xl text-brand-primary border border-brand-primary/20 shadow-sm">
              {isEditing ? <Edit3 size={24} /> : <Package size={24} />}
            </div>
            <div>
              <Typography
                variant="h6"
                className="font-black text-gray-800 leading-tight"
              >
                {isEditing ? "Editar Insumo" : "Nuevo Insumo"}
              </Typography>
              <Typography
                variant="caption"
                className="text-gray-500 font-medium tracking-wide"
              >
                {isEditing
                  ? "Modifica los detalles del ingrediente"
                  : "Registra un ingrediente en tu despensa"}
              </Typography>
            </div>
          </Box>
          <IconButton
            onClick={() => setOpen(false)}
            size="small"
            className="hover:bg-gray-200 transition-colors"
          >
            <X size={20} />
          </IconButton>
        </Box>

        {/* Form Body - Increased spacing with space-y-10 */}
        <form
          action={handleSubmit}
          className="flex-1 overflow-y-auto p-8 space-y-10 custom-scroll"
        >
          {/* Section: Información Básica */}
          <section className="space-y-5">
            <Typography
              variant="overline"
              className="text-brand-primary font-black tracking-[0.1em] text-[10px] opacity-80"
            >
              Información Básica
            </Typography>
            <Box className="grid gap-6">
              <TextField
                name="name"
                label="Nombre del insumo"
                placeholder="Ej: Carne de Res, Harina, Coca-Cola 350ml"
                fullWidth
                required
                defaultValue={ingredient?.name || ""}
                variant="outlined"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "14px" } }}
              />
              <TextField
                select
                name="unit"
                label="Unidad de medida"
                fullWidth
                required
                defaultValue={ingredient?.unit || "GRAMS"}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "14px" } }}
              >
                {UNITS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </section>

          {/* Section: Stock e Inventario */}
          <section className="space-y-5">
            <Typography
              variant="overline"
              className="text-brand-primary font-black tracking-[0.1em] text-[10px] opacity-80"
            >
              Control de Stock
            </Typography>
            <Box className="grid grid-cols-2 gap-6">
              <TextField
                name="stock"
                label={
                  isEditing ? "Stock Actual (No editable)" : "Stock Inicial"
                }
                type="number"
                fullWidth
                required
                defaultValue={ingredient?.stock || 0}
                InputProps={{
                  readOnly: isEditing,
                  startAdornment: (
                    <InputAdornment position="start">
                      <Scale size={18} className="text-gray-400" />
                    </InputAdornment>
                  ),
                }}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "14px" } }}
              />
              <TextField
                name="minStock"
                label="Stock Mínimo"
                type="number"
                fullWidth
                required
                defaultValue={ingredient?.minStock || 0}
                helperText="Alerta de stock bajo"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AlertTriangle size={18} className="text-amber-500" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": { borderRadius: "14px" },
                  "& .MuiFormHelperText-root": {
                    fontSize: "10px",
                    fontWeight: 600,
                  },
                }}
              />
            </Box>
          </section>

          {/* Section: Costos */}
          <section className="space-y-5">
            <Typography
              variant="overline"
              className="text-brand-primary font-black tracking-[0.1em] text-[10px] opacity-80"
            >
              Finanzas
            </Typography>
            <TextField
              name="averageCost"
              label="Costo Promedio (unitario)"
              type="number"
              fullWidth
              required
              defaultValue={ingredient?.averageCost || 0}
              placeholder="0.00"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DollarSign size={18} className="text-green-600" />
                  </InputAdornment>
                ),
              }}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "14px" } }}
            />
            <Box className="p-5 mt-5 bg-blue-50/50 rounded-2xl border border-blue-100 flex gap-4">
              <div className="flex-shrink-0 mt-0.5 text-blue-500">
                <AlertTriangle size={16} />
              </div>
              <Typography
                variant="caption"
                className="text-blue-700 italic leading-relaxed text-[11.5px]"
              >
                El costo unitario es fundamental para calcular automáticamente
                el margen de rentabilidad de tus productos configurados con esta
                receta.
              </Typography>
            </Box>
          </section>

          {/* Actions - Spacer */}
          <div className="h-6"></div>

          <Box className="flex gap-4">
            <Button
              fullWidth
              variant="outlined"
              onClick={() => setOpen(false)}
              sx={{
                borderRadius: "14px",
                py: 1.8,
                borderColor: "gray.200",
                color: "gray.600",
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": { borderColor: "gray.400", bgcolor: "gray.50" },
              }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              startIcon={!loading && <Save size={20} />}
              sx={{
                borderRadius: "14px",
                py: 1.8,
                bgcolor: "brand.primary",
                textTransform: "none",
                fontWeight: "bold",
                fontSize: "15px",
                "&:hover": { bgcolor: "brand.hover" },
                boxShadow: "0 8px 20px -6px rgba(226, 10, 51, 0.45)",
              }}
            >
              {loading
                ? "Procesando..."
                : isEditing
                  ? "Guardar Cambios"
                  : "Crear Insumo"}
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  );
}
