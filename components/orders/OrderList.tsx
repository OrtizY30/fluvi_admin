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
import { CheckCircle, Clock, User, Phone, MapPin, CheckSquare, Eye } from "lucide-react";
import { confirmOrder, updateOrderStatus } from "@/actions/orders/order-actions";
import { toast } from "react-toastify";
import { FluviToast } from "../ui/FluviToast";
import { useState, useEffect } from "react";
import OrderDetailsDrawer from "./OrderDetailsDrawer";

type OrderListProps = {
  initialOrders: Order[];
};

export default function OrderList({ initialOrders }: OrderListProps) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    setOrders(initialOrders);
  }, [initialOrders]);

  useEffect(() => {
    const handleNewOrder = (e: CustomEvent) => {
      setOrders(prevOrders => {
        // Evita duplicar si por alguna razón el socket dispara doble o SSR ya lo trajo
        if (prevOrders.some(order => order.id === e.detail.id)) return prevOrders;
        return [e.detail, ...prevOrders];
      });
    };

    window.addEventListener("newOrderReceived", handleNewOrder as EventListener);
    return () => {
      window.removeEventListener("newOrderReceived", handleNewOrder as EventListener);
    };
  }, []);

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

  const handleUpdateStatus = async (orderId: number, status: string) => {
    setLoadingId(orderId);
    try {
      const res = await updateOrderStatus(orderId, status);
      if (res.error) {
        toast.error(<FluviToast type="error" msg={res.error} />);
      } else {
        toast.success(
          <FluviToast
            type="success"
            msg="Estado actualizado exitosamente"
          />,
        );
        setOrders(
          orders.map((o) =>
            o.id === orderId ? { ...o, status: status as any } : o,
          ),
        );
      }
    } catch (err) {
      toast.error(<FluviToast type="error" msg="Error al actualizar pedido" />);
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
              className="border border-gray-100 rounded-2xl overflow-hidden p-5 md:p-6 hover:shadow-lg transition-all bg-white"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-2 flex-1">
                  <Box className="flex items-center flex-wrap gap-2">
                    <Typography variant="h6" className="font-bold text-gray-800">
                      Pedido #{order.id}
                    </Typography>
                    <Chip
                      label={
                        order.status === "PENDING" ? "Pendiente" :
                          order.status === "CONFIRMED" ? "Confirmado" :
                            order.status === "DELIVERED" ? "Entregado" : "Cancelado"
                      }
                      color={
                        order.status === "PENDING" ? "warning" :
                          order.status === "CONFIRMED" ? "success" :
                            order.status === "DELIVERED" ? "info" : "error"
                      }
                      size="small"
                      variant="outlined"
                      sx={{ fontWeight: "bold" }}
                    />
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md font-bold">
                      {order.items.length} {order.items.length === 1 ? 'Producto' : 'Productos'}
                    </span>
                  </Box>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <User size={14} className="text-gray-400" /> {order.customerName}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} className="text-gray-400" />{" "}
                      {new Date(order.createdAt).toLocaleString("es-CO", { dateStyle: "short", timeStyle: "short" })}
                    </span>
                  </div>
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-2 shrink-0">
                  <Typography variant="h5" className="font-black text-brand-primary">
                    ${order.total.toLocaleString()}
                  </Typography>
                  <Button
                    variant="text"
                    size="small"
                    startIcon={<Eye size={16} />}
                    onClick={() => {
                      setSelectedOrder(order);
                      setDrawerOpen(true);
                    }}
                    sx={{ fontWeight: "bold", textTransform: "none" }}
                  >
                    Ver detalle
                  </Button>
                </div>
              </div>

              {(order.status === "PENDING" || order.status === "CONFIRMED") && (
                <>
                  <Divider className="my-4" />
                  <div className="flex justify-end gap-3 w-full">
                    {order.status === "PENDING" && (
                      <Button
                        variant="contained"
                        startIcon={<CheckCircle size={18} />}
                        onClick={() => handleConfirm(order.id)}
                        disabled={loadingId === order.id}
                        sx={{
                          bgcolor: "brand.primary",
                          borderRadius: 3,
                          px: 3,
                          "&:hover": { bgcolor: "brand.hover" },
                        }}
                      >
                        {loadingId === order.id ? "Confirmando..." : "Confirmar"}
                      </Button>
                    )}

                    {order.status === "CONFIRMED" && (
                      <Button
                        variant="outlined"
                        color="success"
                        startIcon={<CheckSquare size={18} />}
                        onClick={() => handleUpdateStatus(order.id, "DELIVERED")}
                        disabled={loadingId === order.id}
                        sx={{ borderRadius: 3, px: 3 }}
                      >
                        {loadingId === order.id ? "Actualizando..." : "Entregar"}
                      </Button>
                    )}
                  </div>
                </>
              )}
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

      {/* Drawer Lateral del Detalle del Pedido */}
      <OrderDetailsDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        order={selectedOrder}
        loadingId={loadingId}
        handleConfirm={handleConfirm}
        handleUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
}
