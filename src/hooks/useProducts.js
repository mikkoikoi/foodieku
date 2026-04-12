import { useMemo } from 'react'
import { products } from '../data/products'

// Phase 1: returns filtered mock data
// Phase 2: replace internals with fetch() — components stay unchanged
export function useProducts(filters = {}) {
  const data = useMemo(() => {
    let result = [...products]
    if (filters.category && filters.category !== 'Semua') {
      result = result.filter((p) => p.category === filters.category)
    }
    if (filters.maxPrice) {
      result = result.filter((p) => p.price <= filters.maxPrice)
    }
    if (filters.minRating) {
      result = result.filter((p) => p.rating >= filters.minRating)
    }
    if (filters.sellerId) {
      result = result.filter((p) => p.sellerId === filters.sellerId)
    }
    if (filters.location && filters.location !== 'Semua Lokasi') {
      result = result.filter((p) => p.location === filters.location)
    }
    if (filters.query) {
      const q = filters.query.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sellerName.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
    }
    return result
  }, [filters.category, filters.maxPrice, filters.minRating, filters.sellerId, filters.location, filters.query])

  return { data, loading: false, error: null }
}

export function useFeaturedProducts() {
  const data = useMemo(() => products.filter((p) => p.featured), [])
  return { data, loading: false, error: null }
}

// All unique locations from products data
export function useProductLocations() {
  return useMemo(() => {
    const locs = [...new Set(products.map((p) => p.location))].sort()
    return ['Semua Lokasi', ...locs]
  }, [])
}

// Count per category (for pills)
export function useProductCounts() {
  return useMemo(() => {
    const counts = { Semua: products.length }
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1
    })
    return counts
  }, [])
}
