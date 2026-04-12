import { Link, useLocation } from 'react-router-dom'
import { Search, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import SearchModal from '../ui/SearchModal'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { pathname } = useLocation()

  const links = [
    { to: '/', label: 'Beranda' },
    { to: '/products', label: 'Produk' },
  ]

  return (
    <>
      <header className="sticky top-0 z-50 bg-container border-b border-ink/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link to="/" className="font-heading font-bold text-ink text-2xl tracking-tight shrink-0">
            Foodie Choice
          </Link>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`text-sm font-body transition-colors duration-150
                  ${pathname === l.to ? 'text-ink font-semibold' : 'text-ink/75 hover:text-ink'}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 text-ink">
            <button
              onClick={() => setSearchOpen(true)}
              className="hover:text-action transition-colors"
              aria-label="Cari"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>
            <button
              className="sm:hidden hover:opacity-70 transition-opacity"
              aria-label="Menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="sm:hidden fixed top-16 left-0 right-0 z-40 bg-container border-b-2 border-ink/15 shadow-lg px-6 py-4 flex flex-col gap-1"
          >
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMenuOpen(false)}
                className="text-ink font-body font-semibold py-3 border-b border-ink/15 last:border-0 text-base"
              >
                {l.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global search modal */}
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
