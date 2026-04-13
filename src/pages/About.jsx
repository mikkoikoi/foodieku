import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Heart, MapPin, ShoppingBag, Users } from 'lucide-react'

import marketBg from '../assets/images/market-bg.jpg'
import tempeImg  from '../assets/images/tempe-food.jpg'

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

const values = [
  {
    icon: <Heart size={22} strokeWidth={1.5} />,
    title: 'Dukung Lokal',
    desc: 'Kami percaya setiap warung kecil punya cerita besar. Foodie Choice hadir untuk memastikan UMKM F&B Banyumas bisa ditemukan dan dicintai oleh lebih banyak orang.',
  },
  {
    icon: <MapPin size={22} strokeWidth={1.5} />,
    title: 'Akar Banyumas',
    desc: 'Dari soto Sokaraja yang legendaris hingga mendoan yang selalu hangat — kami fokus pada kuliner asli Banyumas, bukan franchise nasional.',
  },
  {
    icon: <ShoppingBag size={22} strokeWidth={1.5} />,
    title: 'Pesan Langsung',
    desc: 'Tanpa aplikasi tambahan, tanpa komisi platform. Kamu pesan langsung ke penjual via WhatsApp — lebih cepat, lebih personal, lebih menguntungkan penjual.',
  },
  {
    icon: <Users size={22} strokeWidth={1.5} />,
    title: 'Komunitas Nyata',
    desc: 'Foodie Choice bukan sekadar direktori. Kami membangun komunitas antara pembeli lokal dan pelaku usaha F&B yang saling mendukung.',
  },
]

export default function About() {
  return (
    <div className="pb-20">

      {/* Hero */}
      <section className="relative min-h-[52vh] flex items-center overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <img src={marketBg} alt="" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/30" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-action text-xs font-body tracking-[0.25em] uppercase mb-4"
          >
            Tentang Kami
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="font-heading font-bold text-white text-4xl lg:text-6xl leading-tight mb-5 max-w-2xl"
          >
            Satu platform,<br />ribuan cita rasa<br /><span className="text-action">Banyumas.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.4 }}
            className="text-white/75 font-body text-sm leading-relaxed max-w-md"
          >
            Foodie Choice lahir dari kecintaan pada kuliner lokal dan keinginan untuk membantu UMKM F&B Purwokerto & Banyumas berkembang di era digital.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <div className="space-y-5">
              <p className="text-action text-xs font-body tracking-[0.2em] uppercase font-semibold">Cerita Kami</p>
              <h2 className="font-heading font-bold text-ink text-3xl leading-tight">
                Dimulai dari warung kecil di sudut kota.
              </h2>
              <div className="space-y-4 text-ink/80 text-sm font-body leading-relaxed">
                <p>
                  Purwokerto dan Banyumas punya kekayaan kuliner yang luar biasa — soto Sokaraja, mendoan, dawet ayu, nasi liwet Baturaden. Tapi banyak dari warung-warung terbaik ini sulit ditemukan oleh orang luar, bahkan oleh warga lokal sendiri.
                </p>
                <p>
                  Foodie Choice hadir sebagai jembatan. Kami mengumpulkan UMKM F&B terpercaya di Banyumas dalam satu platform yang mudah diakses — lengkap dengan menu, harga, jam buka, dan kontak langsung ke penjual.
                </p>
                <p>
                  Misi kami sederhana: bantu lebih banyak orang menemukan makanan lokal yang enak, dan bantu lebih banyak pelaku UMKM mendapatkan pembeli yang mereka layak dapatkan.
                </p>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img src={tempeImg} alt="Kuliner Banyumas" className="w-full h-72 lg:h-96 object-cover" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Values */}
      <section className="bg-container/40 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <FadeIn>
            <div className="text-center mb-10">
              <p className="text-action text-xs font-body tracking-[0.2em] uppercase font-semibold mb-2">Nilai Kami</p>
              <h2 className="font-heading font-bold text-ink text-2xl">Apa yang kami percaya</h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-6 h-full border border-container">
                  <div className="w-10 h-10 rounded-full bg-action/15 flex items-center justify-center text-ink mb-4">
                    {v.icon}
                  </div>
                  <p className="font-body font-semibold text-ink text-sm mb-2">{v.title}</p>
                  <p className="text-ink/70 text-xs font-body leading-relaxed">{v.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <FadeIn>
        <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { value: '8',    label: 'UMKM Terdaftar' },
              { value: '24+',  label: 'Menu Tersedia' },
              { value: '4.7★', label: 'Rata-rata Rating' },
              { value: '2024', label: 'Tahun Berdiri' },
            ].map((s) => (
              <div key={s.label} className="bg-container/40 rounded-2xl p-6">
                <p className="font-heading font-bold text-action text-3xl mb-1">{s.value}</p>
                <p className="text-ink/70 text-xs font-body">{s.label}</p>
              </div>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* CTA */}
      <FadeIn delay={0.1}>
        <section className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="bg-ink rounded-3xl p-10 lg:p-14 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-action/10 translate-x-20 -translate-y-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-action/10 -translate-x-12 translate-y-12 pointer-events-none" />
            <div className="relative">
              <h3 className="font-heading font-bold text-white text-2xl lg:text-3xl mb-3">
                Siap jelajahi kuliner Banyumas?
              </h3>
              <p className="text-white/70 text-sm font-body mb-7 max-w-md mx-auto">
                Temukan warung favoritmu dan pesan langsung tanpa ribet.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link to="/products"
                  className="inline-flex items-center gap-2 bg-action text-ink font-body font-semibold rounded-full px-7 py-3.5 text-sm hover:bg-container transition-colors"
                >
                  Lihat Menu <ArrowRight size={15} />
                </Link>
                <Link to="/sellers"
                  className="inline-flex items-center gap-2 border-2 border-white/40 text-white font-body font-semibold rounded-full px-7 py-3.5 text-sm hover:border-white hover:bg-white/10 transition-all"
                >
                  Lihat UMKM <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>
    </div>
  )
}
