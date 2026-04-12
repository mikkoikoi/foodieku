import { useMemo } from 'react'
import { products } from '../data/products'

export function useProductDetail(id) {
  const data = useMemo(() => products.find((p) => p.id === id) || null, [id])
  return { data, loading: false, error: null }
}
