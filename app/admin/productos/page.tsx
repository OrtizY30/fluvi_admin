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

export default async function ProductsPage() {
  const categories = await getCategories();

  return (
    <div className="flex-1 rounded-tl-3xl shadow-md  flex h-screen  flex-col overflow-hidden">
      <ProductContainer categories={categories} />
    </div>
  );
}
