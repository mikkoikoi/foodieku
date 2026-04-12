export default function Button({ variant = 'solid', children, className = '', ...props }) {
  const base = 'font-body font-semibold rounded-full px-6 py-3 transition-colors duration-200 cursor-pointer text-sm'
  const variants = {
    solid: 'bg-action text-ink hover:bg-container',
    outline: 'border-2 border-ink text-ink hover:bg-container bg-transparent',
    ghost: 'text-action hover:bg-action/10',
  }
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
