import { type ReactNode, useRef } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '../../lib/cn'

type HoverGlow = 'cyan' | 'violet' | 'coral' | 'none'
type CardPadding = 'sm' | 'md' | 'lg'

interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode
  className?: string
  hoverGlow?: HoverGlow
  padding?: CardPadding
}

const paddingClasses: Record<CardPadding, string> = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

const glowClasses: Record<HoverGlow, string> = {
  cyan: 'hover:shadow-glow-cyan hover:border-accent-cyan/20',
  violet: 'hover:shadow-glow-violet hover:border-accent-violet/20',
  coral: 'hover:shadow-glow-coral hover:border-accent-coral/20',
  none: '',
}

export function GlassCard({
  children,
  className,
  hoverGlow = 'none',
  padding = 'md',
  ...props
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    cardRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    cardRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.removeProperty('--mouse-x')
    cardRef.current.style.removeProperty('--mouse-y')
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'glass rounded-xl',
        'relative overflow-hidden',
        'transition-all duration-300 ease-out',
        'spotlight',
        paddingClasses[padding],
        glowClasses[hoverGlow],
        className,
      )}
      whileHover={{ scale: 1.02, transition: { duration: 0.25, ease: 'easeOut' } }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
