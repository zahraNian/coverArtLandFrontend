"use client";

import { Cross2Icon } from "@radix-ui/react-icons";

export type ActiveFiltersProps = {
  genres: { label: string; value: string }[];
  priceRange?: { label: string; value: string } | null;
  onRemove: (type: "genre" | "price", value?: string) => void;
  onClearAll: () => void;
};

export default function ActiveFilters({ genres, priceRange, onRemove, onClearAll }: ActiveFiltersProps) {
  const hasAny = (genres && genres.length > 0) || !!priceRange;
  if (!hasAny) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-black/60">Active filters:</span>
      {genres.map((g) => (
        <button
          key={g.value}
          className="group inline-flex items-center gap-1 rounded-full border border-black/10 bg-black/5 px-2.5 py-1 text-sm hover:bg-black/10"
          onClick={() => onRemove("genre", g.value)}
          aria-label={`Remove ${g.label}`}
        >
          <span>{g.label}</span>
          <Cross2Icon className="h-3.5 w-3.5 text-black/60 group-hover:text-black" />
        </button>
      ))}
      {priceRange ? (
        <button
          className="group inline-flex items-center gap-1 rounded-full border border-black/10 bg-black/5 px-2.5 py-1 text-sm hover:bg-black/10"
          onClick={() => onRemove("price")}
          aria-label={`Remove ${priceRange.label}`}
        >
          <span>{priceRange.label}</span>
          <Cross2Icon className="h-3.5 w-3.5 text-black/60 group-hover:text-black" />
        </button>
      ) : null}
      <button onClick={onClearAll} className="ml-2 text-sm text-black/60 hover:text-black">Clear all</button>
    </div>
  );
}
