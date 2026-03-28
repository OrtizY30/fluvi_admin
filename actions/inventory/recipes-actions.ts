"use server";

import getToken from "@/src/auth/token";
import { revalidatePath } from "next/cache";

export async function addIngredientToRecipe(data: {
    ingredientId: number;
    quantity: number;
    productId?: number;
    variantId?: number;
    modifierId?: number;
}) {
    const token = await getToken();
    const url = `${process.env.NEXT_PUBLIC_API_URL}/recipes`;

    const req = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    const json = await req.json();
    revalidatePath("/admin/productos");
    return json;
}

export async function deleteRecipeItem(id: number) {
    const token = await getToken();
    const url = `${process.env.NEXT_PUBLIC_API_URL}/recipes/${id}`;

    const req = await fetch(url, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const json = await req.json();
    revalidatePath("/admin/productos");
    return json;
}

export async function getRecipeByProduct(productId: number) {
    const token = await getToken();
    const url = `${process.env.NEXT_PUBLIC_API_URL}/recipes/product/${productId}`;

    const req = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });

    if (!req.ok) return [];
    return await req.json();
}
