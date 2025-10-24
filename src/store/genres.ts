"use client"

import { create } from "zustand"
import { BaseApiService } from "@/lib/api"

export type GenreOption = { label: string; value: string }

interface GenresState {
  genres: GenreOption[]
  loading: boolean
  error: string | null
  setGenres: (g: GenreOption[]) => void
  fetchGenres: () => Promise<void>
}

export const useGenresStore = create<GenresState>((set, get) => ({
  genres: [],
  loading: false,
  error: null,
  setGenres: (g) => set({ genres: g }),
  fetchGenres: async () => {
    if (get().loading) return
    set({ loading: true, error: null })
    const api = new BaseApiService({ baseUrl: process.env.NEXT_PUBLIC_API_BASE })
    try {
      const res = await api.get<any>("/categories", { cache: "no-store" })
      // Expecting res like { data: Array<{ id,name,title?,slug? }> }
      const items = Array.isArray((res as any)?.data) ? (res as any).data : (Array.isArray(res) ? res : [])
      const options: GenreOption[] = items.map((it: any) => ({
        label: it.name || it.title || String(it.slug || it.id),
        value: String(it.slug || it.id || it.name || it.title),
      }))
      set({ genres: options, loading: false })
    } catch (e: any) {
      set({ loading: false, error: e?.message || "Failed to load genres" })
    }
  },
}))
