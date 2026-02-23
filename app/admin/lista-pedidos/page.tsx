import OrderList from "@/components/orders/OrderList";
import { getOrders } from "@/actions/orders/order-actions";

export default async function OrderListPage() {
  const orders = await getOrders();

  return (
    <div className="flex-1 p-10 h-screen bg-surface-base overflow-auto">
      <OrderList initialOrders={orders} />
    </div>
  );
}
