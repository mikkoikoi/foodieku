// SVG icons mapped to product/category types
const icons = {
  food: (
    <svg viewBox="0 0 64 64" fill="none" className="w-14 h-14 opacity-80" stroke="currentColor" strokeWidth="1.2">
      <path d="M12 20c0-6.6 5.4-12 12-12h16c6.6 0 12 5.4 12 12v4H12v-4z" />
      <rect x="12" y="24" width="40" height="5" rx="2.5" />
      <path d="M14 29v18a3 3 0 003 3h30a3 3 0 003-3V29" />
      <line x1="32" y1="12" x2="32" y2="6" strokeLinecap="round" />
      <line x1="24" y1="38" x2="24" y2="44" strokeLinecap="round" />
      <line x1="32" y1="36" x2="32" y2="46" strokeLinecap="round" />
      <line x1="40" y1="38" x2="40" y2="44" strokeLinecap="round" />
    </svg>
  ),
  drink: (
    <svg viewBox="0 0 64 64" fill="none" className="w-14 h-14 opacity-80" stroke="currentColor" strokeWidth="1.2">
      <path d="M20 12h24l-5 38H25L20 12z" />
      <path d="M18 12h28" strokeLinecap="round" />
      <path d="M44 24c3 0 8 2 8 7s-5 7-8 7" strokeLinecap="round" />
      <path d="M26 24c2-2 10-2 12 0" strokeLinecap="round" />
      <ellipse cx="32" cy="34" rx="4" ry="2" />
    </svg>
  ),
  snack: (
    <svg viewBox="0 0 64 64" fill="none" className="w-14 h-14 opacity-80" stroke="currentColor" strokeWidth="1.2">
      <rect x="12" y="20" width="40" height="28" rx="5" />
      <path d="M22 20v-6" strokeLinecap="round" />
      <path d="M42 20v-6" strokeLinecap="round" />
      <line x1="12" y1="30" x2="52" y2="30" />
      <circle cx="24" cy="38" r="3" />
      <circle cx="32" cy="38" r="3" />
      <circle cx="40" cy="38" r="3" />
    </svg>
  ),
  default: (
    <svg viewBox="0 0 64 64" fill="none" className="w-14 h-14 opacity-80" stroke="currentColor" strokeWidth="1.2">
      <circle cx="32" cy="32" r="20" />
      <path d="M22 36c3-5 17-5 20 0" strokeLinecap="round" />
      <circle cx="25" cy="27" r="2.5" fill="currentColor" stroke="none" />
      <circle cx="39" cy="27" r="2.5" fill="currentColor" stroke="none" />
    </svg>
  ),
}

export default function ImagePlaceholder({ icon = 'food', aspectRatio = '4/3', className = '' }) {
  return (
    <div
      className={`bg-container flex items-center justify-center text-ink w-full ${className}`}
      style={{ aspectRatio }}
    >
      {icons[icon] || icons.default}
    </div>
  )
}
