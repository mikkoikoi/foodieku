import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, MapPin, Star, ArrowRight } from 'lucide-react'
import { useProducts } from '../../hooks/useProducts'
import { useSellers } from '../../hooks/useSellers'

function formatPrice(price) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency', currency: 'IDR', maximumFractionDigits: 0,
  }).format(price)
}

export default function SearchModal({ open, onClose }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  // Focus input when modal opens
  useEffect(() => {
    if (open) {
      setQuery('')
      setTimeout(() => inputRef.current?.focus(), 80)
    }
  }, [open])

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const { data: products } = useProducts({ query: query.trim() })
  const { data: sellers } = useSellers(query.trim())

  const hasQuery = query.trim().length > 0
  const productResults = hasQuery ? products.slice(0, 5) : []
  const sellerResults  = hasQuery ? sellers.slice(0, 3) : []
  const hasResults = productResults.length > 0 || sellerResults.length > 0

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 bg-ink/50 z-50"
            onClick={onClose}
          />

          {/* Modal panel */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed top-0 left-0 right-0 z-50 bg-white shadow-2xl rounded-b-3xl overflow-hidden max-w-2xl mx-auto"
          >
            {/* Search input row */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-container">
              <Search size={20} strokeWidth={1.5} className="text-ink/50 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari produk atau penjual..."
                className="flex-1 bg-transparent text-ink font-body text-base outline-none placeholder:text-ink/40"
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-ink/40 hover:text-ink transition-colors">
                  <X size={18} strokeWidth={1.5} />
                </button>
              )}
              <button
                onClick={onClose}
                className="text-ink/60 hover:text-ink transition-colors ml-1 font-body text-sm"
              >
                Batal
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[70vh] overflow-y-auto">
              {!hasQuery && (
                <div className="px-5 py-10 text-center">
                  <p className="text-2xl mb-2">🔍</p>
                  <p className="text-ink/60 font-body text-sm">Ketik nama produk atau penjual</p>
                </div>
              )}

              {hasQuery && !hasResults && (
                <div className="px-5 py-10 text-center">
                  <p className="text-2xl mb-2">😕</p>
                  <p className="text-ink font-body font-semibold text-sm mb-1">
                    Tidak ada hasil untuk "{query}"
                  </p>
                  <p className="text-ink/55 font-body text-xs">Coba kata kunci lain</p>
                </div>
              )}

              {/* Product results */}
              {productResults.length > 0 && (
                <div>
                  <p className="px-5 pt-4 pb-2 text-ink/55 text-xs font-body font-semibold uppercase tracking-wider">
                    Produk
                  </p>
                  {productResults.map((p) => (
                    <Link
                      key={p.id}
                      to={`/products/${p.id}`}
                      onClick={onClose}
                      className="flex items-center gap-3 px-5 py-3 hover:bg-cream transition-colors"
                    >
                      {/* Icon placeholder */}
                      <div className="w-10 h-10 rounded-xl bg-container flex items-center justify-center shrink-0 text-ink/70 text-lg">
                        {p.imageIcon === 'drink' ? '🥤' : p.imageIcon === 'snack' ? '🍪' : '🍽️'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-ink font-body font-medium text-sm truncate">{p.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-action font-body font-bold text-xs">{formatPrice(p.price)}</span>
                          <span className="text-ink/40 text-xs">·</span>
                          <span className="text-ink/60 text-xs font-body truncate">{p.sellerName}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <Star size={11} className="text-action fill-action" />
                        <span className="text-xs font-body text-ink/70">{p.rating}</span>
                      </div>
                    </Link>
                  ))}
                  {products.length > 5 && (
                    <Link
                      to={`/products?q=${encodeURIComponent(query)}`}
                      onClick={onClose}
                      className="flex items-center gap-1 px-5 py-3 text-action text-xs font-body font-semibold hover:underline"
                    >
                      Lihat semua {products.length} produk <ArrowRight size={12} />
                    </Link>
                  )}
                </div>
              )}

              {/* Seller results */}
              {sellerResults.length > 0 && (
                <div className="border-t border-container/60">
                  <p className="px-5 pt-4 pb-2 text-ink/55 text-xs font-body font-semibold uppercase tracking-wider">
                    Penjual
                  </p>
                  {sellerResults.map((s) => (
                    <Link
                      key={s.id}
                      to={`/seller/${s.id}`}
                      onClick={onClose}
                      className="flex items-center gap-3 px-5 py-3 hover:bg-cream transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-container text-ink font-heading font-bold text-sm flex items-center justify-center shrink-0">
                        {s.monogram}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="text-ink font-body font-medium text-sm truncate">{s.name}</p>
                          {s.verified && <span className="text-action text-xs shrink-0">✓</span>}
                        </div>
                        <div className="flex items-center gap-1 mt-0.5">
                          <MapPin size={10} strokeWidth={1.5} className="text-ink/50 shrink-0" />
                          <span className="text-ink/65 text-xs font-body">{s.location}</span>
                          <span className="text-ink/40 text-xs">·</span>
                          <span className="text-ink/65 text-xs font-body">{s.category}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <Star size={11} className="text-action fill-action" />
                        <span className="text-xs font-body text-ink/70">{s.rating}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Bottom padding */}
              {hasResults && <div className="h-4" />}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
