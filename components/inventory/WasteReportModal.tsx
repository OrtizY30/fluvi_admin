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
import { recordWaste } from "@/actions/inventory/ingredients-actions";
import { toast } from "react-toastify";
import { FluviToast } from "../ui/FluviToast";
import { Trash2, Scale, Package, X, FileText } from "lucide-react";

type WasteReportModalProps = {
  open: boolean;
  onClose: () => void;
  ingredientId: number;
  ingredientName: string;
};

export default function WasteReportModal({
  open,
  onClose,
  ingredientId,
  ingredientName,
}: WasteReportModalProps) {
  const [quantity, setQuantity] = useState<number>(0);
  const [reason, setReason] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (quantity <= 0) {
      toast.error(
        <FluviToast type="error" msg="La cantidad debe ser mayor a 0" />,
      );
      return;
    }
    if (!reason.trim()) {
      toast.error(
        <FluviToast type="error" msg="El motivo es obligatorio" />,
      );
      return;
    }
    setLoading(true);
    try {
      const res = await recordWaste(ingredientId, quantity, reason);
      if (res.error) {
        toast.error(<FluviToast type="error" msg={res.error} />);
      } else {
        toast.success(
          <FluviToast type="success" msg="Merma registrada correctamente" />,
        );
        onClose();
      }
    } catch (err) {
      toast.error(<FluviToast type="error" msg="Error al registrar merma" />);
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
          Registrar Merma
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
          <Box className="bg-red-50 p-4 rounded-2xl border border-red-100 flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm text-red-500">
              <Trash2 size={20} />
            </div>
            <Box>
              <Typography
                variant="caption"
                className="text-red-400 font-bold uppercase tracking-wider text-[10px]"
              >
                Insumo a reportar
              </Typography>
              <Typography className="text-gray-800 font-black leading-tight">
                {ingredientName}
              </Typography>
            </Box>
          </Box>

          <TextField
            label="Cantidad desperdiciada"
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
            label="Motivo de la merma"
            placeholder="Ej: Producto vencido, dañado, error de cocina"
            fullWidth
            required
            multiline
            rows={2}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FileText size={18} className="text-gray-400" />
                </InputAdornment>
              ),
            }}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "14px" } }}
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
          className="bg-red-600 hover:bg-red-700"
          sx={{
            borderRadius: "14px",
            py: 1.5,
            bgcolor: "error.main",
            textTransform: "none",
            fontWeight: "bold",
            "&:hover": { bgcolor: "error.dark" },
            boxShadow: "0 8px 20px -6px rgba(239, 68, 68, 0.45)",
          }}
        >
          {loading ? "Registrando..." : "Reportar Merma"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
