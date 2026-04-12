export default function CategoryPill({ label, active = false, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 rounded-full px-4 py-2 text-sm font-body font-medium transition-colors duration-200 cursor-pointer
        ${active
          ? 'bg-action text-ink font-semibold'
          : 'bg-container text-ink hover:bg-action/60'
        }`}
    >
      {label}
    </button>
  )
}
