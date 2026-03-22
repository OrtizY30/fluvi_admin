"use client";

import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import useSound from "use-sound";

export default function SocketNotifier({ businessId }: { businessId: number }) {
    const router = useRouter();
    const [play] = useSound("/notification.ogg");

    // Guarda en useRef para asegurar que solo se inicialice una vez si StrictMode está activo
    const socketRef = useRef<any>(null);

    useEffect(() => {
        if (!businessId) return;

        if (!socketRef.current) {
            // Conectar al socket del backend
            const backendUrl = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:4321";
            socketRef.current = io(backendUrl);

            const socket = socketRef.current;

            socket.on("connect", () => {
                console.log("Admin conectado al socket con ID:", socket.id);
                // Unirse a la sala de notificaciones de este negocio
                socket.emit("join_business", businessId);
            });

            socket.on("new_order", (order: any) => {
                // Reproducir sonido usando use-sound y el archivo local
                play();

                const customer = order.customerName || "Cliente";
                const total = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(order.total);
                const msg = `🛒 ¡Nuevo pedido #${order.id}! ${customer} por ${total}`;

                toast.success(msg, {
                    position: "top-right",
                    autoClose: false, // Que el admin deba cerrarlo
                    closeOnClick: true,
                    theme: "colored"
                });

                // Enfoque Nivel Enterprise: Despachar el pedido localmente en lugar de recargar la DB
                window.dispatchEvent(new CustomEvent("newOrderReceived", { detail: order }));
            });
        }

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
            }
        };
    }, [businessId, router, play]);

    return null; // Este componente no renderiza nada en pantalla
}
