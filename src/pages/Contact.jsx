import { motion } from 'framer-motion'
import { MessageCircle, Music2, MapPin, Clock, ChevronRight } from 'lucide-react'

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

const faqs = [
  {
    q: 'Apakah Foodie Choice gratis untuk UMKM?',
    a: 'Ya, sepenuhnya gratis. Kami tidak memungut biaya pendaftaran maupun komisi dari transaksi.',
  },
  {
    q: 'Berapa lama proses pendaftaran UMKM?',
    a: 'Biasanya 1–3 hari kerja setelah kami menerima informasi lengkap toko kamu.',
  },
  {
    q: 'Apakah harus punya delivery untuk daftar?',
    a: 'Tidak. Kamu bisa daftar meskipun hanya melayani pembelian langsung (dine-in atau take-away).',
  },
  {
    q: 'Bagaimana cara pembeli memesan?',
    a: 'Pembeli menghubungi langsung via WhatsApp nomor yang kamu daftarkan. Tidak ada perantara.',
  },
]

export default function Contact() {
  return (
    <div className="pb-20">

      {/* Header */}
      <section className="bg-ink pt-16 pb-14 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-action/10 translate-x-32 -translate-y-32 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-action text-xs font-body tracking-[0.25em] uppercase mb-4"
          >
            Hubungi Kami
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="font-heading font-bold text-white text-4xl lg:text-5xl leading-tight mb-4"
          >
            Ada pertanyaan?<br />Atau mau daftar<br /><span className="text-action">UMKM kamu?</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.4 }}
            className="text-white/70 font-body text-sm max-w-sm leading-relaxed"
          >
            Kami terbuka untuk kolaborasi, pertanyaan, dan pendaftaran UMKM baru. Hubungi kami lewat channel di bawah.
          </motion.p>
        </div>
      </section>

      {/* Cards */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* WhatsApp */}
          <motion.a
            href="https://wa.me/6285649441482?text=Halo%20Foodie%20Choice%2C%20saya%20ingin%20mendaftarkan%20UMKM%20saya."
            target="_blank" rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-white border-2 border-action rounded-2xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-[0_8px_24px_rgba(86,47,0,0.13)] transition-shadow"
          >
            <div className="w-12 h-12 rounded-full bg-action flex items-center justify-center text-ink">
              <MessageCircle size={22} strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-body font-semibold text-ink text-sm mb-1">WhatsApp</p>
              <p className="text-ink/65 text-xs font-body leading-relaxed mb-3">
                Cara paling cepat. Chat langsung untuk daftar UMKM atau tanya apa saja.
              </p>
              <p className="text-action font-body font-semibold text-sm">085649441482</p>
            </div>
            <div className="flex items-center gap-1 text-action text-xs font-body font-semibold mt-auto">
              Chat sekarang <ChevronRight size={13} />
            </div>
          </motion.a>

          {/* Instagram */}
          <motion.a
            href="https://instagram.com/foodie.choice"
            target="_blank" rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-white border border-container rounded-2xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-[0_8px_24px_rgba(86,47,0,0.13)] transition-shadow"
          >
            <div className="w-12 h-12 rounded-full bg-container flex items-center justify-center text-ink">
              <InstagramIcon />
            </div>
            <div>
              <p className="font-body font-semibold text-ink text-sm mb-1">Instagram</p>
              <p className="text-ink/65 text-xs font-body leading-relaxed mb-3">
                Update produk baru, promo, dan cerita UMKM lokal setiap harinya.
              </p>
              <p className="text-ink font-body font-semibold text-sm">@foodie.choice</p>
            </div>
            <div className="flex items-center gap-1 text-ink/60 text-xs font-body font-semibold mt-auto hover:text-action transition-colors">
              Lihat profil <ChevronRight size={13} />
            </div>
          </motion.a>

          {/* TikTok */}
          <motion.a
            href="https://tiktok.com/@foodie.choice"
            target="_blank" rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-white border border-container rounded-2xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-[0_8px_24px_rgba(86,47,0,0.13)] transition-shadow"
          >
            <div className="w-12 h-12 rounded-full bg-container flex items-center justify-center text-ink">
              <Music2 size={22} strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-body font-semibold text-ink text-sm mb-1">TikTok</p>
              <p className="text-ink/65 text-xs font-body leading-relaxed mb-3">
                Video kuliner, review warung, dan konten seru seputar F&B Banyumas.
              </p>
              <p className="text-ink font-body font-semibold text-sm">@foodie.choice</p>
            </div>
            <div className="flex items-center gap-1 text-ink/60 text-xs font-body font-semibold mt-auto hover:text-action transition-colors">
              Lihat profil <ChevronRight size={13} />
            </div>
          </motion.a>
        </div>
      </section>

      {/* Register UMKM banner */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 mt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.3 }}
          className="bg-container rounded-3xl p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-action/15 translate-x-16 -translate-y-16 pointer-events-none" />
          <div className="relative">
            <p className="text-action text-xs font-body tracking-[0.2em] uppercase font-semibold mb-3">Daftarkan UMKM</p>
            <h2 className="font-heading font-bold text-ink text-2xl lg:text-3xl mb-3 leading-tight">
              Punya warung atau kedai di Banyumas?
            </h2>
            <p className="text-ink/75 text-sm font-body leading-relaxed">
              Gratis selamanya. Kami bantu kamu tampil profesional dan mudah ditemukan pembeli lokal. Cukup hubungi kami via WhatsApp dan siapkan info dasar tokomu.
            </p>
          </div>
          <div className="relative flex lg:justify-end">
            <div className="space-y-3 w-full lg:max-w-xs">
              {['Nama & alamat toko', 'Nomor WhatsApp aktif', 'Foto menu unggulan', 'Jam operasional'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/70 rounded-xl px-4 py-2.5">
                  <div className="w-5 h-5 rounded-full bg-action flex items-center justify-center shrink-0">
                    <span className="text-ink text-[10px] font-bold">{i + 1}</span>
                  </div>
                  <p className="text-ink text-xs font-body font-medium">{item}</p>
                </div>
              ))}
              <a
                href="https://wa.me/6285649441482?text=Halo%20Foodie%20Choice%2C%20saya%20ingin%20mendaftarkan%20UMKM%20saya."
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-ink text-cream font-body font-semibold rounded-full py-3.5 text-sm hover:bg-ink/80 transition-colors mt-2"
              >
                <MessageCircle size={16} strokeWidth={1.5} />
                Daftar via WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 mt-14">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading font-bold text-ink text-2xl mb-7 text-center">Pertanyaan Umum</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 + i * 0.07 }}
                className="bg-white border border-container rounded-2xl p-5"
              >
                <p className="font-body font-semibold text-ink text-sm mb-1.5">{faq.q}</p>
                <p className="text-ink/70 text-xs font-body leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Address */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 mt-10">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-start gap-4 bg-container/40 rounded-2xl p-5">
            <div className="w-10 h-10 rounded-full bg-container flex items-center justify-center shrink-0">
              <MapPin size={18} strokeWidth={1.5} className="text-ink" />
            </div>
            <div>
              <p className="font-body font-semibold text-ink text-sm mb-0.5">Lokasi</p>
              <p className="text-ink/70 text-xs font-body">Dukuhwaluh, Kembaran, Banyumas Regency, Central Java 53182</p>
              <div className="flex items-center gap-1.5 mt-2 text-ink/60 text-xs font-body">
                <Clock size={11} strokeWidth={1.5} />
                Respon WhatsApp: Senin–Sabtu, 08.00–20.00
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
