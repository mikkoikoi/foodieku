import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, ArrowLeft, Clock, Truck, CheckCircle, MessageCircle } from 'lucide-react'
import ImagePlaceholder from '../components/ui/ImagePlaceholder'
import Avatar from '../components/ui/Avatar'
import RatingStars from '../components/ui/RatingStars'
import { useProductDetail } from '../hooks/useProductDetail'
import { useSellerById } from '../hooks/useSellers'

function formatPrice(price) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency', currency: 'IDR', maximumFractionDigits: 0,
  }).format(price)
}

function buildWALink(phone, productName, price) {
  const num = `62${phone.replace(/^0/, '')}`
  const text = encodeURIComponent(
    `Halo, saya tertarik dengan *${productName}* seharga *${price}*. Apakah masih tersedia?`
  )
  return `https://wa.me/${num}?text=${text}`
}

// Shared back button used on detail + seller pages
export function BackButton() {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => navigate(-1)}
      className="inline-flex items-center gap-2 text-ink text-sm font-body hover:text-ink/70 transition-colors bg-container hover:bg-container/70 rounded-full px-4 py-2 font-medium"
    >
      <ArrowLeft size={14} strokeWidth={1.5} />
      Kembali
    </button>
  )
}

export default function Detail() {
  const { id } = useParams()
  const { data: product } = useProductDetail(id)
  const { data: seller } = useSellerById(product?.sellerId)

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-ink max-w-7xl mx-auto px-6">
        <p className="font-body text-sm text-ink/60">Produk tidak ditemukan.</p>
        <Link to="/products" className="mt-4 text-action text-sm font-medium hover:underline">← Kembali</Link>
      </div>
    )
  }

  const waLink = buildWALink(product.sellerWhatsapp, product.name, formatPrice(product.price))

  return (
    <div className="pb-24">
      {/* Back nav */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-5 pb-4">
        <BackButton />
      </div>

      {/* Main content — two column on desktop */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* LEFT — image (constrained, not huge) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="lg:sticky lg:top-24"
          >
            <div className="rounded-2xl overflow-hidden border-2 border-container shadow-sm max-h-[360px]">
              <ImagePlaceholder icon={product.imageIcon} aspectRatio="4/3" className="max-h-[360px]" />
            </div>

            {/* WhatsApp CTA — visible on desktop inside column */}
            <div className="hidden lg:block mt-4">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-action text-ink font-body font-semibold rounded-full py-4 text-sm hover:bg-container transition-colors duration-200"
              >
                <MessageCircle size={18} strokeWidth={1.5} />
                Pesan via WhatsApp
              </a>
            </div>
          </motion.div>

          {/* RIGHT — info */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-5"
          >
            {/* Title + price */}
            <div className="space-y-2">
              <h1 className="font-heading font-bold text-ink text-3xl leading-tight">{product.name}</h1>
              <p className="text-action font-bold text-4xl font-body">{formatPrice(product.price)}</p>
              <div className="flex items-center gap-3 flex-wrap">
                <RatingStars rating={product.rating} count={product.reviewCount} />
                <span className="text-ink/50">·</span>
                <div className="flex items-center gap-1 text-ink/75 text-xs font-body">
                  <MapPin size={12} strokeWidth={1.5} />{product.location}
                </div>
              </div>
            </div>

            <div className="h-px bg-container" />

            {/* Description */}
            <p className="text-ink/85 text-sm font-body leading-relaxed">{product.description}</p>

            <div className="h-px bg-container" />

            {/* Seller Card */}
            {seller && (
              <div className="border border-dashed border-action bg-cream rounded-2xl p-5 space-y-4">
                <p className="text-ink/65 text-xs font-body uppercase tracking-widest font-semibold">Tentang Penjual</p>

                <div className="flex items-center gap-3">
                  <Avatar monogram={seller.monogram} size="md" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="font-body font-semibold text-ink text-sm">{seller.name}</p>
                      {seller.verified && <CheckCircle size={13} className="text-action" />}
                    </div>
                    <p className="text-ink/70 text-xs font-body">{seller.category} · Sejak {seller.since}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-body">
                  <div className="flex items-start gap-2 bg-container/40 rounded-xl p-2.5">
                    <Clock size={13} className="text-ink/50 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-ink/65 text-[10px] uppercase tracking-wide mb-0.5">Jam Buka</p>
                      <p className="text-ink font-medium leading-tight">{seller.openHours}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 bg-container/40 rounded-xl p-2.5">
                    <Truck size={13} className="text-ink/50 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-ink/65 text-[10px] uppercase tracking-wide mb-0.5">Delivery</p>
                      <p className={`font-medium ${seller.deliveryAvailable ? 'text-ink' : 'text-ink/65'}`}>
                        {seller.deliveryAvailable ? 'Tersedia' : 'Belum ada'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-xs font-body text-ink/60">
                  <MapPin size={13} className="mt-0.5 shrink-0 text-ink/65" />
                  <span>{seller.address}</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {seller.specialties.map((s) => (
                    <span key={s} className="bg-container text-ink text-xs font-body px-2.5 py-1 rounded-full">
                      {s}
                    </span>
                  ))}
                </div>

                <p className="text-ink/80 text-xs font-body leading-relaxed">{seller.bio}</p>

                <Link
                  to={`/seller/${seller.id}`}
                  className="block text-center border border-ink/20 text-ink font-body font-semibold text-sm rounded-full py-2.5 hover:bg-container transition-colors"
                >
                  Lihat Profil Toko →
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Sticky bottom — mobile only */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-[0_-4px_16px_rgba(86,47,0,0.1)] px-4 py-3 z-50">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-action text-ink font-body font-semibold rounded-full py-3.5 text-sm hover:bg-container transition-colors duration-200"
        >
          <MessageCircle size={18} strokeWidth={1.5} />
          Pesan via WhatsApp
        </a>
      </div>
    </div>
  )
}
