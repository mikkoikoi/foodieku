export default function RatingStars({ rating = 0, count }) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-action text-xs">★</span>
      <span className="text-ink text-xs font-medium">{rating.toFixed(1)}</span>
      {count !== undefined && (
        <span className="text-ink/65 text-xs">({count})</span>
      )}
    </div>
  )
}
