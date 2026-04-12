import { Music2, MessageCircle, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[18px] h-[18px]">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="bg-container mt-12 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-action/10 translate-x-16 -translate-y-16 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-action/10 -translate-x-10 translate-y-10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Brand */}
          <div>
            <p className="font-heading font-bold text-ink text-2xl mb-2">Foodie Choice</p>
            <p className="text-ink/80 text-sm font-body leading-relaxed">
              Platform UMKM F&B lokal Purwokerto & Banyumas.<br />
              Temukan, dukung, dan nikmati kuliner khas daerahmu.
            </p>
          </div>

          {/* Kontak */}
          <div className="space-y-3">
            <p className="text-ink font-body font-semibold text-sm uppercase tracking-wider mb-3">Hubungi Kami</p>
            <a href="https://instagram.com/foodie.choice" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 text-ink hover:text-action transition-colors text-sm font-body group">
              <span className="w-8 h-8 rounded-full bg-ink/5 flex items-center justify-center group-hover:bg-action/20 transition-colors">
                <InstagramIcon />
              </span>
              @foodie.choice
            </a>
            <a href="https://tiktok.com/@foodie.choice" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 text-ink hover:text-action transition-colors text-sm font-body group">
              <span className="w-8 h-8 rounded-full bg-ink/5 flex items-center justify-center group-hover:bg-action/20 transition-colors">
                <Music2 size={16} strokeWidth={1.5} />
              </span>
              @foodie.choice
            </a>
            <a href="https://wa.me/6285649441482" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 text-ink hover:text-action transition-colors text-sm font-body group">
              <span className="w-8 h-8 rounded-full bg-ink/5 flex items-center justify-center group-hover:bg-action/20 transition-colors">
                <MessageCircle size={16} strokeWidth={1.5} />
              </span>
              085649441482
            </a>
            <div className="flex items-start gap-3 text-ink/60 text-sm font-body">
              <span className="w-8 h-8 rounded-full bg-ink/5 flex items-center justify-center shrink-0">
                <MapPin size={16} strokeWidth={1.5} className="text-ink" />
              </span>
              Dukuhwaluh, Kembaran, Banyumas Regency, Central Java 53182
            </div>
          </div>
        </div>

        <div className="border-t border-ink/20 mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-ink/65 text-xs font-body">
          <span>© 2026 Foodie Choice. All rights reserved.</span>
          <span>Made with ❤️ for Banyumas UMKM</span>
        </div>
      </div>
    </footer>
  )
}
