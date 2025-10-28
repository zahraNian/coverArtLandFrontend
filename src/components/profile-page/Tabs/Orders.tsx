"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
    if (typeof window !== "undefined") (window as any).__orders_fetching = true;
    setLoading(true);
    setError(null);
    try {
      const api = createApiClient({ baseUrl: process.env.NEXT_PUBLIC_API_BASE });
      // Adjust endpoint if different, e.g. "/orders/my" or "/users/me/orders"
      const res = await api.withAuth.get<any>("/profile/orders", { cache: "no-store" });
      const data = Array.isArray((res as any)?.data) ? (res as any).data : (Array.isArray(res) ? res : []);
      setOrders(data as OrderDTO[]);
      if (typeof window !== "undefined") {
        try {
          sessionStorage.setItem("orders_cache", JSON.stringify(data));
          (window as any).__orders_fetched = true;
        } catch { }
      }
    } catch (e: any) {
      setError(e?.message || "Failed to load orders");
    } finally {
      setLoading(false);
      if (typeof window !== "undefined") (window as any).__orders_fetching = false;
    }
  }, []);

  const didFetch = useRef(false);
  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;
    // Use cache if available
    if (typeof window !== "undefined") {
      try {
        const cached = sessionStorage.getItem("orders_cache");
        if (cached) {
          setOrders(JSON.parse(cached));
          setLoading(false);
          return;
        }
      } catch { }
      if ((window as any).__orders_fetching) return;
    }
    if (orders.length === 0) fetchOrders();
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
