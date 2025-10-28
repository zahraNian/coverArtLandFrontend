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
  const colorsClass = ["bg-blue-500", "bg-yellow-500", "bg-green-500", "bg-orange-500", "bg-purple-500", "bg-red-500"]
  const iconUrls = ["/icons/music.svg", "/icons/palette.svg", "/icons/zap.svg", "/icons/volume.svg", "/icons/clock.svg", "/icons/heart.svg"]
  const designsCoutn = [100, 70, 120, 90, 50, 140]
  useEffect(() => {
    // Auto-fetch once if empty and not loading and no known error
    if (!genres.length && !loading && !error) fetchGenres();
  }, [genres.length, loading, error, fetchGenres]);

  const list: GenreItem[] = useMemo(
    () =>
      genres.map((g, idx) => ({
        id: idx + 1,
        title: g.label,
        slug: g.value,
        srcUrl: iconUrls[idx],
        iconClass: colorsClass[idx],
        designCount: designsCoutn[idx],
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
