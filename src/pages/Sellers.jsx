import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Star, MapPin, Clock, CheckCircle } from 'lucide-react'
import { useSellers } from '../hooks/useSellers'

const CATEGORIES = ['Semua', 'Makanan', 'Minuman', 'Snack']

export default function Sellers() {
  const [query, setQuery] = useState('')
  const [activeCategory, setCategory] = useState('Semua')
  const { data: allSellers } = useSellers(query)

  const filtered = activeCategory === 'Semua'
    ? allSellers
    : allSellers.filter((s) => s.category === activeCategory)

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 pb-20">

      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading font-bold text-ink text-3xl mb-1">UMKM Terdaftar</h1>
        <p className="text-ink/65 text-sm font-body">{filtered.length} penjual aktif di Purwokerto & Banyumas</p>
      </div>

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/40" strokeWidth={1.5} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari nama, lokasi, atau menu..."
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-ink/20 bg-white text-sm font-body text-ink placeholder-ink/40 focus:outline-none focus:border-action focus:ring-1 focus:ring-action"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-body font-semibold transition-colors
                ${activeCategory === cat
                  ? 'bg-ink text-cream'
                  : 'bg-white border border-ink/20 text-ink hover:border-ink'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((seller, i) => (
          <motion.div
            key={seller.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.05, ease: 'easeOut' }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <Link to={`/seller/${seller.id}`} className="block h-full">
              <div className="bg-white border border-container rounded-2xl p-5 flex flex-col gap-3 h-full hover:shadow-[0_8px_24px_rgba(86,47,0,0.12)] transition-shadow duration-200">

                {/* Avatar + name */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-container text-ink font-heading font-bold text-sm flex items-center justify-center shrink-0">
                    {seller.monogram}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1">
                      <p className="font-body font-semibold text-ink text-sm truncate">{seller.name}</p>
                      {seller.verified && <CheckCircle size={13} className="text-action shrink-0" />}
                    </div>
                    <p className="text-ink/60 text-xs font-body">{seller.category} · Sejak {seller.since}</p>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-ink/75 text-xs font-body leading-relaxed line-clamp-3 flex-1">{seller.bio}</p>

                {/* Meta */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-body text-ink/60">
                    <MapPin size={11} strokeWidth={1.5} className="shrink-0" />
                    <span className="truncate">{seller.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-body text-ink/60">
                    <Clock size={11} strokeWidth={1.5} className="shrink-0" />
                    <span>{seller.openHours}</span>
                  </div>
                </div>

                {/* Rating + delivery */}
                <div className="flex items-center justify-between pt-1 border-t border-container">
                  <div className="flex items-center gap-1">
                    <Star size={11} className="text-action fill-action" />
                    <span className="text-xs font-body text-ink font-medium">{seller.rating}</span>
                    <span className="text-ink/40 text-xs mx-0.5">·</span>
                    <span className="text-xs font-body text-ink/60">{seller.reviewCount} ulasan</span>
                  </div>
                  {seller.deliveryAvailable && (
                    <span className="text-[10px] font-body font-semibold bg-action/15 text-ink px-2 py-0.5 rounded-full">
                      Delivery
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-24">
          <p className="text-ink/50 font-body text-sm">Tidak ada penjual yang cocok.</p>
        </div>
      )}
    </div>
  )
}
