import { type ReactNode } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '../../lib/cn'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonBaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
  className?: string
  icon?: ReactNode
}

type ButtonAsButton = ButtonBaseProps &
  Omit<HTMLMotionProps<'button'>, keyof ButtonBaseProps> & {
    href?: undefined
  }

type ButtonAsAnchor = ButtonBaseProps &
  Omit<HTMLMotionProps<'a'>, keyof ButtonBaseProps> & {
    href: string
  }

type ButtonProps = ButtonAsButton | ButtonAsAnchor

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-base gap-2',
  lg: 'px-8 py-4 text-lg gap-2.5',
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    'bg-gradient-primary text-white font-semibold',
    'shadow-glow-cyan',
    'hover:shadow-glow-cyan-strong',
    'active:opacity-90',
  ].join(' '),
  secondary: [
    'glass text-text-primary font-medium',
    'border border-white/10',
    'hover:border-white/25 hover:bg-white/[0.06]',
  ].join(' '),
  ghost: [
    'text-text-secondary font-medium',
    'hover:text-text-primary',
    'relative',
  ].join(' '),
}

const motionConfig = {
  primary: {
    whileHover: { scale: 1.03, transition: { duration: 0.2 } },
    whileTap: { scale: 0.97 },
  },
  secondary: {
    whileHover: { scale: 1.02, transition: { duration: 0.2 } },
    whileTap: { scale: 0.98 },
  },
  ghost: {
    whileHover: { scale: 1.01 },
    whileTap: { scale: 0.98 },
  },
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  icon,
  href,
  ...props
}: ButtonProps) {
  const baseClasses = cn(
    'inline-flex items-center justify-center rounded-lg',
    'font-body transition-all duration-300 ease-out',
    'cursor-pointer select-none',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    sizeClasses[size],
    variantClasses[variant],
    variant === 'ghost' && 'after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-text-primary after:transition-all after:duration-300 hover:after:w-full',
    className,
  )

  const motion$ = motionConfig[variant]

  if (href) {
    return (
      <motion.a
        href={href}
        className={baseClasses}
        whileHover={motion$.whileHover}
        whileTap={motion$.whileTap}
        {...(props as Omit<HTMLMotionProps<'a'>, 'href' | 'className'>)}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      className={baseClasses}
      whileHover={motion$.whileHover}
      whileTap={motion$.whileTap}
      {...(props as Omit<HTMLMotionProps<'button'>, 'className'>)}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </motion.button>
  )
}
