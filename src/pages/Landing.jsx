import { useRef } from 'react'
import { Link } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Star, MessageCircle } from 'lucide-react'
import ProductCard from '../components/ui/ProductCard'
import { useFeaturedProducts } from '../hooks/useProducts'
import { useSellers } from '../hooks/useSellers'
import { useProductCounts } from '../hooks/useProducts'

import heroBg   from '../assets/images/hero-food.jpg'
import marketBg from '../assets/images/market-bg.jpg'
import snackImg  from '../assets/images/snack-food.jpg'
import tempeImg  from '../assets/images/tempe-food.jpg'
import coffeeImg from '../assets/images/coffee.jpg'
import nasiImg   from '../assets/images/nasi-food.jpg'

function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Single masonry category card
function CategoryCard({ label, image, count, delay = 0, className = '' }) {
  return (
    <FadeIn delay={delay} className={`h-full ${className}`}>
      <Link to={`/products?category=${encodeURIComponent(label)}`} className="block h-full">
        <motion.div
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          className="relative h-full rounded-2xl overflow-hidden cursor-pointer group"
        >
          <img
            src={image}
            alt={label}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent group-hover:from-ink/70 transition-all duration-300" />
          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="font-heading font-bold text-white text-xl leading-tight">{label}</p>
            <div className="flex items-center justify-between mt-1">
              <p className="text-white/80 text-xs font-body">{count} produk</p>
              <span className="text-white/70 text-xs font-body group-hover:text-action transition-colors flex items-center gap-1">
                Lihat <ArrowRight size={11} />
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
    </FadeIn>
  )
}

