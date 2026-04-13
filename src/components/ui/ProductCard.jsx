import { Link } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import ImagePlaceholder from './ImagePlaceholder'
import Badge from './Badge'
import RatingStars from './RatingStars'

// Eagerly import all product images so Vite bundles them
const imageMap = import.meta.glob('../../assets/images/*.{jpg,jpeg,png,webp}', { eager: true })

function resolveImage(name) {
  if (!name) return null
  const key = Object.keys(imageMap).find((k) => k.includes(`/${name}.`))
  return key ? imageMap[key].default : null
}

function formatPrice(price) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(price)
}

export default function ProductCard({ product, selected = false, compact = false, index = 0 }) {
  const imgSrc = resolveImage(product.image)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.07, ease: 'easeOut' }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <Link
        to={`/products/${product.id}`}
        className={`bg-white border rounded-2xl overflow-hidden flex flex-col h-full
          shadow-sm hover:shadow-[0_8px_24px_rgba(86,47,0,0.13)]
          transition-shadow duration-200
          ${selected ? 'ring-2 ring-action border-action' : 'border-container'}`}
      >
        <div className="relative overflow-hidden">
          {imgSrc ? (
            <div className="w-full overflow-hidden" style={{ aspectRatio: '4/3' }}>
              <img
                src={imgSrc}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          ) : (
            <ImagePlaceholder icon={product.imageIcon} aspectRatio="4/3" />
          )}
          {product.badge && (
            <div className="absolute top-2 left-2">
              <Badge label={product.badge} />
            </div>
          )}
        </div>
        <div className={`flex flex-col gap-1 flex-1 ${compact ? 'p-2' : 'p-3'}`}>
          <p className={`text-ink font-semibold font-body leading-tight line-clamp-2 ${compact ? 'text-xs' : 'text-sm'}`}>
            {product.name}
          </p>
          <p className={`font-bold font-body ${compact ? 'text-sm' : 'text-[15px]'}`} style={{ color: '#FF9644' }}>
            {formatPrice(product.price)}
          </p>
          <div className="flex items-center gap-1 mt-auto pt-1">
            <MapPin size={10} strokeWidth={1.5} className="text-ink/60 shrink-0" />
            <p className="text-ink/70 text-xs font-body truncate">{product.sellerName}</p>
          </div>
          <RatingStars rating={product.rating} count={product.reviewCount} />
        </div>
      </Link>
    </motion.div>
  )
}