"use client";

import { Ingredient } from "@/src/schemas";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  InputAdornment,
  TextField,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Plus,
  History,
  Package,
  Search,
  Edit2,
  Trash2,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import AddStockModal from "./AddStockModal";
import IngredientForm from "./IngredientForm";
import { deleteIngredient } from "@/actions/inventory/ingredients-actions";
import { toast } from "react-toastify";
import { FluviToast } from "../ui/FluviToast";

type IngredientListProps = {
  ingredients: Ingredient[];
};

export default function IngredientList({ ingredients }: IngredientListProps) {
  const [selectedIngredient, setSelectedIngredient] =
    useState<Ingredient | null>(null);
  const [ingredientToEdit, setIngredientToEdit] = useState<Ingredient | null>(
    null,
  );
  const [ingredientToDelete, setIngredientToDelete] =
    useState<Ingredient | null>(null);

  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrado de insumos
  const filteredIngredients = ingredients.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toString().includes(searchTerm),
  );

  // Apertura de modal de stock
  const handleOpenStock = (item: Ingredient) => {
    setSelectedIngredient(item);
    setIsStockModalOpen(true);
  };

  // Apertura de form para editar
  const handleEdit = (item: Ingredient) => {
    setIngredientToEdit(item);
    setIsFormOpen(true);
  };

  // Apertura de form para crear nuevo
  const handleCreate = () => {
    setIngredientToEdit(null);
    setIsFormOpen(true);
  };

  // Proceso de eliminación
  const handleDeleteConfirm = async () => {
    if (!ingredientToDelete) return;
    setIsDeleting(true);
    try {
      const res = await deleteIngredient(ingredientToDelete.id);
      if (res.success) {
        toast.success(
          <FluviToast type="success" msg="Insumo eliminado correctamente" />,
        );
        setIngredientToDelete(null);
      } else {
        toast.error(
          <FluviToast type="error" msg={res.error || "Error al eliminar"} />,
        );
      }
    } catch (err) {
      toast.error(<FluviToast type="error" msg="Error de servidor" />);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Premium */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-2xl font-black text-gray-800 flex items-center gap-2">
            <Package className="text-brand-primary" size={28} />
            Control de Insumos
          </h2>
          <p className="text-gray-500 text-sm">
            Gestiona el stock y costos de tu materia prima
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <TextField
            size="small"
            placeholder="Buscar insumo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={18} className="text-gray-400" />
                </InputAdornment>
              ),
              sx: { borderRadius: "12px", bgcolor: "gray.50" },
            }}
          />
          <Button
            variant="contained"
            startIcon={<Plus size={18} />}
            onClick={handleCreate}
            sx={{
              bgcolor: "brand.primary",
              borderRadius: "12px",
              px: 3,
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": { bgcolor: "brand.hover" },
            }}
          >
            Nuevo Insumo
          </Button>
        </div>
      </div>

      <TableContainer
        component={Paper}
        elevation={0}
        className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm bg-white"
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead className="bg-gray-50/50">
            <TableRow>
              <TableCell className="font-bold text-gray-600 uppercase text-[11px] px-6 py-4 tracking-wider">
                Insumo
              </TableCell>
              <TableCell className="font-bold text-gray-600 uppercase text-[11px] px-6 py-4 tracking-wider">
                Stock Actual
              </TableCell>
              <TableCell className="font-bold text-gray-600 uppercase text-[11px] px-6 py-4 tracking-wider">
                Mínimo
              </TableCell>
              <TableCell className="font-bold text-gray-600 uppercase text-[11px] px-6 py-4 tracking-wider text-center">
                Unidad
              </TableCell>
              <TableCell className="font-bold text-gray-600 uppercase text-[11px] px-6 py-4 tracking-wider">
                Costo Prom.
              </TableCell>
              <TableCell className="font-bold text-gray-600 uppercase text-[11px] px-6 py-4 tracking-wider">
                Estado
              </TableCell>
              <TableCell className="font-bold text-gray-600 uppercase text-[11px] px-6 py-4 tracking-wider text-right">
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredIngredients.map((item) => {
              const IsLowStock = item.stock <= item.minStock;
              return (
                <TableRow
                  key={item.id}
                  hover
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell className="px-6">
                    <Typography className="font-bold text-gray-800">
                      {item.name}
                    </Typography>
                    <Typography variant="caption" className="text-gray-400">
                      ID: #{item.id}
                    </Typography>
                  </TableCell>
                  <TableCell className="px-6">
                    <div
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-black ${IsLowStock ? "bg-red-50 text-red-600 border border-red-100" : "bg-green-50 text-green-600 border border-green-100"}`}
                    >
                      {item.stock} {item.unit.toLowerCase()}
                    </div>
                  </TableCell>
                  <TableCell className="px-6 text-gray-500 font-medium">
                    {item.minStock}
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={item.unit}
                      size="small"
                      variant="outlined"
                      sx={{
                        borderRadius: "8px",
                        fontSize: "10px",
                        fontWeight: "bold",
                      }}
                    />
                  </TableCell>
                  <TableCell className="px-6">
                    <span className="font-black text-gray-700">
                      ${item.averageCost.toFixed(2)}
                    </span>
                  </TableCell>
                  <TableCell className="px-6">
                    <Chip
                      label={IsLowStock ? "Bajo Stock" : "Suficiente"}
                      color={IsLowStock ? "error" : "success"}
                      size="small"
                      sx={{ fontWeight: "bold" }}
                    />
                  </TableCell>
                  <TableCell align="right" className="px-6">
                    <Box className="flex gap-1 justify-end items-center">
                      <Tooltip title="Registrar Compra">
                        <Button
                          size="small"
                          variant="outlined"
                          color="inherit"
                          startIcon={<Plus size={14} />}
                          onClick={() => handleOpenStock(item)}
                          sx={{
                            borderRadius: "10px",
                            textTransform: "none",
                            borderColor: "gray.200",
                            fontSize: "11px",
                            fontWeight: "bold",
                          }}
                        >
                          Stock
                        </Button>
                      </Tooltip>

                      <Tooltip title="Editar Insumo">
                        <IconButton
                          size="small"
                          onClick={() => handleEdit(item)}
                          className="text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          <Edit2 size={16} />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Ver Historial">
                        <IconButton
                          size="small"
                          className="text-gray-400 hover:text-amber-600 transition-colors"
                        >
                          <History size={18} />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Eliminar Insumo">
                        <IconButton
                          size="small"
                          onClick={() => setIngredientToDelete(item)}
                          className="text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={16} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
            {filteredIngredients.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center" className="py-24">
                  <Box className="bg-gray-50 inline-flex p-6 rounded-full mb-4">
                    <Package size={48} className="text-gray-300" />
                  </Box>
                  <Typography className="text-gray-400 font-bold block">
                    {searchTerm
                      ? `No se encontraron resultados para "${searchTerm}"`
                      : "No hay insumos en tu despensa"}
                  </Typography>
                  {!searchTerm && (
                    <Button
                      variant="text"
                      className="mt-2 text-brand-primary font-black lowercase text-sm"
                      onClick={handleCreate}
                    >
                      + Registrar el primero ahora
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* MODALES Y DRAWERS */}

      {/* Drawer de Formulario (Crear/Editar) */}
      <IngredientForm
        key={ingredientToEdit?.id || "new"}
        open={isFormOpen}
        setOpen={setIsFormOpen}
        ingredient={ingredientToEdit}
      />

      {/* Modal de Stock */}
      {selectedIngredient && (
        <AddStockModal
          open={isStockModalOpen}
          onClose={() => setIsStockModalOpen(false)}
          ingredientId={selectedIngredient.id}
          ingredientName={selectedIngredient.name}
        />
      )}

      {/* Dialogo de Confirmación de Eliminación */}
      <Dialog
        open={!!ingredientToDelete}
        onClose={() => !isDeleting && setIngredientToDelete(null)}
        PaperProps={{ sx: { borderRadius: "20px", p: 1 } }}
      >
        <DialogTitle className="flex items-center gap-3 font-black text-gray-800">
          <div className="p-2 bg-red-50 text-red-600 rounded-lg">
            <AlertCircle size={24} />
          </div>
          ¿Eliminar Insumo?
        </DialogTitle>
        <DialogContent>
          <Typography className="text-gray-600">
            Estás a punto de eliminar{" "}
            <span className="font-bold text-gray-800">
              {ingredientToDelete?.name}
            </span>
            . Esta acción no se puede deshacer y afectará a los productos que
            utilicen este ingrediente.
          </Typography>
        </DialogContent>
        <DialogActions className="p-4 gap-2">
          <Button
            onClick={() => setIngredientToDelete(null)}
            disabled={isDeleting}
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: "bold",
              color: "gray.500",
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
            disabled={isDeleting}
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: "bold",
              px: 3,
            }}
          >
            {isDeleting ? "Eliminando..." : "Sí, Eliminar"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