export default function Landing() {
  const { data: featured } = useFeaturedProducts()
  const { data: sellers }  = useSellers()
  const counts             = useProductCounts()

  return (
    <div className="pb-16">

      {/* ── HERO ── */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/20" />
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-10 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* LEFT */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1 }}
                className="text-action text-xs font-body tracking-[0.25em] uppercase mb-4"
              >
                F&B · Purwokerto · Banyumas
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-heading font-bold text-white text-5xl lg:text-7xl leading-[1.05] mb-4"
              >
                Foodie<br /><span className="text-action">Choice.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="text-white/85 font-body text-base italic mb-2"
              >
                when you're hungry, eat local!
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="text-white/80 font-body text-sm leading-relaxed mb-8 max-w-sm"
              >
                Temukan UMKM F&B lokal pilihan dari warung kecil hingga kedai kopi. Pesan langsung via WhatsApp, tanpa ribet.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.55 }}
                className="flex flex-wrap gap-3"
              >
                <Link to="/products"
                  className="inline-flex items-center gap-2 bg-action text-ink font-body font-semibold rounded-full px-7 py-3.5 text-sm hover:bg-container transition-colors duration-200"
                >
                  Lihat Menu <ArrowRight size={16} />
                </Link>
                <a
                  href="https://wa.me/6285649441482?text=Halo%20Foodie%20Choice%2C%20saya%20ingin%20tahu%20lebih%20lanjut."
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border-2 border-white/60 text-white font-body font-semibold rounded-full px-7 py-3.5 text-sm hover:border-white hover:bg-white/10 transition-all duration-200"
                >
                  Hubungi Kami
                </a>
              </motion.div>
            </div>

            {/* RIGHT — food image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
              className="hidden lg:flex justify-center items-center"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-full border-2 border-action/30 scale-110" />
                <div className="absolute inset-0 rounded-full border border-action/15 scale-125" />
                <div className="w-[400px] h-[400px] rounded-full overflow-hidden border-4 border-action/40 shadow-[0_0_80px_rgba(255,150,68,0.25)]">
                  <img src={tempeImg} alt="Kuliner Banyumas" className="w-full h-full object-cover" />
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="absolute bottom-8 -right-4 bg-action text-ink font-body font-semibold text-xs rounded-full px-4 py-2 shadow-lg"
                >
                  ✦ UMKM Lokal
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-5 h-8 rounded-full border-2 border-white/50 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-1.5 bg-white/75 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── STATS BAR ── */}
      <FadeIn>
        <section className="bg-ink">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 grid grid-cols-3 gap-6 text-center">
            {[
              { value: '12+',  label: 'Produk Lokal' },
              { value: '4',    label: 'UMKM Terdaftar' },
              { value: '4.7★', label: 'Rata-rata Rating' },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-heading font-bold text-action text-2xl">{s.value}</p>
                <p className="text-white/75 text-xs font-body mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* ── FEATURED GRID ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-12">
        <FadeIn>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading font-bold text-ink text-2xl">Sorotan Minggu Ini</h2>
            <Link to="/products" className="text-action text-sm font-body font-medium hover:underline flex items-center gap-1">
              Lihat Semua <ArrowRight size={14} />
            </Link>
          </div>
        </FadeIn>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* ── CATEGORY MASONRY ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 mt-14">
        <FadeIn>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading font-bold text-ink text-2xl">Jelajahi Kategori</h2>
          </div>
        </FadeIn>

        {/* Masonry grid: Makanan big left, Minuman + Snack stacked right */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4" style={{ gridTemplateRows: 'auto' }}>

          {/* Makanan — tall card, spans 2 rows on desktop */}
          <div className="row-span-2 col-span-1" style={{ minHeight: '320px' }}>
            <CategoryCard
              label="Makanan"
              image={nasiImg}
              count={counts['Makanan'] || 0}
              delay={0.05}
              className="min-h-[320px] lg:min-h-[400px]"
            />
          </div>

          {/* Minuman — top right */}
          <div className="col-span-1 lg:col-span-1" style={{ minHeight: '190px' }}>
            <CategoryCard
              label="Minuman"
              image={coffeeImg}
              count={counts['Minuman'] || 0}
              delay={0.12}
              className="min-h-[190px] lg:min-h-[192px]"
            />
          </div>

          {/* Snack — bottom right */}
          <div className="col-span-1 lg:col-span-1" style={{ minHeight: '190px' }}>
            <CategoryCard
              label="Snack"
              image={snackImg}
              count={counts['Snack'] || 0}
              delay={0.18}
              className="min-h-[190px] lg:min-h-[192px]"
            />
          </div>

          {/* Wide banner on desktop — all products */}
          <div className="col-span-2 lg:col-span-1 row-span-1" style={{ minHeight: '160px' }}>
            <FadeIn delay={0.24} className="h-full">
              <Link to="/products" className="block h-full">
                <motion.div
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  className="relative h-full rounded-2xl overflow-hidden cursor-pointer group min-h-[160px]"
                >
                  <img src={marketBg} alt="Semua Produk" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-ink/70 group-hover:bg-ink/60 transition-all duration-300" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                    <p className="font-heading font-bold text-white text-xl mb-1">Semua Produk</p>
                    <p className="text-white/80 text-xs font-body mb-3">{counts['Semua'] || 0} produk tersedia</p>
                    <span className="inline-flex items-center gap-1.5 bg-action text-ink font-body font-semibold text-xs rounded-full px-4 py-2">
                      Jelajahi <ArrowRight size={12} />
                    </span>
                  </div>
                </motion.div>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── MARKET BANNER ── */}
      <FadeIn delay={0.1}>
        <section className="max-w-7xl mx-auto px-6 lg:px-10 mt-14">
          <div className="relative rounded-3xl overflow-hidden min-h-[200px] lg:min-h-[260px] flex items-center">
            <img src={marketBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-ink/65" />
            <div className="relative px-8 py-10 lg:px-14 w-full grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              <div>
                <p className="text-white/85 text-xs font-body uppercase tracking-widest mb-3">Dukung Lokal</p>
                <h3 className="font-heading font-bold text-white text-3xl lg:text-4xl leading-tight">
                  Banyak pilihan,<br />satu tujuan.
                </h3>
              </div>
              <div className="flex lg:justify-end">
                <Link to="/products"
                  className="inline-flex items-center gap-2 bg-action text-ink font-body font-semibold text-sm rounded-full px-6 py-3 hover:bg-container transition-colors self-start"
                >
                  Lihat Semua Produk <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ── SELLERS ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 mt-14">
        <FadeIn>
          <h2 className="font-heading font-bold text-ink text-2xl mb-6">Penjual Unggulan</h2>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sellers.map((seller, i) => (
            <FadeIn key={seller.id} delay={i * 0.07}>
              <Link to={`/seller/${seller.id}`} className="block h-full">
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="bg-white border border-container rounded-2xl p-4 flex flex-col gap-3 h-full
                    hover:shadow-[0_8px_24px_rgba(86,47,0,0.12)] transition-shadow duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-container text-ink font-heading font-bold text-sm flex items-center justify-center shrink-0">
                      {seller.monogram}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        <p className="font-body font-semibold text-ink text-sm truncate">{seller.name}</p>
                        {seller.verified && <span className="text-action text-xs shrink-0">✓</span>}
                      </div>
                      <p className="text-ink/70 text-xs font-body truncate">{seller.category} · {seller.location}</p>
                    </div>
                  </div>
                  <p className="text-ink/75 text-xs font-body leading-relaxed line-clamp-2 flex-1">{seller.bio}</p>
                  <div className="flex items-center gap-1">
                    <Star size={11} className="text-action fill-action" />
                    <span className="text-xs font-body text-ink font-medium">{seller.rating}</span>
                    <span className="text-ink/50 text-xs mx-1">·</span>
                    <span className="text-xs font-body text-ink/65">{seller.reviewCount} ulasan</span>
                  </div>
                </motion.div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── VISUAL STRIP ── */}
      <FadeIn delay={0.1}>
        <section className="mt-14 relative h-56 lg:h-72 overflow-hidden">
          <img src={snackImg} alt="makanan lokal" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 lg:px-10 pb-8">
            <p className="text-white/85 text-xs font-body uppercase tracking-widest mb-1">Kuliner Lokal</p>
            <p className="font-heading font-bold text-white text-2xl lg:text-3xl">
              Cita rasa asli Banyumas,<br />langsung dari dapurnya.
            </p>
          </div>
        </section>
      </FadeIn>

      {/* ── CTA WHATSAPP ── */}
      <FadeIn delay={0.1}>
        <section className="max-w-7xl mx-auto px-6 lg:px-10 mt-14">
          <div className="bg-container rounded-3xl p-10 lg:p-14 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-action/15 translate-x-20 -translate-y-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-action/10 -translate-x-12 translate-y-12 pointer-events-none" />
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="font-heading font-bold text-ink text-2xl lg:text-3xl mb-3">
                  Punya UMKM F&B<br />di Banyumas?
                </h3>
                <p className="text-ink/80 text-sm font-body leading-relaxed">
                  Daftarkan tokomu gratis dan jangkau lebih banyak pembeli lokal lewat Foodie Choice.
                </p>
              </div>
              <div className="flex lg:justify-end">
                <a
                  href="https://wa.me/6285649441482?text=Halo%20Foodie%20Choice%2C%20saya%20ingin%20mendaftarkan%20UMKM%20saya."
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-ink text-cream font-body font-semibold rounded-full px-7 py-4 text-sm hover:bg-ink/80 transition-colors duration-200"
                >
                  <MessageCircle size={16} strokeWidth={1.5} />
                  Daftar via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>
    </div>
  )
}
