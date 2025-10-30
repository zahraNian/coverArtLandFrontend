import {
  relatedProductData,
} from "@/app/page";
import ProductListSec from "@/components/common/ProductListSec";
import BreadcrumbProduct from "@/components/product-page/BreadcrumbProduct";
import Header from "@/components/product-page/Header";
import Tabs from "@/components/product-page/Tabs";
import { Product } from "@/types/product.types";
import { notFound } from "next/navigation";
import { BaseApiService } from "@/lib/api";
import { assetUrl } from "@/config/images";

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

const fakeProduct: Product = {
  id: "fake-12345",
  title: "کاور فیک - نمونه",
  srcUrl: "/images/fake-1.jpg",
  gallery: ["/images/fake-1.jpg"],
  price: 99900,
  discount: { amount: 0, percentage: 2 },
  rating: 4.5,
  tags: ["Sample"],
};

async function fetchProductRaw(idOrSlug: string) {
  const api = new BaseApiService({ baseUrl: process.env.NEXT_PUBLIC_API_BASE });
  try {
    const res: any = await api.get<any>(`/products/${idOrSlug}`, { cache: "no-store" });
    const p = res?.data ?? res;
    return p || null;
  } catch (e) {
    // Fallback: try query by slug
    try {
      const res: any = await api.get<any>(`/products?slug=${encodeURIComponent(idOrSlug)}&limit=1`, { cache: "no-store" });
      const list = res?.data ?? res;
      if (Array.isArray(list) && list.length > 0) return list[0];
      return null;
    } catch {
      return null;
    }
  }
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const idOrSlug = params.slug?.[0];
  const maybeSlug = params.slug?.[1];
  if (!idOrSlug && !maybeSlug) {
    notFound();
  }

  let apiProduct = idOrSlug ? await fetchProductRaw(idOrSlug) : null;
  if (!apiProduct && maybeSlug) {
    apiProduct = await fetchProductRaw(maybeSlug);
  }
  if (!apiProduct?.title) {
    notFound();
  }
  const productData = mapApiProductToProduct(apiProduct);

  return (
    <main>
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbProduct title={productData?.title ?? "product"} />
        <section className="mb-11">
          <Header data={productData} />
        </section>
        <Tabs product={apiProduct} />
      </div>
      <div className="mb-[50px] sm:mb-20">
        <ProductListSec title="You might also like" data={relatedProductData} />
      </div>
    </main>
  );
}

