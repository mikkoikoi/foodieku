export default function Avatar({ monogram = '?', size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-9 h-9 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-20 h-20 text-2xl',
  }
  return (
    <div className={`${sizes[size]} rounded-full bg-container text-ink font-heading font-bold flex items-center justify-center shrink-0 ${className}`}>
      {monogram}
    </div>
  )
}
