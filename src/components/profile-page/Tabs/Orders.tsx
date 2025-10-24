"use client";

import { useCallback, useEffect, useState } from "react";
import OrderCard from "@/components/profile-page/OrderCard";
import RetryError from "@/components/common/RetryError";
import NoDataFound from "@/components/common/NoDataFound";
import { createApiClient } from "@/lib/api";

type OrderStatus = "Completed" | "Pending" | "Cancelled";

type OrderDTO = {
  id: string | number;
  orderNumber?: string;
  placedOn?: string;
  createdAt?: string;
  total?: number;
  status?: OrderStatus | string;
  items?: { name: string; quantity: number; price: number }[];
};

export default function Orders() {
  const [orders, setOrders] = useState<OrderDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const api = createApiClient({ baseUrl: process.env.NEXT_PUBLIC_API_BASE });
      // Adjust endpoint if different, e.g. "/orders/my" or "/users/me/orders"
      const res = await api.withAuth.get<any>("/orders", { cache: "no-store" });
      const data = Array.isArray((res as any)?.data) ? (res as any).data : (Array.isArray(res) ? res : []);
      setOrders(data as OrderDTO[]);
    } catch (e: any) {
      setError(e?.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  if (loading) {
    return (
      <div className="p-4 text-sm text-gray-600 border rounded-xl bg-gray-50">Loading orders…</div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <RetryError message={error} onRetry={fetchOrders} />
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="p-4">
        <NoDataFound title="No orders found" />
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {orders.map((o) => {
        const placedOn = o.placedOn || o.createdAt || "";
        const status = (o.status as OrderStatus) || "Completed";
        const items = Array.isArray(o.items) ? o.items : [];
        const total = o.total ?? items.reduce((s, it) => s + (it.price ?? 0), 0);
        const orderNumber = o.orderNumber || String(o.id);
        return (
          <OrderCard
            key={orderNumber}
            orderNumber={orderNumber}
            placedOn={placedOn}
            total={total}
            status={status}
            items={items}
          />
        );
      })}
    </div>
  );
}
