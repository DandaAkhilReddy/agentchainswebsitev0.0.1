import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp } from '../../design-system/animations'
import { cn } from '../../lib/cn'

interface SectionWrapperProps {
  id: string
  children: ReactNode
  className?: string
  fullWidth?: boolean
}

export function SectionWrapper({
  id,
  children,
  className,
  fullWidth = false,
}: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      className={cn(
        'py-section scroll-mt-20',
        !fullWidth && 'max-w-site mx-auto px-6',
        className,
      )}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      {children}
    </motion.section>
  )
}
