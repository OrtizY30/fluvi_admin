"use client";

import { Ingredient, RecipeItem } from "@/src/schemas";
import {
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  TextField,
  Button,
  Tooltip,
  Divider,
  Autocomplete,
} from "@mui/material";
import { Trash2, Plus, Beer, Scale, ClipboardList, Info } from "lucide-react";
import { useState, useEffect } from "react";
import { getIngredients } from "@/actions/inventory/ingredients-actions";
import {
  addIngredientToRecipe,
  deleteRecipeItem,
} from "@/actions/inventory/recipes-actions";
import { toast } from "react-toastify";
import { FluviToast } from "../ui/FluviToast";

type RecipeManagerProps = {
  productId?: number;
  variantId?: number;
  modifierId?: number;
  initialRecipe?: RecipeItem[];
  productPrice?: number;
};

export default function RecipeManager({
  modifierId,
  initialRecipe = [],
  productPrice = 0,
}: RecipeManagerProps) {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [recipeItems, setRecipeItems] = useState<RecipeItem[]>(initialRecipe);
  const [selectedIngredientId, setSelectedIngredientId] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadIngredients() {
      const data = await getIngredients();
      setIngredients(data);
    }
    loadIngredients();
  }, []);

  const handleAdd = async () => {
    if (!selectedIngredientId || quantity <= 0) {
      toast.error(
        <FluviToast
          type="error"
          msg="Selecciona un insumo y cantidad válida"
        />,
      );
      return;
    }

    setLoading(true);
    try {
      const res = await addIngredientToRecipe({
        ingredientId: parseInt(selectedIngredientId),
        quantity,
        productId,
        variantId,
        modifierId,
      });

      if (res.error) {
        toast.error(<FluviToast type="error" msg={res.error} />);
      } else {
        toast.success(
          <FluviToast type="success" msg="Ingrediente añadido a la receta" />,
        );
        // El backend devuelve el nuevo item con la relación 'ingredient' cargada
        setRecipeItems([...recipeItems, res]);
        setSelectedIngredientId("");
        setQuantity(0);
      }
    } catch (err) {
      toast.error(<FluviToast type="error" msg="Error al guardar receta" />);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteRecipeItem(id);
      setRecipeItems(recipeItems.filter((item) => item.id !== id));
      toast.success(<FluviToast type="success" msg="Removido de la receta" />);
    } catch (err) {
      toast.error(<FluviToast type="error" msg="Error al eliminar" />);
    }
  };

  return (
    <Box
      sx={{
        mt: 8,
        border: "1px solid",
        borderColor: "grey.100",
        borderRadius: "24px",
        bgcolor: "white",
        shadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        overflow: "hidden",
        transition: "all 0.3s",
        "&:hover": { boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" },
      }}
    >
      {/* Header Premium */}
      <Box className="bg-gray-50/80 px-6 py-5 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-brand-primary/10 rounded-xl text-brand-primary">
            <ClipboardList size={22} />
          </div>
          <div>
            <Typography sx={{ fontSize: "1rem", fontWeight: 900, color: "grey.800", mb: 0.5 }}>
              Receta y Costeo
            </Typography>
            <Typography variant="caption" sx={{ color: "grey.500", fontWeight: 500 }}>
              Víncula insumos para descontar stock y ver costos por plato
            </Typography>
          </div>
        </div>
        <Tooltip title="Los insumos configurados aquí se descontarán automáticamente del inventario al confirmar cada pedido.">
          <IconButton
            size="small"
            className="bg-white border border-gray-100 shadow-sm text-gray-400"
          >
            <Info size={16} />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Formulario de Adición más intuitivo */}
      <Box className="p-6 bg-white">
        <div className="flex flex-col md:flex-row items-end gap-3 bg-gray-50/50 p-4 rounded-2xl border border-dashed border-gray-200">
          <div className="w-full md:flex-1">
            <Typography
              variant="overline"
              className="text-[10px] font-black text-gray-400 ml-1 mb-1 block"
            >
              Seleccionar Insumo
            </Typography>
            <Autocomplete
              size="small"
              options={ingredients}
              getOptionLabel={(option) => `${option.name} (${option.unit})`}
              value={
                ingredients.find(
                  (i) => i.id.toString() === selectedIngredientId,
                ) || null
              }
              onChange={(_, newValue) => {
                setSelectedIngredientId(newValue ? newValue.id.toString() : "");
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Ej: Carne, Pan, Salsa..."
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      bgcolor: "white",
                    },
                  }}
                />
              )}
            />
          </div>

          <div className="w-full md:w-32">
            <Typography
              variant="overline"
              className="text-[10px] font-black text-gray-400 ml-1 mb-1 block"
            >
              Cantidad
            </Typography>
            <TextField
              type="number"
              size="small"
              placeholder="0"
              value={quantity || ""}
              onChange={(e) => setQuantity(parseFloat(e.target.value))}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  bgcolor: "white",
                },
              }}
              InputProps={{
                endAdornment: (
                  <span className="text-[10px] font-black text-gray-300 ml-1">
                    {ingredients.find(
                      (i) => i.id.toString() === selectedIngredientId,
                    )?.unit || "un"}
                  </span>
                ),
              }}
            />
          </div>

          <Button
            variant="contained"
            onClick={handleAdd}
            disabled={loading || !selectedIngredientId || !quantity}
            sx={{
              minWidth: 50,
              height: 40,
              bgcolor: "#E20A33",
              borderRadius: "12px",
              boxShadow: "0 8px 16px -4px rgba(226, 10, 51, 0.45)",
              "&:hover": { bgcolor: "#c2082b" },
              textTransform: "none",
              fontWeight: "900",
              px: 3,
            }}
          >
            {loading ? (
              "..."
            ) : (
              <>
                <Plus size={18} className="mr-1" /> Añadir
              </>
            )}
          </Button>
        </div>
      </Box>

      {/* Listado de Insumos Vinculados */}
      <Box className="px-6 pb-6 bg-white">
        <Typography
          variant="overline"
          className="text-[10px] font-black text-gray-400 ml-1 mb-3 block"
        >
          Insumos de este plato ({recipeItems.length})
        </Typography>

        <List dense className="space-y-3 p-0">
          {recipeItems.length > 0 ? (
            recipeItems.map((item) => (
              <ListItem
                key={item.id}
                className="bg-white border border-gray-100 rounded-xl px-4 py-3 group hover:border-brand-primary/30 hover:shadow-sm transition-all shadow-[0_2px_4px_-2px_rgba(0,0,0,0.05)]"
              >
                <div className="flex items-center gap-4 w-full">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100 group-hover:bg-brand-primary/5 transition-colors">
                    <Scale
                      size={18}
                      className="text-gray-400 group-hover:text-brand-primary"
                    />
                  </div>
                  <ListItemText
                    primary={
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-800 text-sm">
                          {item.ingredient?.name ||
                            `Insumo ID: ${item.ingredientId}`}
                        </span>
                        <span className="bg-gray-100 text-gray-500 text-[9px] px-1.5 py-0.5 rounded uppercase font-black">
                          {item.ingredient?.unit}
                        </span>
                      </div>
                    }
                    secondary={
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-brand-primary font-black">
                          {item.quantity} {item.ingredient?.unit || ""}
                        </span>
                        <span className="text-[10px] text-gray-300">•</span>
                        <span className="text-[10px] text-gray-400 font-medium italic">
                          Costo aprox: $
                          {(
                            item.quantity *
                            (item.ingredient?.averageCost || 0)
                          ).toFixed(2)}
                        </span>
                      </div>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      size="small"
                      onClick={() => handleDelete(item.id)}
                      className="text-gray-300 opacity-0 group-hover:opacity-100 hover:text-red-500 bg-transparent hover:bg-red-50 transition-all"
                    >
                      <Trash2 size={18} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </div>
              </ListItem>
            ))
          ) : (
            <div className="py-10 text-center bg-gray-50/50 border border-dashed border-gray-200 rounded-2xl">
              <Box className="mb-3 text-gray-200">
                <Beer size={48} className="mx-auto" />
              </Box>
              <Typography className="text-xs text-gray-500 font-bold px-4">
                No hay insumos vinculados todavía
              </Typography>
              <Typography className="text-[10px] text-gray-400 px-4 mt-1">
                Añade tus ingredientes arriba para controlar costos
              </Typography>
            </div>
          )}
        </List>

        {recipeItems.length > 0 && (
          <Box className="mt-6 pt-4 border-t border-gray-100 flex flex-col gap-4 px-2">
            <div className="flex justify-between items-center">
              <Typography className="text-xs font-bold text-gray-400 uppercase tracking-tighter">
                Costo Production:
              </Typography>
              <Typography className="text-lg font-black text-gray-800">
                $
                {recipeItems
                  .reduce(
                    (acc, item) =>
                      acc + item.quantity * (item.ingredient?.averageCost || 0),
                    0,
                  )
                  .toFixed(2)}
              </Typography>
            </div>

            {productPrice > 0 && (
              <div className="flex items-center justify-between bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                <div>
                  <Typography className="text-[10px] font-black text-emerald-800 uppercase tracking-widest block">Margen de Utilidad</Typography>
                  <Typography className="text-[9px] text-emerald-600 font-medium">Basado en precio de venta ${productPrice}</Typography>
                </div>
                <div className="text-right">
                  <Typography className="text-xl font-black text-emerald-700">
                    {(() => {
                      const totalCost = recipeItems.reduce((acc, item) => acc + (item.quantity * (item.ingredient?.averageCost || 0)), 0);
                      const margin = ((productPrice - totalCost) / productPrice) * 100;
                      return `${margin.toFixed(1)}%`;
                    })()}
                  </Typography>
                  <Typography className="text-[9px] font-black text-emerald-800 uppercase">Rentable</Typography>
                </div>
              </div>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}
