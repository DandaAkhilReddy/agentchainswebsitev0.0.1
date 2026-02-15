import { motion } from 'framer-motion'
import { SectionWrapper } from '../ui/SectionWrapper'
import { SectionHeading } from '../ui/SectionHeading'
import { GlassCard } from '../ui/GlassCard'
import {
  staggerContainer,
  scaleIn,
} from '../../design-system/animations'
import { cn } from '../../lib/cn'

/* ------------------------------------------------------------------ */
/*  Feature data                                                       */
/* ------------------------------------------------------------------ */

type Accent = 'cyan' | 'violet' | 'coral'

interface Feature {
  icon: string
  title: string
  description: string
  accent: Accent
}

const features: Feature[] = [
  {
    icon: '\u26A1',
    title: 'Instant Delivery',
    description:
      'One API call. Sub-100ms response. A 3-tier CDN ensures buyers get results fast, every time.',
    accent: 'cyan',
  },
  {
    icon: '\uD83D\uDCB5',
    title: 'Real USD Earnings',
    description:
      'No tokens. No points. Publish a result, set your price, and withdraw real money anytime.',
    accent: 'coral',
  },
  {
    icon: '\uD83D\uDEE1\uFE0F',
    title: 'Verified Trust',
    description:
      'Zero-knowledge proofs verify data provenance without exposing the underlying source.',
    accent: 'cyan',
  },
  {
    icon: '\uD83E\uDDE0',
    title: 'Smart Matching',
    description:
      'Seven routing strategies connect buyers to the best result: cheapest, fastest, highest-rated, and more.',
    accent: 'violet',
  },
  {
    icon: '\uD83E\uDD16',
    title: 'Pre-Built Agents',
    description:
      'Start earning immediately with five ready-to-deploy agents for web search, code analysis, and summarization.',
    accent: 'violet',
  },
  {
    icon: '\uD83C\uDF10',
    title: 'Two-Sided Marketplace',
    description:
      'Developers publish. Users consume. Think of it as an app store where AI agents are the apps.',
    accent: 'coral',
  },
]

/* ------------------------------------------------------------------ */
/*  Accent-dependent style maps                                        */
/* ------------------------------------------------------------------ */

const accentRingColor: Record<Accent, string> = {
  cyan: 'ring-accent-cyan/20',
  violet: 'ring-accent-violet/20',
  coral: 'ring-accent-coral/20',
}

const accentBgColor: Record<Accent, string> = {
  cyan: 'bg-accent-cyan/10',
  violet: 'bg-accent-violet/10',
  coral: 'bg-accent-coral/10',
}

/* ------------------------------------------------------------------ */
/*  Feature Card                                                       */
/* ------------------------------------------------------------------ */

function FeatureCard({ icon, title, description, accent }: Feature) {
  return (
    <GlassCard
      hoverGlow={accent}
      padding="lg"
      variants={scaleIn}
      className="group relative flex flex-col h-full"
    >
      {/* Icon */}
      <span
        className={cn(
          'flex items-center justify-center w-12 h-12 rounded-xl mb-5',
          'text-2xl ring-1',
          accentBgColor[accent],
          accentRingColor[accent],
        )}
        aria-hidden
      >
        {icon}
      </span>

      <h3
        className={cn(
          'font-display text-h3 text-text-primary mb-2',
          'group-hover:text-gradient transition-none',
        )}
      >
        {title}
      </h3>

      <p className="text-text-secondary leading-relaxed flex-1">
        {description}
      </p>

      {/* Corner accent dot */}
      <span
        className={cn(
          'absolute top-4 right-4 w-2 h-2 rounded-full',
          'opacity-0 group-hover:opacity-100 transition-opacity duration-300',
          accent === 'cyan' && 'bg-accent-cyan shadow-glow-cyan',
          accent === 'violet' && 'bg-accent-violet shadow-glow-violet',
          accent === 'coral' && 'bg-accent-coral shadow-glow-coral',
        )}
        aria-hidden
      />
    </GlassCard>
  )
}

/* ------------------------------------------------------------------ */
/*  Features Grid Section                                              */
/* ------------------------------------------------------------------ */

export default function FeaturesGrid() {
  return (
    <SectionWrapper id="features">
      <SectionHeading
        title="Built for Developers, Used by Everyone"
        subtitle="Publish verified AI results. Set your price. Earn real USD when others use them."
        gradient
      />

      {/*
        Bento grid
        Desktop  : 4 columns, first 2 cards span 2 cols (taller), bottom 4 fill 1 col each
        Tablet   : 2 columns
        Mobile   : 1 column
      */}
      <motion.div
        className={cn(
          'grid gap-5',
          'grid-cols-1',
          'md:grid-cols-2',
          'lg:grid-cols-4',
        )}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {features.map((feature, i) => (
          <div
            key={feature.title}
            className={cn(
              // First two cards span 2 columns on desktop for the "bento" look
              i < 2 && 'lg:col-span-2',
            )}
          >
            <FeatureCard {...feature} />
          </div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
