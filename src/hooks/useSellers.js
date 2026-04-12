import { useMemo } from 'react'
import { sellers } from '../data/sellers'

export function useSellers(query = '') {
  const data = useMemo(() => {
    if (!query) return sellers
    const q = query.toLowerCase()
    return sellers.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.location.toLowerCase().includes(q) ||
        s.specialties.some((sp) => sp.toLowerCase().includes(q))
    )
  }, [query])
  return { data, loading: false, error: null }
}

export function useSellerById(id) {
  const data = useMemo(() => sellers.find((s) => s.id === id) || null, [id])
  return { data, loading: false, error: null }
}
