import { motion } from 'framer-motion'
import { SectionWrapper } from '../ui/SectionWrapper'
import { SectionHeading } from '../ui/SectionHeading'
import { GlassCard } from '../ui/GlassCard'
import {
  fadeInUp,
  staggerContainer,
  slideInLeft,
  slideInRight,
} from '../../design-system/animations'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const stats = [
  { value: '10M+', label: 'duplicate queries / day' },
  { value: '$0.003', label: 'wasted per duplicate' },
  { value: '90%', label: 'of agent work is repeated' },
] as const

/* ------------------------------------------------------------------ */
/*  Waste Visualization (SVG + Framer Motion)                          */
/* ------------------------------------------------------------------ */

function WasteVisualization() {
  const pulseTransition = {
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut' as const,
  }

  return (
    <motion.div
      className="relative flex items-center justify-center w-full aspect-square max-w-md mx-auto"
      variants={slideInRight}
    >
      {/* Ambient coral glow behind the SVG */}
      <div className="absolute inset-0 rounded-full bg-accent-coral/5 blur-3xl" />

      <svg
        viewBox="0 0 400 400"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ----- Background ring ----- */}
        <circle
          cx="200"
          cy="200"
          r="160"
          stroke="rgba(255,51,102,0.06)"
          strokeWidth="1"
        />

        {/* ----- Agent A (top-left) ----- */}
        <motion.circle
          cx="100"
          cy="120"
          r="36"
          fill="rgba(255,51,102,0.08)"
          stroke="rgba(255,51,102,0.4)"
          strokeWidth="1.5"
          animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
          transition={pulseTransition}
        />
        <text
          x="100"
          y="116"
          textAnchor="middle"
          className="fill-accent-coral font-display"
          fontSize="11"
          fontWeight="600"
        >
          Agent A
        </text>
        <text
          x="100"
          y="132"
          textAnchor="middle"
          className="fill-text-muted"
          fontSize="9"
        >
          compute
        </text>

        {/* ----- Agent B (bottom-left) ----- */}
        <motion.circle
          cx="100"
          cy="280"
          r="36"
          fill="rgba(255,51,102,0.08)"
          stroke="rgba(255,51,102,0.4)"
          strokeWidth="1.5"
          animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ ...pulseTransition, delay: 0.6 }}
        />
        <text
          x="100"
          y="276"
          textAnchor="middle"
          className="fill-accent-coral font-display"
          fontSize="11"
          fontWeight="600"
        >
          Agent B
        </text>
        <text
          x="100"
          y="292"
          textAnchor="middle"
          className="fill-text-muted"
          fontSize="9"
        >
          compute
        </text>

        {/* ----- API node (right) ----- */}
        <motion.rect
          x="264"
          y="172"
          width="72"
          height="56"
          rx="12"
          fill="rgba(255,51,102,0.06)"
          stroke="rgba(255,51,102,0.5)"
          strokeWidth="1.5"
          animate={{ boxShadow: ['0 0 0px rgba(255,51,102,0)', '0 0 24px rgba(255,51,102,0.3)', '0 0 0px rgba(255,51,102,0)'] }}
          transition={pulseTransition}
        />
        <text
          x="300"
          y="204"
          textAnchor="middle"
          className="fill-accent-coral font-display"
          fontSize="13"
          fontWeight="700"
        >
          API
        </text>

        {/* ----- Arrow: Agent A -> API ----- */}
        <motion.line
          x1="136"
          y1="120"
          x2="264"
          y2="186"
          stroke="rgba(255,51,102,0.5)"
          strokeWidth="1.5"
          strokeDasharray="6 4"
          animate={{ strokeDashoffset: [0, -20] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
        {/* arrowhead A */}
        <motion.polygon
          points="258,182 268,188 260,192"
          fill="rgba(255,51,102,0.6)"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={pulseTransition}
        />

        {/* ----- Arrow: Agent B -> API ----- */}
        <motion.line
          x1="136"
          y1="280"
          x2="264"
          y2="214"
          stroke="rgba(255,51,102,0.5)"
          strokeWidth="1.5"
          strokeDasharray="6 4"
          animate={{ strokeDashoffset: [0, -20] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', delay: 0.4 }}
        />
        {/* arrowhead B */}
        <motion.polygon
          points="258,218 268,212 260,208"
          fill="rgba(255,51,102,0.6)"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ ...pulseTransition, delay: 0.4 }}
        />

        {/* ----- "SAME CALL" label ----- */}
        <motion.g
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <rect
            x="170"
            y="186"
            width="80"
            height="28"
            rx="14"
            fill="rgba(255,51,102,0.12)"
            stroke="rgba(255,51,102,0.3)"
            strokeWidth="1"
          />
          <text
            x="210"
            y="204"
            textAnchor="middle"
            className="fill-accent-coral font-mono"
            fontSize="9"
            fontWeight="600"
          >
            SAME CALL
          </text>
        </motion.g>

        {/* ----- Dollar signs floating out ----- */}
        {[0, 1, 2].map((i) => (
          <motion.text
            key={i}
            x={330 + i * 16}
            y={170 + i * 20}
            className="fill-accent-coral/40 font-mono"
            fontSize="14"
            animate={{ y: [0, -12, 0], opacity: [0.2, 0.6, 0.2] }}
            transition={{ ...pulseTransition, delay: i * 0.5 }}
          >
            $
          </motion.text>
        ))}
      </svg>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Problem Section                                                    */
/* ------------------------------------------------------------------ */

export default function Problem() {
  return (
    <SectionWrapper id="problem" className="bg-bg-secondary">
      <motion.div
        className="grid gap-12 lg:gap-16 lg:grid-cols-2 items-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {/* ---------- Left: Copy + Stats ---------- */}
        <motion.div variants={slideInLeft} className="space-y-8">
          <SectionHeading
            title="The Hidden Cost of AI"
            align="left"
            className="mb-0"
          />

          {/* Hero stat */}
          <div className="space-y-2">
            <p className="font-display text-[clamp(2.5rem,6vw,4rem)] font-extrabold leading-none tracking-tight text-accent-coral">
              $2.4B wasted daily
            </p>
            <p className="text-lg text-text-secondary">
              on duplicate AI computation across the world's agent networks.
            </p>
          </div>

          {/* Stat cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map(({ value, label }) => (
              <GlassCard
                key={value}
                padding="sm"
                hoverGlow="coral"
                variants={fadeInUp}
                className="text-center"
              >
                <p className="font-display text-2xl font-bold text-accent-coral">
                  {value}
                </p>
                <p className="mt-1 text-sm text-text-secondary leading-snug">
                  {label}
                </p>
              </GlassCard>
            ))}
          </motion.div>
        </motion.div>

        {/* ---------- Right: Visualization ---------- */}
        <WasteVisualization />
      </motion.div>
    </SectionWrapper>
  )
}
