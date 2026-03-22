"use client";

import { Drawer, IconButton, Divider } from "@mui/material";
import { X, CheckCircle, CheckSquare } from "lucide-react";
import { Order } from "@/src/schemas";
import { Button } from "@mui/material";

type OrderDetailsDrawerProps = {
    open: boolean;
    onClose: () => void;
    order: Order | null;
    loadingId: number | null;
    handleConfirm: (id: number) => void;
    handleUpdateStatus: (id: number, status: string) => void;
};

export default function OrderDetailsDrawer({
    open,
    onClose,
    order,
    loadingId,
    handleConfirm,
    handleUpdateStatus,
}: OrderDetailsDrawerProps) {
    if (!order) return null;

    return (
        <Drawer
            open={open}
            onClose={onClose}
            anchor="right"
            PaperProps={{
                sx: { overflow: "hidden" },
            }}
        >
            <div className="flex md:w-xl w-screen flex-col h-full bg-slate-50">
                {/* Header */}
                <div className="flex justify-between items-center px-4 py-4 shadow-sm bg-white z-10">
                    <p className="font-bold text-lg text-gray-800">
                        Detalle del Pedido #{order.id}
                    </p>
                    <IconButton component="span" onClick={onClose} edge="end">
                        <X strokeWidth={1.5} className="text-black size-6" />
                    </IconButton>
                </div>

                {/* Contenido (Scrollable) */}
                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                    {/* Información del Cliente */}
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-800 mb-3 border-b pb-2">Datos del Cliente</h3>
                        <div className="space-y-2 text-sm text-gray-700">
                            <p><span className="font-semibold">Nombre:</span> {order.customerName}</p>
                            {order.customerPhone && <p><span className="font-semibold">Teléfono:</span> {order.customerPhone}</p>}
                            {order.address && <p><span className="font-semibold">Dirección:</span> {order.address}</p>}
                            {order.notes && (
                                <div className="mt-3 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                                    <p className="font-bold text-yellow-800 text-xs uppercase mb-1">Nota del cliente</p>
                                    <p className="text-yellow-900">{order.notes}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Información Adicional */}
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-800 mb-3 border-b pb-2">Información de Pedido</h3>
                        <div className="space-y-2 text-sm text-gray-700">
                            <p><span className="font-semibold">Fecha:</span> {new Date(order.createdAt).toLocaleDateString()}</p>
                            <p><span className="font-semibold">Hora:</span> {new Date(order.createdAt).toLocaleTimeString()}</p>
                            <p><span className="font-semibold">Estado:</span> {
                                order.status === "PENDING" ? "Pendiente" :
                                    order.status === "CONFIRMED" ? "Confirmado" :
                                        order.status === "DELIVERED" ? "Entregado" : "Cancelado"
                            }</p>
                        </div>
                    </div>

                    {/* Detalle de Productos */}
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Productos ({order.items.length})</h3>

                        <div className="space-y-4">
                            {order.items.map((item: any, idx: number) => (
                                <div key={idx} className="flex justify-between items-start text-sm border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                                    <div className="flex gap-3">
                                        <span className="font-black text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded-md h-fit">
                                            {item.quantity}x
                                        </span>
                                        <div>
                                            <p className="font-bold text-gray-800">
                                                {item.product?.name || `Producto #${item.productId}`}
                                            </p>

                                            <div className="text-xs text-gray-500 mt-1.5 space-y-1">
                                                {item.variant && <p className="font-medium text-gray-600">• {item.variant.name}</p>}
                                                {item.modifiers?.map((m: any, i: number) => (
                                                    <p key={i}>+ {m.modifier?.name}</p>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <span className="font-bold text-gray-700 whitespace-nowrap">
                                        ${item.subtotal.toLocaleString()}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <Divider className="my-4 border-dashed" />

                        <div className="flex justify-between items-center text-lg">
                            <span className="font-bold text-gray-500 uppercase text-sm">Total</span>
                            <span className="font-black text-brand-primary text-2xl">
                                ${order.total.toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Footer con Acciones */}
                <div className="p-4 bg-white border-t border-gray-200 shadow-sm flex justify-end gap-3 z-10">
                    <Button variant="text" onClick={onClose} color="inherit" sx={{ fontWeight: "bold" }}>
                        Cerrar
                    </Button>

                    {order.status === "PENDING" && (
                        <Button
                            variant="contained"
                            startIcon={<CheckCircle size={18} />}
                            onClick={() => {
                                handleConfirm(order.id);
                                onClose(); // Cerrar drawer opcionalmente al accionar
                            }}
                            disabled={loadingId === order.id}
                            sx={{
                                bgcolor: "brand.primary",
                                borderRadius: 2,
                                px: 3,
                                "&:hover": { bgcolor: "brand.hover" },
                            }}
                        >
                            {loadingId === order.id ? "Aplicando..." : "Confirmar Pedido"}
                        </Button>
                    )}

                    {order.status === "CONFIRMED" && (
                        <Button
                            variant="contained"
                            color="success"
                            startIcon={<CheckSquare size={18} />}
                            onClick={() => {
                                handleUpdateStatus(order.id, "DELIVERED");
                                onClose();
                            }}
                            disabled={loadingId === order.id}
                            sx={{
                                borderRadius: 2,
                                px: 3,
                                boxShadow: "none"
                            }}
                        >
                            {loadingId === order.id ? "Aplicando..." : "Marcar Entregado"}
                        </Button>
                    )}
                </div>
            </div>
        </Drawer>
    );
}
