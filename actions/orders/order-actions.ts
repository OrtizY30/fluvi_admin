"use server";

import getToken from "@/src/auth/token";
import { revalidatePath } from "next/cache";

export async function confirmOrder(orderId: number) {
    try {
        const token = await getToken();
        const url = `${process.env.NEXT_PUBLIC_API_URL}/v1/internal/${orderId}/confirm`;

        const req = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!req.ok) {
            const errText = await req.text();
            console.error("Error from backend:", errText);
            try {
                const parsed = JSON.parse(errText);
                if (parsed.error) return { error: parsed.error };
                if (parsed.message) return { error: parsed.message };
            } catch (e) { }
            return { error: `Error Backend: ${req.status} - ${errText.substring(0, 50)}...` };
        }

        const json = await req.json();
        revalidatePath("/admin/pedidos");
        revalidatePath("/admin/inventario");
        return json;
    } catch (error: any) {
        console.error("Action throw:", error);
        return { error: `Server exception: ${error.message}` };
    }
}

export async function updateOrderStatus(orderId: number, status: string) {
    const token = await getToken();
    const url = `${process.env.NEXT_PUBLIC_API_URL}/v1/internal/${orderId}/status`;

    const req = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status })
    });

    const json = await req.json();
    revalidatePath("/admin/pedidos");
    return json;
}

export async function getOrders() {
    const token = await getToken();
    const url = `${process.env.NEXT_PUBLIC_API_URL}/v1/internal`;

    const req = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });

    if (!req.ok) return [];
    return await req.json();
}
