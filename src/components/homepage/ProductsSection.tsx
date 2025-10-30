"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import ProductListSec from "@/components/common/ProductListSec";
import RetryError from "@/components/common/RetryError";
import NoDataFound from "@/components/common/NoDataFound";
import { BaseApiService } from "@/lib/api";
import { Product } from "@/types/product.types";
import { assetUrl } from "@/config/images";

export default function ProductsSection({
  title,
  desc,
  endpoint = "/products",
  params,
  limit = 9,
}: {
  title: string;
  desc?: string;
  endpoint?: string;
  params?: Record<string, string | number | undefined>;
  limit?: number;
}) {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const qs = useMemo(() => {
    const search = new URLSearchParams();
    const p = { ...params, limit } as Record<string, any>;
    Object.entries(p).forEach(([k, v]) => {
      if (v !== undefined && v !== null && String(v).length) search.set(k, String(v));
    });
    const s = search.toString();
    return s ? `?${s}` : "";
  }, [params, limit]);

  const mapApiProductToProduct = (p: any): Product => {
    const assets = Array.isArray(p?.assets) ? p.assets : [];
    const primary = assets.find((a: any) => a?.isPrimary) || assets[0];
    const gallery = assets.map((a: any) => assetUrl(a?.storageKey)).filter(Boolean);
    const base = parseFloat(p?.basePrice ?? 0);
    const current = parseFloat(((p?.currentPrice ?? base) || 0) as any);
    const percentage = base > 0 && current < base ? Math.round(((base - current) / base) * 100) : 0;
    const amount = base > 0 && current < base ? Math.max(0, base - current) : 0;
    const tags = Array.isArray(p?.categories) ? p.categories.map((c: any) => c?.name || c?.slug).filter(Boolean) : [];
    return {
      id: p?.id ?? p?._id ?? p?.slug ?? "",
      title: p?.title ?? p?.name ?? "",
      srcUrl: assetUrl(primary?.storageKey) || "/images/pic1.png",
      gallery,
      price: Number.isFinite(current) ? current : 0,
      discount: { amount, percentage },
      rating: Number.isFinite(p?.rating) ? Number(p.rating) : 0,
      tags,
    } as Product;
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const api = new BaseApiService({ baseUrl: process.env.NEXT_PUBLIC_API_BASE });
      const res: any = await api.get<any>(`${endpoint}${qs}`, { cache: "no-store" });
      const raw = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
      const mapped = raw.map(mapApiProductToProduct);
      setItems(mapped);
    } catch (e: any) {
      setError(e?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  }, [endpoint, qs]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <section className="mb-[50px] sm:mb-20">
      <ProductListSec title={title} desc={desc ?? ""} data={items as Product[]} />
      {loading && (
        <div className="max-w-frame mx-auto px-4 xl:px-0 text-sm text-black/60 mt-2">Loading…</div>
      )}
      {error && (
        <div className="max-w-frame mx-auto px-4 xl:px-0 mt-3">
          <RetryError message={error} onRetry={fetchData} />
        </div>
      )}
      {!loading && !error && items.length === 0 && (
        <div className="max-w-frame mx-auto px-4 xl:px-0 mt-3">
          <NoDataFound title="No designs found" />
        </div>
      )}
    </section>
  );
}

