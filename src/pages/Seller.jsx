import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Clock, Truck, CheckCircle, MessageCircle, Phone, Search, X, Mail, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import Avatar from '../components/ui/Avatar'
import ProductCard from '../components/ui/ProductCard'
import { BackButton } from './Detail'
import { useSellerById } from '../hooks/useSellers'
import { useProducts } from '../hooks/useProducts'

import warungBg from '../assets/images/warung-bg.jpg'

function buildWALink(phone, sellerName) {
  const num = `62${phone.replace(/^0/, '')}`
  const text = encodeURIComponent(`Halo ${sellerName}, saya ingin bertanya tentang produk Anda.`)
  return `https://wa.me/${num}?text=${text}`
}

// Inline SVG icons for platforms not in lucide-react
function InstagramIcon({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function ShopeeIcon({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2a4 4 0 0 0-4 4H5a1 1 0 0 0-1 1l-1 13a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1L20 7a1 1 0 0 0-1-1h-3a4 4 0 0 0-4-4zm0 2a2 2 0 0 1 2 2h-4a2 2 0 0 1 2-2zm-1 8a1 1 0 1 0 2 0v-1h1a1 1 0 1 0 0-2h-1V8a1 1 0 1 0-2 0v1H10a1 1 0 1 0 0 2h1v1z" />
    </svg>
  )
}

function GrabIcon({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
    </svg>
  )
}

function GoFoodIcon({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  )
}

function TokopediaIcon({ size = 16, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm7 4a5 5 0 1 0 0 10A5 5 0 0 0 12 7zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
    </svg>
  )
}

// Build contacts array from seller object
function buildContacts(seller) {
  const list = []
  if (seller.instagram)  list.push({ key: 'instagram',  label: 'Instagram',   value: `@${seller.instagram}`,   href: `https://instagram.com/${seller.instagram}`,                        Icon: InstagramIcon,  color: 'text-pink-600' })
  if (seller.email)      list.push({ key: 'email',      label: 'Email',        value: seller.email,              href: `mailto:${seller.email}`,                                           Icon: Mail,           color: 'text-blue-600' })
  if (seller.shopeeFood) list.push({ key: 'shopeeFood', label: 'ShopeeFood',   value: seller.shopeeFood,         href: `https://shopeefood.co.id/restaurant/${seller.shopeeFood}`,        Icon: ShopeeIcon,     color: 'text-orange-500' })
  if (seller.grabFood)   list.push({ key: 'grabFood',   label: 'GrabFood',     value: seller.grabFood,           href: `https://food.grab.com/id/en/restaurant/${seller.grabFood}`,       Icon: GrabIcon,       color: 'text-green-600' })
  if (seller.goFood)     list.push({ key: 'goFood',     label: 'GoFood',       value: seller.goFood,             href: `https://gofood.co.id/restaurant/${seller.goFood}`,                Icon: GoFoodIcon,     color: 'text-red-500' })
  if (seller.tokopedia)  list.push({ key: 'tokopedia',  label: 'Tokopedia',    value: seller.tokopedia,          href: `https://www.tokopedia.com/${seller.tokopedia}`,                   Icon: TokopediaIcon,  color: 'text-green-700' })
  return list
}

const VISIBLE_LIMIT = 4

function ContactsSection({ seller }) {
  const [expanded, setExpanded] = useState(false)
  const contacts = buildContacts(seller)

  if (contacts.length === 0) return null

  const visible  = expanded ? contacts : contacts.slice(0, VISIBLE_LIMIT)
  const overflow = contacts.length - VISIBLE_LIMIT

  return (
    <div>
      <p className="text-ink/65 text-[10px] uppercase tracking-wide font-body mb-3">Kontak &amp; Platform</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <AnimatePresence initial={false}>
          {visible.map((c) => (
            <motion.a
              key={c.key}
              href={c.href}
              target={c.key === 'email' ? '_self' : '_blank'}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              className="flex items-center gap-3 bg-container/30 hover:bg-container/60 border border-container/50 hover:border-container rounded-2xl px-4 py-3 transition-colors group"
            >
              <c.Icon size={16} className={`${c.color} shrink-0`} />
              <div className="flex-1 min-w-0">
                <p className="text-ink/55 text-[10px] font-body uppercase tracking-wide leading-none mb-0.5">{c.label}</p>
                <p className="text-ink text-sm font-body font-medium truncate">{c.value}</p>
              </div>
              <ExternalLink size={12} strokeWidth={1.5} className="text-ink/30 group-hover:text-ink/60 transition-colors shrink-0" />
            </motion.a>
          ))}
        </AnimatePresence>
      </div>

      {overflow > 0 && (
        <motion.button
          onClick={() => setExpanded((v) => !v)}
          className="mt-3 flex items-center gap-1.5 text-xs font-body font-semibold text-action hover:underline"
          whileTap={{ scale: 0.97 }}
        >
          {expanded ? (
            <><ChevronUp size={13} /> Sembunyikan</>
          ) : (
            <><ChevronDown size={13} /> +{overflow} platform lainnya</>
          )}
        </motion.button>
      )}
    </div>
  )
}

export default function Seller() {
  const { id } = useParams()
  const [productQuery, setProductQuery] = useState('')
  const { data: seller } = useSellerById(id)
  const { data: products } = useProducts({ sellerId: id, query: productQuery.trim() })

  if (!seller) {
    return (
      <div className="flex flex-col items-center justify-center py-24 max-w-7xl mx-auto px-6">
        <p className="font-body text-sm text-ink/60">Toko tidak ditemukan.</p>
        <Link to="/products" className="mt-4 text-action text-sm font-medium hover:underline">← Kembali</Link>
      </div>
    )
  }

  const waLink = buildWALink(seller.whatsapp, seller.name)

  return (
    <div className="pb-28">

      {/* Cover image — standalone, no overlap */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative h-52 lg:h-72 overflow-hidden"
      >
        <img src={warungBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-ink/45" />
        {/* Back button inside cover */}
        <div className="absolute top-4 left-0 right-0 max-w-7xl mx-auto px-6 lg:px-10">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-white text-sm font-body hover:text-white/80 transition-colors bg-ink/60 rounded-full px-4 py-2 font-medium"
          >
            ← Kembali
          </button>
        </div>
      </motion.div>

      {/* White content section — avatar + name START here, not overlapping cover */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Identity row — sits just below cover, in white bg */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex items-center gap-5 pt-6 pb-5 border-b border-container"
        >
          <Avatar monogram={seller.monogram} size="lg" className="shadow-md border-4 border-white ring-2 ring-container shrink-0" />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-heading font-bold text-ink text-2xl lg:text-3xl leading-tight">{seller.name}</h1>
              {seller.verified && (
                <span className="inline-flex items-center gap-1 bg-action/20 text-ink text-xs font-body font-semibold px-2.5 py-1 rounded-full">
                  <CheckCircle size={11} className="text-action" /> Terverifikasi
                </span>
              )}
            </div>
            <p className="text-ink/75 text-sm font-body mt-0.5">
              {seller.category} · {seller.location} · Sejak {seller.since}
            </p>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="grid grid-cols-3 gap-4 py-5 border-b border-container"
        >
          {[
            { label: 'Rating', value: `${seller.rating}★`, highlight: true },
            { label: 'Ulasan', value: seller.reviewCount },
            { label: 'Produk', value: products.length },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className={`font-heading font-bold text-xl ${s.highlight ? 'text-action' : 'text-ink'}`}>{s.value}</p>
              <p className="text-ink/65 text-xs font-body mt-0.5">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Info grid */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="py-6 space-y-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="flex items-start gap-3 bg-container/30 rounded-2xl p-4">
              <Clock size={15} className="text-ink/65 mt-0.5 shrink-0" />
              <div>
                <p className="text-ink/65 text-[10px] uppercase tracking-wide font-body mb-1">Jam Buka</p>
                <p className="text-ink text-sm font-body font-medium leading-snug">{seller.openHours}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-container/30 rounded-2xl p-4">
              <Truck size={15} className="text-ink/65 mt-0.5 shrink-0" />
              <div>
                <p className="text-ink/65 text-[10px] uppercase tracking-wide font-body mb-1">Delivery</p>
                <p className={`text-sm font-body font-medium ${seller.deliveryAvailable ? 'text-ink' : 'text-ink/65'}`}>
                  {seller.deliveryAvailable ? 'Tersedia' : 'Belum tersedia'}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-container/30 rounded-2xl p-4 sm:col-span-2 lg:col-span-1">
              <MapPin size={15} className="text-ink/65 mt-0.5 shrink-0" />
              <div>
                <p className="text-ink/65 text-[10px] uppercase tracking-wide font-body mb-1">Alamat</p>
                <p className="text-ink text-sm font-body leading-snug">{seller.address}</p>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="bg-cream border border-container/60 rounded-2xl p-5">
            <p className="text-ink/65 text-[10px] uppercase tracking-wide font-body mb-2">Tentang Kami</p>
            <p className="text-ink/85 text-sm font-body leading-relaxed">{seller.bio}</p>
          </div>

          {/* Contacts & Platforms */}
          <ContactsSection seller={seller} />

          {/* Specialties */}
          <div>
            <p className="text-ink/65 text-[10px] uppercase tracking-wide font-body mb-3">Spesialitas</p>
            <div className="flex flex-wrap gap-2">
              {seller.specialties.map((s) => (
                <span key={s} className="bg-container text-ink text-sm font-body px-4 py-1.5 rounded-full font-medium">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-container mb-6" />

        {/* Products section */}
        <div className="pb-6">
          {/* Header + search */}
          <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
            <h2 className="font-heading font-bold text-ink text-xl">
              Produk ({products.length})
            </h2>
          </div>

          {/* In-seller search bar */}
          <div className="relative mb-5">
            <Search size={15} strokeWidth={1.5} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/50 pointer-events-none" />
            <input
              type="text"
              value={productQuery}
              onChange={(e) => setProductQuery(e.target.value)}
              placeholder={`Cari di ${seller.name}...`}
              className="w-full bg-white border-2 border-container focus:border-action rounded-full pl-9 pr-9 py-2.5 text-sm font-body text-ink outline-none transition-colors placeholder:text-ink/40"
            />
            <AnimatePresence>
              {productQuery && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setProductQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink/50 hover:text-ink transition-colors"
                >
                  <X size={14} strokeWidth={1.5} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Grid or empty state */}
          {products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} compact />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-2xl mb-2">🔍</p>
              <p className="font-body font-semibold text-ink text-sm mb-1">
                Tidak ada produk "{productQuery}"
              </p>
              <button
                onClick={() => setProductQuery('')}
                className="text-xs font-body text-action hover:underline mt-1"
              >
                Hapus pencarian
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Sticky bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-[0_-4px_16px_rgba(86,47,0,0.1)] px-4 py-3 z-50 flex gap-3">
        <a
          href={`tel:${seller.whatsapp}`}
          className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-ink/20 text-ink hover:bg-container transition-colors shrink-0"
        >
          <Phone size={18} strokeWidth={1.5} />
        </a>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-action text-ink font-body font-semibold rounded-full text-sm hover:bg-container transition-colors"
        >
          <MessageCircle size={18} strokeWidth={1.5} />
          Hubungi via WhatsApp
        </a>
      </div>
    </div>
  )
}
