import { cn } from '../../lib/cn'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  gradient?: boolean
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  title,
  subtitle,
  gradient = false,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-12',
        align === 'center' && 'text-center',
        align === 'left' && 'text-left',
        className,
      )}
    >
      <h2
        className={cn(
          'font-display text-h2 text-text-primary',
          gradient && 'text-gradient',
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-4 max-w-2xl text-lg text-text-secondary leading-relaxed',
            align === 'center' && 'mx-auto',
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
