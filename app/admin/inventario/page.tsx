import IngredientList from "@/components/inventory/IngredientList";
import { getIngredients } from "@/actions/inventory/ingredients-actions";

export default async function InventoryPage() {
  const ingredients = await getIngredients();

  return (
    <div className="flex-1 p-10 h-screen bg-surface-base overflow-auto">
      <IngredientList ingredients={ingredients} />
    </div>
  );
}
