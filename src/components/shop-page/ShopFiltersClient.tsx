"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FiSliders } from "react-icons/fi";
import SortSelect from "@/components/shop-page/controls/SortSelect";
import GenreMultiSelect from "@/components/shop-page/controls/GenreMultiSelect";
import PriceRangeSelect from "@/components/shop-page/controls/PriceRangeSelect";
import ActiveFilters from "@/components/shop-page/controls/ActiveFilters";
import { useGenresStore } from "@/store/genres";
import RetryError from "@/components/common/RetryError";

export type Option = { label: string; value: string };

type Props = {
  genreOptions: Option[];
  priceOptions: Option[];
  sortOptions: Option[];
  initial: {
    q: string;
    sort?: string;
    genres: string[];
    price?: string;
  };
};

export default function ShopFiltersClient({ genreOptions, priceOptions, sortOptions, initial }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const storeGenres = useGenresStore((s) => s.genres);
  const storeLoading = useGenresStore((s) => s.loading);
  const genreListError = useGenresStore((s) => s.error);
  const fetchStoreGenres = useGenresStore((s) => s.fetchGenres);

  const [search, setSearch] = useState<string>(initial.q || "");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [genres, setGenres] = useState<string[]>(initial.genres || []);
  const [price, setPrice] = useState<string | undefined>(initial.price || undefined);
  const [sort, setSort] = useState<string | undefined>(initial.sort || "most-popular");

  // Prefetch genres on mount if empty so filters are ready without SSR
  useEffect(() => {
    if (!storeGenres.length && !storeLoading && !genreListError) {
      fetchStoreGenres();
    }
  }, [storeGenres.length, storeLoading, genreListError, fetchStoreGenres]);

  const mergedGenreOptions = storeGenres.length ? storeGenres : genreOptions;
  const activeGenreLabels = useMemo(() => mergedGenreOptions.filter((g) => genres.includes(g.value)), [mergedGenreOptions, genres]);
  const activePriceLabel = useMemo(() => priceOptions.find((p) => p.value === price) || null, [priceOptions, price]);

  const updateUrl = useCallback(
    (overrides: Record<string, any>) => {
      const qp = new URLSearchParams(searchParams?.toString());
      const setOrDel = (key: string, value?: string | string[]) => {
        if (Array.isArray(value)) {
          const v = value.filter(Boolean).join(",");
          if (v) qp.set(key, v);
          else qp.delete(key);
        } else if (value && String(value).length) {
          qp.set(key, String(value));
        } else {
          qp.delete(key);
        }
      };
      setOrDel("q", overrides.q ?? search);
      setOrDel("sort", overrides.sort ?? sort);
      setOrDel("genres", overrides.genres ?? genres);
      setOrDel("price", overrides.price ?? price);
      // reset to page 1 when filters/search change
      qp.set("page", "1");
      const url = `${pathname}?${qp.toString()}`;
      router.push(url);
    },
    [genres, price, search, sort, pathname, router, searchParams]
  );

  const clearAll = useCallback(() => {
    setGenres([]);
    setPrice(undefined);
    setSort("most-popular");
    setSearch("");
    const qp = new URLSearchParams();
    qp.set("page", "1");
    qp.set("limit", searchParams?.get("limit") || "9");
    router.push(`${pathname}?${qp.toString()}`);
  }, [pathname, router, searchParams]);

  return (
    <div className="flex flex-col w-full space-y-5">
      <div className="w-full">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateUrl({ q: search });
          }}
        >
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="h-11"
          />
        </form>
      </div>

      <div className="flex flex-col lg:flex-row lg:justify-between">
        <div className="flex flex-col sm:items-center sm:flex-row gap-3 sm:gap-4">
          <SortSelect
            options={sortOptions}
            value={sort}
            onChange={(v) => {
              setSort(v);
              updateUrl({ sort: v });
            }}
          />
          <Button variant="outline" onClick={() => setShowFilters((s) => !s)} className="gap-2">
            <FiSliders className="text-base" /> Filters
          </Button>
          <Button variant="ghost" onClick={clearAll} className="text-black/70">
            Clear all
          </Button>
        </div>
      </div>

      {showFilters && (
        <div className="flex gap-3 sm:gap-4 border border-black/10 rounded-xl p-4">
          <div className="flex flex-col gap-2">
            <span className="text-sm text-black/60">Genre</span>
            <GenreMultiSelect
              options={mergedGenreOptions}
              value={genres}
              onChange={(vals) => {
                setGenres(vals);
                updateUrl({ genres: vals });
              }}
              loading={storeLoading}
              onOpen={() => {
                if (!storeGenres.length && !storeLoading) fetchStoreGenres();
              }}
            />
            {genreListError && (
              <RetryError
                message={genreListError}
                onRetry={() => {
                  if (!storeLoading) fetchStoreGenres();
                }}
              />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-black/60">Price Range</span>
            <PriceRangeSelect
              options={priceOptions}
              value={price}
              onChange={(v) => {
                setPrice(v);
                updateUrl({ price: v });
              }}
            />
          </div>
        </div>
      )}

      <ActiveFilters
        genres={activeGenreLabels}
        priceRange={activePriceLabel}
        onRemove={(type, val) => {
          if (type === "genre" && val) {
            const next = genres.filter((g) => g !== val);
            setGenres(next);
            updateUrl({ genres: next });
          }
          if (type === "price") {
            setPrice(undefined);
            updateUrl({ price: undefined });
          }
        }}
        onClearAll={clearAll}
      />
    </div>
  );
}
