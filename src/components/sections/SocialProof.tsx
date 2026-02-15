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
        'border border-white/[0.09]',
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
        title="Growing Fast"
        subtitle="Trusted by developers building the next generation of AI agents."
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

      {/* Credibility badges */}
      <motion.div
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        <motion.span variants={fadeInUp} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-accent-violet/15 text-sm text-text-secondary">
          <svg className="h-4 w-4 text-accent-violet" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
          VC-Backed
        </motion.span>
        <motion.span variants={fadeInUp} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-accent-coral/15 text-sm text-text-secondary">
          <span className="flex items-center justify-center h-5 w-5 rounded bg-accent-coral/20 text-accent-coral text-[10px] font-bold">YC</span>
          Y Combinator Applicant
        </motion.span>
        <motion.span variants={fadeInUp} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-white/10 text-sm text-text-secondary">
          MIT Licensed &middot; Open Source
        </motion.span>
      </motion.div>
    </SectionWrapper>
  )
}
