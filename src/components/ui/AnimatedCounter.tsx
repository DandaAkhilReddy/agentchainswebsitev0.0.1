import { cn } from '../../lib/cn'
import { useAnimatedCounter } from '../../hooks/useAnimatedCounter'

interface AnimatedCounterProps {
  target: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}

export function AnimatedCounter({
  target,
  suffix = '',
  prefix = '',
  duration = 2000,
  className,
}: AnimatedCounterProps) {
  const { count, ref } = useAnimatedCounter(target, duration)

  return (
    <span
      ref={ref}
      className={cn('font-mono tabular-nums', className)}
    >
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}
