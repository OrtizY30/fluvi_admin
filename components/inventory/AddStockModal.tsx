"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
} from "@mui/material";
import { addStock } from "@/actions/inventory/ingredients-actions";
import { toast } from "react-toastify";
import { FluviToast } from "../ui/FluviToast";
import { DollarSign, Scale, Package, X } from "lucide-react";

type AddStockModalProps = {
  open: boolean;
  onClose: () => void;
  ingredientId: number;
  ingredientName: string;
};

export default function AddStockModal({
  open,
  onClose,
  ingredientId,
  ingredientName,
}: AddStockModalProps) {
  const [quantity, setQuantity] = useState<number>(0);
  const [cost, setCost] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (quantity <= 0) {
      toast.error(
        <FluviToast type="error" msg="La cantidad debe ser mayor a 0" />,
      );
      return;
    }
    setLoading(true);
    try {
      const res = await addStock(ingredientId, quantity, cost);
      if (res.error) {
        toast.error(<FluviToast type="error" msg={res.error} />);
      } else {
        toast.success(
          <FluviToast type="success" msg="Stock actualizado correctamente" />,
        );
        onClose();
      }
    } catch (err) {
      toast.error(<FluviToast type="error" msg="Error al actualizar stock" />);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{ sx: { borderRadius: "24px", p: 1 } }}
    >
      <DialogTitle className="flex justify-between items-center pb-2">
        <Typography variant="h6" className="font-black text-gray-800">
          Registrar Entrada
        </Typography>
        <Button
          onClick={onClose}
          size="small"
          sx={{
            minWidth: "auto",
            p: 1,
            borderRadius: "50%",
            color: "gray.400",
          }}
        >
          <X size={20} />
        </Button>
      </DialogTitle>

      <DialogContent>
        <Box className="space-y-8 pt-4">
          <Box className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm text-brand-primary">
              <Package size={20} />
            </div>
            <Box>
              <Typography
                variant="caption"
                className="text-gray-400 font-bold uppercase tracking-wider text-[10px]"
              >
                Insumo seleccionado
              </Typography>
              <Typography className="text-gray-800 font-black leading-tight">
                {ingredientName}
              </Typography>
            </Box>
          </Box>

          <TextField
            label="Cantidad a añadir"
            type="number"
            fullWidth
            required
            value={quantity}
            onChange={(e) => setQuantity(parseFloat(e.target.value))}
            autoFocus
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Scale size={18} className="text-gray-400" />
                </InputAdornment>
              ),
            }}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "14px" } }}
          />

          <TextField
            label="Costo total de esta compra"
            type="number"
            fullWidth
            value={cost}
            onChange={(e) => setCost(parseFloat(e.target.value))}
            helperText="Opcional. Se usará para recalcular el costo promedio unitario."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DollarSign size={18} className="text-green-600" />
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
      </DialogContent>

      <DialogActions className="p-6 gap-3">
        <Button
          fullWidth
          onClick={onClose}
          sx={{
            borderRadius: "14px",
            py: 1.5,
            textTransform: "none",
            fontWeight: "bold",
            color: "gray.500",
          }}
        >
          Cancelar
        </Button>
        <Button
          fullWidth
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          sx={{
            borderRadius: "14px",
            py: 1.5,
            bgcolor: "brand.primary",
            textTransform: "none",
            fontWeight: "bold",
            "&:hover": { bgcolor: "brand.hover" },
            boxShadow: "0 8px 20px -6px rgba(226, 10, 51, 0.45)",
          }}
        >
          {loading ? "Registrando..." : "Registrar Entrada"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
