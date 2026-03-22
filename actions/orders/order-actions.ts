"use server";

import getToken from "@/src/auth/token";
import { revalidatePath } from "next/cache";

export async function confirmOrder(orderId: number) {
    const token = await getToken();
    const url = `${process.env.API_URL}/v1/internal/${orderId}/confirm`;

    const req = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const json = await req.json();
    revalidatePath("/admin/pedidos");
    revalidatePath("/admin/inventario");
    return json;
}

export async function getOrders() {
    const token = await getToken();
    const url = `${process.env.API_URL}/v1/internal`;

    const req = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });

    if (!req.ok) return [];
    return await req.json();
}
