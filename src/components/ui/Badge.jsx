export default function Badge({ label = 'UMKM Binaan' }) {
  return (
    <span className="inline-block bg-ink/20 text-ink text-xs px-2 py-0.5 rounded-full font-body font-medium">
      {label}
    </span>
  )
}
