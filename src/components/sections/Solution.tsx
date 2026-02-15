import { motion } from 'framer-motion'
import { SectionWrapper } from '../ui/SectionWrapper'
import { SectionHeading } from '../ui/SectionHeading'
import { GlassCard } from '../ui/GlassCard'
import {
  fadeInUp,
  staggerContainer,
} from '../../design-system/animations'
import { cn } from '../../lib/cn'

/* ------------------------------------------------------------------ */
/*  Inline SVG icons                                                   */
/* ------------------------------------------------------------------ */

function BrainIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('w-8 h-8', className)}
    >
      <path d="M12 2a5 5 0 0 1 4.546 2.914A4 4 0 0 1 18 11a4 4 0 0 1-1.5 3.123V17a3 3 0 0 1-3 3h-3a3 3 0 0 1-3-3v-2.877A4 4 0 0 1 6 11a4 4 0 0 1 1.454-6.086A5 5 0 0 1 12 2z" />
      <path d="M10 17v3" />
      <path d="M14 17v3" />
      <path d="M9 8h6" />
      <path d="M9 12h6" />
    </svg>
  )
}

function ExchangeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('w-8 h-8', className)}
    >
      <path d="M2 17l4 4 4-4" />
      <path d="M6 21V7" />
      <path d="M22 7l-4-4-4 4" />
      <path d="M18 3v14" />
    </svg>
  )
}

function GrowthIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('w-8 h-8', className)}
    >
      <path d="M12 2v20" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Step data                                                          */
/* ------------------------------------------------------------------ */

const steps = [
  {
    number: 1,
    title: 'Cache',
    description:
      'Your agent computes a result \u2014 web search, code analysis, translation.',
    Icon: BrainIcon,
  },
  {
    number: 2,
    title: 'Trade',
    description:
      'List it on the marketplace. Set your price. Smart matching finds buyers.',
    Icon: ExchangeIcon,
  },
  {
    number: 3,
    title: 'Earn',
    description:
      'Buyers get instant delivery in <100ms. You earn real USD. 2% platform fee.',
    Icon: GrowthIcon,
  },
] as const

/* ------------------------------------------------------------------ */
/*  Connector Line (desktop only, between cards)                       */
/* ------------------------------------------------------------------ */

function ConnectorLine() {
  return (
    <div className="hidden lg:flex items-center justify-center w-12 shrink-0">
      <svg
        viewBox="0 0 48 24"
        className="w-12 h-6 overflow-visible"
        fill="none"
      >
        <motion.line
          x1="0"
          y1="12"
          x2="48"
          y2="12"
          stroke="rgba(0,229,255,0.35)"
          strokeWidth="2"
          strokeDasharray="6 4"
          initial={{ strokeDashoffset: 20 }}
          whileInView={{ strokeDashoffset: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
        {/* Arrowhead */}
        <polygon
          points="40,6 48,12 40,18"
          fill="rgba(0,229,255,0.4)"
        />
      </svg>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Step Card                                                          */
/* ------------------------------------------------------------------ */

interface StepCardProps {
  number: number
  title: string
  description: string
  Icon: React.ComponentType<{ className?: string }>
  delay: number
}

function StepCard({ number, title, description, Icon, delay }: StepCardProps) {
  return (
    <GlassCard
      hoverGlow="cyan"
      padding="lg"
      variants={fadeInUp}
      custom={delay}
      className="flex-1 min-w-0 relative group"
    >
      {/* Step number badge */}
      <div className="mb-5 flex items-center gap-4">
        <span
          className={cn(
            'flex items-center justify-center w-10 h-10 rounded-full',
            'bg-gradient-primary text-white font-display text-sm font-bold',
            'shadow-glow-cyan shrink-0',
          )}
        >
          {number}
        </span>

        <Icon className="text-accent-cyan opacity-80 group-hover:opacity-100 transition-opacity" />
      </div>

      <h3 className="font-display text-h3 text-text-primary mb-2">
        {title}
      </h3>
      <p className="text-text-secondary leading-relaxed">
        {description}
      </p>

      {/* Subtle accent bar at bottom */}
      <div
        className={cn(
          'absolute bottom-0 left-6 right-6 h-px',
          'bg-gradient-to-r from-transparent via-accent-cyan/30 to-transparent',
          'opacity-0 group-hover:opacity-100 transition-opacity duration-500',
        )}
      />
    </GlassCard>
  )
}

/* ------------------------------------------------------------------ */
/*  Solution Section                                                   */
/* ------------------------------------------------------------------ */

export default function Solution() {
  return (
    <SectionWrapper id="solution">
      {/* Gradient transition strip: warm to cool */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-24 h-48 bg-gradient-to-b from-bg-secondary to-bg-primary"
      />

      <SectionHeading
        title="The Solution"
        subtitle='Think of it as a stock exchange, but for AI knowledge.'
        gradient
      />

      {/* ---- 3-step flow ---- */}
      <motion.div
        className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-0"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {steps.map((step, i) => (
          <div
            key={step.number}
            className="flex flex-col lg:flex-row items-stretch lg:items-center flex-1"
          >
            <StepCard
              number={step.number}
              title={step.title}
              description={step.description}
              Icon={step.Icon}
              delay={i * 0.2}
            />
            {/* Connector between cards (not after last) */}
            {i < steps.length - 1 && <ConnectorLine />}
          </div>
        ))}
      </motion.div>

      {/* ---- Pull-quote ---- */}
      <motion.blockquote
        className={cn(
          'mt-16 max-w-3xl mx-auto text-center',
          'font-display text-xl sm:text-2xl italic text-text-secondary',
          'leading-relaxed',
        )}
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <span className="text-accent-cyan">&ldquo;</span>
        Think of it as a stock exchange, but for AI knowledge.
        <span className="text-accent-cyan">&rdquo;</span>
      </motion.blockquote>
    </SectionWrapper>
  )
}
