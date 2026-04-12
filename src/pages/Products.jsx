import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal, Search, X, MapPin } from 'lucide-react'
import CategoryPill from '../components/ui/CategoryPill'
import ProductCard from '../components/ui/ProductCard'
import { useProducts, useProductLocations, useProductCounts } from '../hooks/useProducts'

import foodPatternBg from '../assets/images/food-pattern.jpg'

const CATEGORIES = ['Semua', 'Makanan', 'Minuman', 'Snack']

export default function Products() {
  const [searchParams] = useSearchParams()
  const [query, setQuery]               = useState(searchParams.get('q') || '')
  const [activeCategory, setCategory]   = useState(searchParams.get('category') || 'Semua')
  const [activeLocation, setLocation]   = useState('Semua Lokasi')
  const [filterRating, setFilterRating] = useState(false)
  const [filterPrice, setFilterPrice]   = useState(false)
  const [sortBy, setSortBy]             = useState('default')

  // Sync query and category from URL params (?q=... ?category=...)
  useEffect(() => {
    const q   = searchParams.get('q')
    const cat = searchParams.get('category')
    if (q)   setQuery(q)
    if (cat) setCategory(cat)
  }, [searchParams])

  const locations = useProductLocations()
  const counts    = useProductCounts()

  const filters = {
    category:  activeCategory,
    location:  activeLocation,
    query:     query.trim(),
    minRating: filterRating ? 4 : undefined,
    maxPrice:  filterPrice  ? 100000 : undefined,
  }

  const { data: products } = useProducts(filters)
  const sorted = [...products].sort((a, b) => {
    if (sortBy === 'price-asc')  return a.price - b.price
    if (sortBy === 'price-desc') return b.price - a.price
    if (sortBy === 'rating')     return b.rating - a.rating
    return 0
  })

  const hasActiveFilter = query || activeCategory !== 'Semua' || activeLocation !== 'Semua Lokasi' || filterRating || filterPrice

  function clearAll() {
    setQuery('')
    setCategory('Semua')
    setLocation('Semua Lokasi')
    setFilterRating(false)
    setFilterPrice(false)
    setSortBy('default')
  }

  return (
    <div className="pb-16">

      {/* Page header */}
      <div className="relative h-40 lg:h-52 overflow-hidden">
        <img src={foodPatternBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-ink/60" />
        <div className="absolute inset-0 flex flex-col justify-end max-w-7xl mx-auto px-6 lg:px-10 pb-5">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="font-heading font-bold text-white text-3xl"
          >
            {query ? `Hasil: "${query}"` : 'Semua Produk'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="text-white/85 text-sm font-body mt-1"
          >
            {sorted.length} produk ditemukan
          </motion.p>
        </div>
      </div>

      {/* Search bar */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-5">
        <div className="relative">
          <Search size={16} strokeWidth={1.5} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/50 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari produk, penjual..."
            className="w-full bg-white border-2 border-container focus:border-action rounded-full pl-10 pr-10 py-3 text-sm font-body text-ink outline-none transition-colors placeholder:text-ink/40"
          />
          <AnimatePresence>
            {query && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/50 hover:text-ink transition-colors"
              >
                <X size={16} strokeWidth={1.5} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Category pills with counts */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-4 pb-1">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide py-1">
          {CATEGORIES.map((cat) => (
            <CategoryPill
              key={cat}
              label={`${cat}${counts[cat] !== undefined ? ` (${counts[cat]})` : ''}`}
              active={activeCategory === cat}
              onClick={() => setCategory(cat)}
            />
          ))}
        </div>
      </div>

      {/* Filter + Location + Sort bar */}
      <div className="sticky top-16 z-40 bg-cream border-y border-container">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-2.5 flex items-center gap-3 overflow-x-auto scrollbar-hide">

          {/* Location dropdown */}
          <div className="flex items-center gap-1.5 shrink-0">
            <MapPin size={13} strokeWidth={1.5} className="text-ink/65" />
            <select
              value={activeLocation}
              onChange={(e) => setLocation(e.target.value)}
              className={`text-xs font-body rounded-full px-3 py-1.5 outline-none cursor-pointer transition-colors
                ${activeLocation !== 'Semua Lokasi'
                  ? 'bg-ink text-cream font-semibold'
                  : 'bg-container text-ink'}`}
            >
              {locations.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>

          <div className="w-px h-4 bg-ink/15 shrink-0" />

          {/* Filters */}
          <div className="flex items-center gap-3 shrink-0">
            <SlidersHorizontal size={13} strokeWidth={1.5} className="text-ink/65 shrink-0" />
            <label className="flex items-center gap-1.5 cursor-pointer shrink-0">
              <input type="checkbox" checked={filterRating} onChange={(e) => setFilterRating(e.target.checked)} className="accent-action w-3.5 h-3.5" />
              <span className="text-xs font-body text-ink whitespace-nowrap">Rating 4+</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer shrink-0">
              <input type="checkbox" checked={filterPrice} onChange={(e) => setFilterPrice(e.target.checked)} className="accent-action w-3.5 h-3.5" />
              <span className="text-xs font-body text-ink whitespace-nowrap">Harga &lt;100k</span>
            </label>
          </div>

          <div className="ml-auto shrink-0">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-container text-ink text-xs font-body rounded-full px-3 py-1.5 outline-none cursor-pointer"
            >
              <option value="default">Urutkan</option>
              <option value="price-asc">Harga ↑</option>
              <option value="price-desc">Harga ↓</option>
              <option value="rating">Rating ★</option>
            </select>
          </div>
        </div>

        {/* Active filter tags */}
        <AnimatePresence>
          {hasActiveFilter && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-container/60"
            >
              <div className="max-w-7xl mx-auto px-6 lg:px-10 py-2 flex items-center gap-2 flex-wrap">
                <span className="text-ink/65 text-xs font-body">Filter aktif:</span>
                {query && (
                  <span className="inline-flex items-center gap-1 bg-action/20 text-ink text-xs font-body px-2.5 py-1 rounded-full">
                    "{query}" <button onClick={() => setQuery('')}><X size={10} /></button>
                  </span>
                )}
                {activeCategory !== 'Semua' && (
                  <span className="inline-flex items-center gap-1 bg-action/20 text-ink text-xs font-body px-2.5 py-1 rounded-full">
                    {activeCategory} <button onClick={() => setCategory('Semua')}><X size={10} /></button>
                  </span>
                )}
                {activeLocation !== 'Semua Lokasi' && (
                  <span className="inline-flex items-center gap-1 bg-action/20 text-ink text-xs font-body px-2.5 py-1 rounded-full">
                    {activeLocation} <button onClick={() => setLocation('Semua Lokasi')}><X size={10} /></button>
                  </span>
                )}
                {filterRating && (
                  <span className="inline-flex items-center gap-1 bg-action/20 text-ink text-xs font-body px-2.5 py-1 rounded-full">
                    Rating 4+ <button onClick={() => setFilterRating(false)}><X size={10} /></button>
                  </span>
                )}
                {filterPrice && (
                  <span className="inline-flex items-center gap-1 bg-action/20 text-ink text-xs font-body px-2.5 py-1 rounded-full">
                    &lt;100k <button onClick={() => setFilterPrice(false)}><X size={10} /></button>
                  </span>
                )}
                <button onClick={clearAll} className="text-xs font-body text-ink/65 underline hover:text-ink ml-1">
                  Hapus semua
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Products grid */}
      {sorted.length > 0 ? (
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {sorted.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-24 px-6 text-center"
        >
          <div className="text-4xl mb-3">🍽️</div>
          <p className="font-heading font-bold text-ink text-lg mb-1">Tidak ada produk ditemukan</p>
          <p className="text-ink/65 text-sm font-body mb-4">Coba ubah kata kunci atau filter.</p>
          <button
            onClick={clearAll}
            className="text-sm font-body font-semibold text-action hover:underline"
          >
            Hapus semua filter
          </button>
        </motion.div>
      )}
    </div>
  )
}
