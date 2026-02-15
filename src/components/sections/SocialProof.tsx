import { motion } from 'framer-motion'
import { SectionWrapper } from '../ui/SectionWrapper'
import { SectionHeading } from '../ui/SectionHeading'
import { GlassCard } from '../ui/GlassCard'
import { AnimatedCounter } from '../ui/AnimatedCounter'
import { staggerContainer, fadeInUp } from '../../design-system/animations'
import { cn } from '../../lib/cn'

/* ------------------------------------------------------------------ */
/*  Stats data                                                         */
/* ------------------------------------------------------------------ */

interface StatItem {
  value: number | null
  display?: string
  suffix?: string
  label: string
  accent: 'cyan' | 'violet'
}

const stats: StatItem[] = [
  { value: 82, label: 'API Endpoints', accent: 'cyan' },
  { value: 2745, suffix: '+', label: 'Tests Passing', accent: 'violet' },
  { value: 5, label: 'Pre-Built Agents', accent: 'cyan' },
  { value: null, display: '<100ms', label: 'Delivery Latency', accent: 'violet' },
]

/* ------------------------------------------------------------------ */
/*  Tech stack badges                                                  */
/* ------------------------------------------------------------------ */

const techStack = [
  'Python',
  'FastAPI',
  'React',
  'TypeScript',
  'PostgreSQL',
  'Docker',
] as const

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
}

const badgeContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.3 },
  },
}

/* ------------------------------------------------------------------ */
/*  Accent color mapping                                               */
/* ------------------------------------------------------------------ */

const accentTextClass = {
  cyan: 'text-accent-cyan',
  violet: 'text-accent-violet',
} as const

const accentGlow = {
  cyan: 'cyan' as const,
  violet: 'violet' as const,
}

/* ------------------------------------------------------------------ */
/*  Stat card                                                          */
/* ------------------------------------------------------------------ */

function StatCard({ stat }: { stat: StatItem }) {
  return (
    <GlassCard
      hoverGlow={accentGlow[stat.accent]}
      padding="lg"
      variants={fadeInUp}
      className="text-center"
    >
      {/* Large number */}
      <div
        className={cn(
          'text-5xl font-display font-bold',
          accentTextClass[stat.accent],
        )}
      >
        {stat.value !== null ? (
          <AnimatedCounter
            target={stat.value}
            suffix={stat.suffix ?? ''}
            duration={2000}
            className={accentTextClass[stat.accent]}
          />
        ) : (
          <span>{stat.display}</span>
        )}
      </div>

      {/* Label */}
      <p className="mt-2 text-text-secondary text-sm uppercase tracking-wider font-body">
        {stat.label}
      </p>
    </GlassCard>
  )
}

/* ------------------------------------------------------------------ */
/*  Tech badge pill                                                    */
/* ------------------------------------------------------------------ */

function TechBadge({ name }: { name: string }) {
  return (
    <motion.span
      variants={badgeVariants}
      className={cn(
        'inline-flex items-center px-4 py-1.5 rounded-full',
        'glass text-xs font-mono tracking-wider text-text-secondary',
        'border border-white/[0.06]',
        'hover:border-accent-cyan/20 hover:text-text-primary',
        'transition-colors duration-300',
      )}
    >
      {name}
    </motion.span>
  )
}

/* ------------------------------------------------------------------ */
/*  SocialProof section                                                */
/* ------------------------------------------------------------------ */

export default function SocialProof() {
  return (
    <SectionWrapper id="social-proof" className="bg-bg-secondary">
      <SectionHeading
        title="Built for Production"
        subtitle="Not a toy. Not a prototype. Production-grade infrastructure."
      />

      {/* Stats grid */}
      <motion.div
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </motion.div>

      {/* Tech stack badges */}
      <motion.div
        className="mt-12 flex flex-wrap items-center justify-center gap-2"
        variants={badgeContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        {techStack.map((tech) => (
          <TechBadge key={tech} name={tech} />
        ))}
      </motion.div>

      {/* Attribution */}
      <p className="mt-8 text-center text-sm text-text-muted">
        Built by Danda Akhil Reddy &mdash; SDE 2 at Microsoft
      </p>
    </SectionWrapper>
  )
}
