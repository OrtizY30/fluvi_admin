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
  Select,
  MenuItem,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Tooltip,
  Divider,
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
};

export default function RecipeManager({
  productId,
  variantId,
  modifierId,
  initialRecipe = [],
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
    <Box className="mt-6 border border-gray-100 rounded-2xl bg-white shadow-sm overflow-hidden transition-all hover:shadow-md">
      {/* Header */}
      <Box className="bg-gray-50/80 px-5 py-4 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-lg shadow-sm text-brand-primary">
            <ClipboardList size={18} />
          </div>
          <div>
            <Typography className="text-sm font-black text-gray-800 leading-tight">
              Receta de Producción
            </Typography>
            <Typography variant="caption" className="text-gray-400 font-medium">
              Víncula insumos para descontar stock
            </Typography>
          </div>
        </div>
        <Tooltip title="Los insumos configurados aquí se descontarán automáticamente del inventario al confirmar cada pedido.">
          <IconButton size="small" className="text-gray-300">
            <Info size={16} />
          </IconButton>
        </Tooltip>
      </Box>

      {/* List of Ingredients */}
      <Box className="p-4 bg-white">
        <List dense className="space-y-2 p-0">
          {recipeItems.length > 0 ? (
            recipeItems.map((item) => (
              <ListItem
                key={item.id}
                className="bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-3 group hover:border-gray-200 transition-colors"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center border border-gray-100 group-hover:bg-brand-primary/5 group-hover:border-brand-primary/20 transition-colors">
                    <Scale
                      size={14}
                      className="text-gray-400 group-hover:text-brand-primary"
                    />
                  </div>
                  <ListItemText
                    primary={
                      <span className="font-bold text-gray-700 text-sm">
                        {item.ingredient?.name ||
                          `Insumo ID: ${item.ingredientId}`}
                      </span>
                    }
                    secondary={
                      <span className="text-xs text-gray-400 font-medium lowercase">
                        {item.quantity} {item.ingredient?.unit || ""}
                      </span>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      size="small"
                      onClick={() => handleDelete(item.id)}
                      className="text-gray-300 hover:text-red-500 bg-transparent hover:bg-red-50 transition-all"
                    >
                      <Trash2 size={16} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </div>
              </ListItem>
            ))
          ) : (
            <div className="py-8 text-center bg-gray-50/30 border border-dashed border-gray-200 rounded-xl">
              <Box className="mb-2 opacity-20">
                <ClipboardList size={40} className="mx-auto" />
              </Box>
              <Typography className="text-xs text-gray-400 font-bold px-4">
                No hay insumos vinculados a esta opción
              </Typography>
            </div>
          )}
        </List>
      </Box>

      <Divider className="opacity-50" />

      {/* Add Form */}
      <Box className="p-5 bg-white space-y-4">
        <Typography
          variant="overline"
          className="text-[10px] font-black text-gray-400 tracking-wider"
        >
          Vincular Nuevo Insumo
        </Typography>

        <div className="grid grid-cols-12 gap-3 items-end">
          <div className="col-span-7">
            <FormControl fullWidth size="small">
              <InputLabel className="text-xs font-bold">Insumo</InputLabel>
              <Select
                value={selectedIngredientId}
                label="Insumo"
                onChange={(e) =>
                  setSelectedIngredientId(e.target.value as string)
                }
                sx={{
                  borderRadius: "12px",
                  fontSize: "13px",
                  bgcolor: "gray.50/50",
                }}
              >
                {ingredients.map((ing) => (
                  <MenuItem
                    key={ing.id}
                    value={ing.id.toString()}
                    className="text-sm font-medium"
                  >
                    {ing.name} ({ing.unit})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="col-span-3">
            <TextField
              label="Cant."
              type="number"
              size="small"
              value={quantity}
              onChange={(e) => setQuantity(parseFloat(e.target.value))}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  bgcolor: "gray.50/50",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "13px",
                  fontWeight: "bold",
                },
              }}
            />
          </div>
          <div className="col-span-2">
            <Button
              variant="contained"
              fullWidth
              onClick={handleAdd}
              disabled={loading || !selectedIngredientId}
              sx={{
                minWidth: 0,
                height: 40,
                bgcolor: "brand.primary",
                borderRadius: "12px",
                boxShadow: "0 4px 12px -4px rgba(226, 10, 51, 0.4)",
                "&:hover": { bgcolor: "brand.hover" },
              }}
            >
              <Plus size={20} />
            </Button>
          </div>
        </div>
      </Box>
    </Box>
  );
}
