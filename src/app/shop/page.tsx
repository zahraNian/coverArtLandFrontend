import BreadcrumbShop from "@/components/shop-page/BreadcrumbShop";
import ProductCard from "@/components/common/ProductCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PaginatedApiService } from "@/lib/api";
import ShopFiltersClient from "@/components/shop-page/ShopFiltersClient";
import NoDataFound from "@/components/common/NoDataFound";
import { Product } from "@/types/product.types";
import { BaseApiService } from "@/lib/api";

type SearchParams = {
  page?: string;
  limit?: string;
  q?: string;
  sort?: string;
  genres?: string;
  price?: string;
};

async function fetchGenresOptions() {
  const api = new BaseApiService({ baseUrl: process.env.NEXT_PUBLIC_API_BASE });
  try {
    const res = await api.get<any>("/categories", { cache: "no-store" });
    const items = Array.isArray((res as any)?.data) ? (res as any).data : (Array.isArray(res) ? res : []);
    return items.map((g: any) => ({ label: g.name || g.title || String(g.slug || g.id), value: String(g.slug || g.id || g.name || g.title) }));
  } catch (e) {
    return [] as { label: string; value: string }[];
  }
}

async function fetchProducts(params: {
  page: number;
  limit: number;
  q?: string;
  sort?: string;
  genres?: string;
  price?: string;
}) {
  const api = new PaginatedApiService({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE
  });
  try {
    const res = await api.list<{ id: number } & Product>("/products", params, { cache: "no-store" });
    return res;
  } catch (e) {
    return { data: [], meta: { page: params.page, limit: params.limit, total: 0, totalPages: 1 } } as { data: Product[]; meta: any };
  }
}

function buildHref(basePath: string, qp: Record<string, any>) {
  const search = new URLSearchParams();
  Object.entries(qp).forEach(([k, v]) => {
    if (v !== undefined && v !== null && String(v).length) search.set(k, String(v));
  });
  const s = search.toString();
  return s ? `${basePath}?${s}` : basePath;
}

export default async function ShopPage({ searchParams }: { searchParams?: SearchParams }) {
  const page = Math.max(1, Number(searchParams?.page) || 1);
  const limit = Math.min(24, Math.max(1, Number(searchParams?.limit) || 9));
  const q = searchParams?.q || "";
  const sort = searchParams?.sort || "most-popular";
  const genres = searchParams?.genres || "";
  const price = searchParams?.price || "";

  const { data: items, meta } = await fetchProducts({ page, limit, q, sort, genres, price });
  const totalPages = Math.max(1, Number(meta?.totalPages) || 1);

  const genreOptions = await fetchGenresOptions();
  const priceOptions = [
    { label: "Under $50", value: "lt-50" },
    { label: "$50 - $100", value: "50-100" },
    { label: "$100 - $200", value: "100-200" },
    { label: "$200+", value: "gt-200" },
  ];
  const sortOptions = [
    { label: "Most Popular", value: "most-popular" },
    { label: "Low Price", value: "low-price" },
    { label: "High Price", value: "high-price" },
    { label: "Newest", value: "newest" },
  ];

  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbShop />
        <div className="flex md:space-x-5 items-start">
          <div className="flex flex-col w-full space-y-5">
            <h1 className="font-bold text-2xl md:text-[32px]">All Designs</h1>

            <ShopFiltersClient
              genreOptions={genreOptions}
              priceOptions={priceOptions}
              sortOptions={sortOptions}
              initial={{ q, sort, genres: genres ? genres.split(",") : [], price }}
            />

            {items.length === 0 ? (
              <NoDataFound
                title="No designs found"
              />
            ) : (
              <>
                <div className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
                  {items.map((product) => (
                    <ProductCard key={product.id} data={product as Product} />
                  ))}
                </div>
                <hr className="border-t-black/10" />
                <Pagination className="justify-between">
                  <PaginationPrevious
                    href={page > 1 ? buildHref("/shop", { page: page - 1, limit, q, sort, genres, price }) : undefined}
                    className="border border-black/10"
                  />
                  <PaginationContent>
                    {Array.from({ length: totalPages }).map((_, i) => {
                      const p = i + 1;
                      return (
                        <PaginationItem key={p}>
                          <PaginationLink
                            href={buildHref("/shop", { page: p, limit, q, sort, genres, price })}
                            className="text-black/50 font-medium text-sm"
                            isActive={p === page}
                          >
                            {p}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}
                  </PaginationContent>
                  <PaginationNext
                    href={page < totalPages ? buildHref("/shop", { page: page + 1, limit, q, sort, genres, price }) : undefined}
                    className="border border-black/10"
                  />
                </Pagination>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
