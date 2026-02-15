import { type ReactNode } from 'react'
import { cn } from '../../lib/cn'

type BadgeVariant = 'cyan' | 'violet' | 'coral' | 'default'

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  cyan: 'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/20',
  violet: 'bg-accent-violet/10 text-accent-violet border-accent-violet/20',
  coral: 'bg-accent-coral/10 text-accent-coral border-accent-coral/20',
  default: 'bg-white/10 text-text-secondary border-white/10',
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full',
        'px-3 py-1 text-xs font-medium',
        'border',
        'transition-colors duration-200',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
