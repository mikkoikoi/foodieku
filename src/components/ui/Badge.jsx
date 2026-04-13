export default function Badge({ label = 'UMKM Binaan' }) {
  return (
    <span className="inline-block bg-action text-ink text-xs px-2.5 py-1 rounded-full font-body font-semibold shadow-sm">
      {label}
    </span>
  )
}
