"use client";
import BreadcrumbShop from "@/components/shop-page/BreadcrumbShop";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MobileFilters from "@/components/shop-page/filters/MobileFilters";
import Filters from "@/components/shop-page/filters";
import { FiSliders } from "react-icons/fi";
import { newArrivalsData, relatedProductData, topSellingData } from "../page";
import ProductCard from "@/components/common/ProductCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GenreMultiSelect from "@/components/shop-page/controls/GenreMultiSelect";
import PriceRangeSelect from "@/components/shop-page/controls/PriceRangeSelect";
import SortSelect from "@/components/shop-page/controls/SortSelect";
import ActiveFilters from "@/components/shop-page/controls/ActiveFilters";
import { useMemo, useState } from "react";

export default function ShopPage() {
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const genreOptions = useMemo(
    () => [
      { label: "Casual", value: "casual" },
      { label: "Formal", value: "formal" },
      { label: "Sports", value: "sports" },
      { label: "Outdoor", value: "outdoor" },
      { label: "Accessories", value: "accessories" },
    ],
    []
  );
  const priceOptions = useMemo(
    () => [
      { label: "Under $50", value: "lt-50" },
      { label: "$50 - $100", value: "50-100" },
      { label: "$100 - $200", value: "100-200" },
      { label: "$200+", value: "gt-200" },
    ],
    []
  );
  const sortOptions = useMemo(
    () => [
      { label: "Most Popular", value: "most-popular" },
      { label: "Low Price", value: "low-price" },
      { label: "High Price", value: "high-price" },
      { label: "Newest", value: "newest" },
    ],
    []
  );
  const [genres, setGenres] = useState<string[]>([]);
  const [price, setPrice] = useState<string | undefined>(undefined);
  const [sort, setSort] = useState<string | undefined>("most-popular");

  const activeGenreLabels = useMemo(
    () => genreOptions.filter((g) => genres.includes(g.value)),
    [genreOptions, genres]
  );
  const activePriceLabel = useMemo(
    () => priceOptions.find((p) => p.value === price) || null,
    [priceOptions, price]
  );

  function clearAll() {
    setGenres([]);
    setPrice(undefined);
    setSort("most-popular");
    setSearch("");
  }

  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbShop />
        <div className="flex md:space-x-5 items-start">
          <div className="flex flex-col w-full space-y-5">
            <h1 className="font-bold text-2xl md:text-[32px]">All Designs</h1>
            <div className="w-full">
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="h-11"
              />
            </div>
            <div className="flex flex-col lg:flex-row lg:justify-between">
              <div className="flex flex-col sm:items-center sm:flex-row gap-3 sm:gap-4">
                <SortSelect options={sortOptions} value={sort} onChange={setSort} />
                <Button variant="outline" onClick={() => setShowFilters((s) => !s)} className="gap-2">
                  <FiSliders className="text-base" /> Filters
                </Button>
                <Button variant="ghost" onClick={clearAll} className="text-black/70">Clear all</Button>
              </div>
            </div>
            {showFilters && (
              <div className="flex gap-3 sm:gap-4 border border-black/10 rounded-xl p-4">
                <div className="flex flex-col gap-2">
                  <span className="text-sm text-black/60">Genre</span>
                  <GenreMultiSelect options={genreOptions} value={genres} onChange={setGenres} />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-sm text-black/60">Price Range</span>
                  <PriceRangeSelect options={priceOptions} value={price} onChange={setPrice} />
                </div>
              </div>
            )}
            <ActiveFilters
              genres={activeGenreLabels}
              priceRange={activePriceLabel}
              onRemove={(type, val) => {
                if (type === "genre" && val) setGenres((prev) => prev.filter((v) => v !== val));
                if (type === "price") setPrice(undefined);
              }}
              onClearAll={clearAll}
            />
            <div className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
              {[
                ...relatedProductData.slice(1, 4),
                ...newArrivalsData.slice(1, 4),
                ...topSellingData.slice(1, 4),
              ].map((product) => (
                <ProductCard key={product.id} data={product} />
              ))}
            </div>
            <hr className="border-t-black/10" />
            <Pagination className="justify-between">
              <PaginationPrevious href="#" className="border border-black/10" />
              <PaginationContent>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    className="text-black/50 font-medium text-sm"
                    isActive
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    className="text-black/50 font-medium text-sm"
                  >
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem className="hidden lg:block">
                  <PaginationLink
                    href="#"
                    className="text-black/50 font-medium text-sm"
                  >
                    3
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis className="text-black/50 font-medium text-sm" />
                </PaginationItem>
                <PaginationItem className="hidden lg:block">
                  <PaginationLink
                    href="#"
                    className="text-black/50 font-medium text-sm"
                  >
                    8
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem className="hidden sm:block">
                  <PaginationLink
                    href="#"
                    className="text-black/50 font-medium text-sm"
                  >
                    9
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    className="text-black/50 font-medium text-sm"
                  >
                    10
                  </PaginationLink>
                </PaginationItem>
              </PaginationContent>

              <PaginationNext href="#" className="border border-black/10" />
            </Pagination>
          </div>
        </div>
      </div>
    </main>
  );
}
