"use client";

import { Order } from "@/src/schemas";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import { CheckCircle, Clock, User, Phone, MapPin } from "lucide-react";
import { confirmOrder } from "@/actions/orders/order-actions";
import { toast } from "react-toastify";
import { FluviToast } from "../ui/FluviToast";
import { useState } from "react";

type OrderListProps = {
  initialOrders: Order[];
};

export default function OrderList({ initialOrders }: OrderListProps) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const handleConfirm = async (orderId: number) => {
    setLoadingId(orderId);
    try {
      const res = await confirmOrder(orderId);
      if (res.error) {
        toast.error(<FluviToast type="error" msg={res.error} />);
      } else {
        toast.success(
          <FluviToast
            type="success"
            msg="Pedido confirmado e inventario actualizado"
          />,
        );
        setOrders(
          orders.map((o) =>
            o.id === orderId ? { ...o, status: "CONFIRMED" } : o,
          ),
        );
      }
    } catch (err) {
      toast.error(<FluviToast type="error" msg="Error al confirmar pedido" />);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Listado de Pedidos</h2>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {orders.length > 0 ? (
          orders.map((order) => (
            <Paper
              key={order.id}
              elevation={0}
              className="border border-gray-100 rounded-2xl overflow-hidden p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="space-y-1">
                  <Box className="flex items-center gap-2">
                    <Typography variant="h6" className="font-bold">
                      Pedido #{order.id}
                    </Typography>
                    <Chip
                      label={
                        order.status === "PENDING" ? "Pendiente" : "Confirmado"
                      }
                      color={order.status === "PENDING" ? "warning" : "success"}
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <User size={14} /> {order.customerName}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />{" "}
                      {new Date(order.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <Typography className="text-xs text-gray-500 uppercase font-bold">
                    Total
                  </Typography>
                  <Typography
                    variant="h5"
                    className="font-black text-brand-primary"
                  >
                    ${order.total.toLocaleString()}
                  </Typography>
                </div>
              </div>

              <Divider className="my-4" />

              <div className="mb-6">
                <Typography variant="subtitle2" className="font-bold mb-2">
                  Detalle de Productos
                </Typography>
                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center text-sm"
                    >
                      <div className="flex gap-2">
                        <span className="font-bold text-brand-primary">
                          {item.quantity}x
                        </span>
                        <span>
                          {item.productId}{" "}
                          {/* Aquí faltaría el nombre del producto, idealmente el back lo debería enviar */}
                        </span>
                      </div>
                      <span className="font-medium">
                        ${item.subtotal.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3">
                {order.status === "PENDING" && (
                  <Button
                    variant="contained"
                    startIcon={<CheckCircle size={18} />}
                    onClick={() => handleConfirm(order.id)}
                    disabled={loadingId === order.id}
                    sx={{
                      bgcolor: "brand.primary",
                      borderRadius: 3,
                      px: 4,
                      "&:hover": { bgcolor: "brand.hover" },
                    }}
                  >
                    {loadingId === order.id
                      ? "Confirmando..."
                      : "Confirmar Pedido"}
                  </Button>
                )}
              </div>
            </Paper>
          ))
        ) : (
          <Box className="py-20 text-center bg-white rounded-2xl border border-gray-100">
            <Typography className="text-gray-400">
              No hay pedidos registrados hoy.
            </Typography>
          </Box>
        )}
      </div>
    </div>
  );
}
