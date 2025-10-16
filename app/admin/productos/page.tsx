import ProductContainer from "@/components/products/ProductContainer";
import getToken from "@/src/auth/token";
import { CategoriesAPIResponseSchema } from "@/src/schemas";

// Obtener las categorias
async function getCategories() {
  const token = await getToken();

  const url = `${process.env.API_URL}/categories`;
  const req = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      cache: "no-store",
    },
  });
  const json = await req.json();
  
  const categories = CategoriesAPIResponseSchema.parse(json);
  
  return categories;
}

// export async function getCategories() {
//   try {
//     const token = await getToken();
//     if (!token) {
//       throw new Error("No se encontró el token de autenticación.");
//     }

//     const url = `${process.env.API_URL}/categories`;

//     const req = await fetch(url, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       cache: "no-store",
//       credentials: "include",
//     });

//     // ⚠️ Si la respuesta no es OK (200–299)
//     if (!req.ok) {
//       const errorData = await req.json().catch(() => ({}));
//       if (req.status === 401 || req.status === 403) {
//         throw new Error(errorData.error || "Token inválido o expirado.");
//       } else {
//         throw new Error(
//           errorData.error ||
//             `Error ${req.status}: No se pudo obtener las categorías.`
//         );
//       }
//     }

//     const json = await req.json();

//     // ✅ Validar estructura con Zod
//     const parsed = CategoriesAPIResponseSchema.safeParse(json);
//     if (!parsed.success) {
//       console.error("❌ Error de validación Zod:", parsed.error);
//       throw new Error(
//         "La respuesta del servidor no tiene el formato esperado."
//       );
//     }

//     console.log("✅ Categorías:", parsed.data);
//     return parsed.data;
//   } catch (error: any) {
//     console.error("🚨 Error en getCategories:", error.message);
//     return null; // o podrías lanzar de nuevo el error para manejarlo fuera
//   }
// }

export default async function ProductsPage() {
  const categories = await getCategories();

  return (
    <div className="flex-1 md:rounded-tl-3xl shadow-md  flex  flex-col ">
      <ProductContainer categories={categories} />
    </div>
  );
}
