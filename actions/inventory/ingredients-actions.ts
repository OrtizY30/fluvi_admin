"use server";

import getToken from "@/src/auth/token";
import { revalidatePath } from "next/cache";

export async function getIngredients() {
    const token = await getToken();
    const url = `${process.env.NEXT_PUBLIC_API_URL}/ingredients`;

    const req = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        next: { tags: ["ingredients"] },
        cache: "no-store",
    });

    if (!req.ok) return [];
    return await req.json();
}

export async function createIngredient(formData: FormData) {
    const token = await getToken();
    const url = `${process.env.NEXT_PUBLIC_API_URL}/ingredients`;

    const data = {
        name: formData.get("name")?.toString(),
        unit: formData.get("unit")?.toString(),
        stock: parseFloat(formData.get("stock")?.toString() || "0"),
        minStock: parseFloat(formData.get("minStock")?.toString() || "0"),
        averageCost: parseFloat(formData.get("averageCost")?.toString() || "0"),
        costPrice: parseFloat(formData.get("costPrice")?.toString() || "0"),
        expirationDate: formData.get("expirationDate")?.toString() || null,
    };

    const req = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    const json = await req.json();
    revalidatePath("/admin/inventario");
    return json;
}

export async function addStock(ingredientId: number, quantity: number, cost: number, expirationDate?: string | null) {
    const token = await getToken();
    const url = `${process.env.NEXT_PUBLIC_API_URL}/ingredients/${ingredientId}/add-stock`;

    const req = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity, cost, expirationDate }),
    });

    const json = await req.json();
    revalidatePath("/admin/inventario");
    return json;
}

export async function recordWaste(ingredientId: number, quantity: number, reason: string) {
    const token = await getToken();
    const url = `${process.env.NEXT_PUBLIC_API_URL}/ingredients/${ingredientId}/record-waste`;

    const req = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity, reason }),
    });

    const json = await req.json();
    revalidatePath("/admin/inventario");
    return json;
}

export async function getMovements(ingredientId: number) {
    const token = await getToken();
    const url = `${process.env.NEXT_PUBLIC_API_URL}/ingredients/${ingredientId}/movements`;

    const req = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });

    if (!req.ok) return [];
    return await req.json();
}
export async function updateIngredient(ingredientId: number, formData: FormData) {
    const token = await getToken();
    const url = `${process.env.NEXT_PUBLIC_API_URL}/ingredients/${ingredientId}`;

    // Recolectamos todos los campos para un PUT (actualización completa)
    // Usamos coalescencia para evitar NaN
    const data = {
        name: formData.get("name")?.toString(),
        unit: formData.get("unit")?.toString(),
        stock: parseFloat(formData.get("stock")?.toString() || "0"),
        minStock: parseFloat(formData.get("minStock")?.toString() || "0"),
        averageCost: parseFloat(formData.get("averageCost")?.toString() || "0"),
        costPrice: parseFloat(formData.get("costPrice")?.toString() || "0"),
        expirationDate: formData.get("expirationDate")?.toString() || null,
    };

    console.log("Full Update Request (PUT):", { url, data });

    try {
        const req = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if (!req.ok) {
            const errorText = await req.text();
            console.error("Backend Error Response:", errorText);
            try {
                const errorData = JSON.parse(errorText);
                return { error: errorData.message || `Error ${req.status}` };
            } catch {
                return { error: `Error del servidor: ${req.status}` };
            }
        }

        // Algunos backends devuelven 204 No Content
        if (req.status === 204) return { success: true };

        const json = await req.json();
        revalidatePath("/admin/inventario");
        return json;
    } catch (error) {
        console.error("Critical Update Error:", error);
        return { error: "No se pudo establecer conexión con el servidor" };
    }
}

export async function deleteIngredient(ingredientId: number) {
    const token = await getToken();
    const url = `${process.env.NEXT_PUBLIC_API_URL}/ingredients/${ingredientId}`;

    const req = await fetch(url, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!req.ok) return { error: "No se pudo eliminar el insumo" };

    revalidatePath("/admin/inventario");
    return { success: true };
}
