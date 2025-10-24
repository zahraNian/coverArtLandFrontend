'use client'

import { useEffect } from 'react'
import { useGenresStore, GenreOption } from '@/store/genres'

export default function GenresHydrator({ options }: { options: GenreOption[] }) {
  const setGenres = useGenresStore(s => s.setGenres)
  const genres = useGenresStore(s => s.genres)

  useEffect(() => {
    if (!genres.length && options?.length) {
      setGenres(options)
    }
  }, [genres.length, options, setGenres])

  return null
}
