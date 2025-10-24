"use client";

import { useEffect, useMemo } from "react";
import ProductGenreList from "@/components/common/ProductGenreList";
import { useGenresStore } from "@/store/genres";
import RetryError from "@/components/common/RetryError";
import { GenreItem } from "@/types/productGenre.types";

export default function GenresSection({ title, desc }: { title: string; desc: string }) {
  const genres = useGenresStore((s) => s.genres);
  const loading = useGenresStore((s) => s.loading);
  const error = useGenresStore((s) => s.error);
  const fetchGenres = useGenresStore((s) => s.fetchGenres);

  useEffect(() => {
    // Auto-fetch once if empty and not loading and no known error
    if (!genres.length && !loading && !error) fetchGenres();
  }, [genres.length, loading, error, fetchGenres]);

  const list: GenreItem[] = useMemo(
    () =>
      genres.map((g, idx) => ({
        id: idx + 1,
        title: g.label,
        srcUrl: "/icons/music.svg",
        iconClass: "bg-blue-500",
        designCount: 0,
      })),
    [genres]
  );

  return (
    <section className="mb-[50px] sm:mb-20">
      <ProductGenreList title={title} desc={desc} data={list} />
      {loading && (
        <div className="mx-auto mt-3 max-w-frame px-4 xl:px-0 text-sm text-black/60">Loading genres…</div>
      )}
      {error && (
        <div className="mx-auto mt-3 max-w-frame px-4 xl:px-0">
          <RetryError message={error} onRetry={() => fetchGenres()} />
        </div>
      )}
    </section>
  );
}
