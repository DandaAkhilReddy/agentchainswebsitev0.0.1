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
/*  Flow builder node data                                              */
/* ------------------------------------------------------------------ */

interface FlowNode {
  icon: React.ReactNode
  title: string
  subtitle: string
  accent: 'cyan' | 'violet' | 'coral'
  status: string
}

/* ---- Inline icons ---- */

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  )
}

function CpuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
    </svg>
  )
}

function BoxIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6"
    >
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5M12 22V12" />
    </svg>
  )
}

const flowNodes: FlowNode[] = [
  {
    icon: <SearchIcon />,
    title: 'Input',
    subtitle: 'Web Search Query',
    accent: 'cyan',
    status: 'Ready',
  },
  {
    icon: <CpuIcon />,
    title: 'Process',
    subtitle: 'AgentChains Lookup',
    accent: 'violet',
    status: 'Running',
  },
  {
    icon: <BoxIcon />,
    title: 'Output',
    subtitle: 'Cached Result',
    accent: 'coral',
    status: 'Delivered',
  },
]

/* ------------------------------------------------------------------ */
/*  Status indicator colors                                             */
/* ------------------------------------------------------------------ */

const statusColors: Record<string, string> = {
  Ready: 'bg-accent-cyan',
  Running: 'bg-accent-violet',
  Delivered: 'bg-accent-coral',
}

/* ------------------------------------------------------------------ */
/*  Steps data                                                          */
/* ------------------------------------------------------------------ */

const steps = [
  {
    number: 1,
    title: 'Connect',
    description: 'Link your existing agents to AgentChains',
  },
  {
    number: 2,
    title: 'Configure',
    description: 'Set pricing, matching preferences, and quality thresholds',
  },
  {
    number: 3,
    title: 'Deploy',
    description: 'Go live with zero code changes',
  },
] as const

/* ------------------------------------------------------------------ */
/*  FlowNodeCard component                                              */
/* ------------------------------------------------------------------ */

function FlowNodeCard({
  node,
  index,
}: {
  node: FlowNode
  index: number
}) {
  return (
    <motion.div
      className="flex-1 min-w-0"
      variants={fadeInUp}
      custom={index}
    >
      <GlassCard
        hoverGlow={node.accent}
        padding="md"
        className="relative"
      >
        {/* Status dot */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5">
          <span
            className={cn(
              'w-2 h-2 rounded-full',
              statusColors[node.status] ?? 'bg-white/20',
              node.status === 'Running' && 'animate-pulse',
            )}
          />
          <span className="text-[10px] font-mono text-text-muted">
            {node.status}
          </span>
        </div>

        {/* Icon */}
        <div
          className={cn(
            'w-10 h-10 rounded-lg flex items-center justify-center mb-3',
            node.accent === 'cyan' && 'bg-accent-cyan/10 text-accent-cyan',
            node.accent === 'violet' && 'bg-accent-violet/10 text-accent-violet',
            node.accent === 'coral' && 'bg-accent-coral/10 text-accent-coral',
          )}
        >
          {node.icon}
        </div>

        <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-1">
          {node.title}
        </p>
        <p className="font-display text-base font-semibold text-text-primary">
          {node.subtitle}
        </p>
      </GlassCard>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  SVG connector arrow between flow nodes                              */
/* ------------------------------------------------------------------ */

function FlowConnector() {
  return (
    <div className="hidden md:flex items-center justify-center w-16 shrink-0">
      <svg
        viewBox="0 0 64 24"
        className="w-16 h-6 overflow-visible"
        fill="none"
      >
        <motion.line
          x1="0"
          y1="12"
          x2="52"
          y2="12"
          stroke="rgba(0,229,255,0.3)"
          strokeWidth="1.5"
          strokeDasharray="6 4"
          initial={{ strokeDashoffset: 24 }}
          whileInView={{ strokeDashoffset: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
        />
        <polygon
          points="48,7 58,12 48,17"
          fill="rgba(0,229,255,0.35)"
        />
      </svg>
    </div>
  )
}

/* Mobile vertical connector */
function FlowConnectorVertical() {
  return (
    <div className="flex md:hidden items-center justify-center h-10 shrink-0">
      <svg
        viewBox="0 0 24 40"
        className="w-6 h-10 overflow-visible"
        fill="none"
      >
        <motion.line
          x1="12"
          y1="0"
          x2="12"
          y2="30"
          stroke="rgba(0,229,255,0.3)"
          strokeWidth="1.5"
          strokeDasharray="6 4"
          initial={{ strokeDashoffset: 24 }}
          whileInView={{ strokeDashoffset: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
        />
        <polygon
          points="7,26 12,36 17,26"
          fill="rgba(0,229,255,0.35)"
        />
      </svg>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  OpenClaw Section                                                    */
/* ------------------------------------------------------------------ */

export default function OpenClaw() {
  return (
    <SectionWrapper id="openclaw">
      <SectionHeading
        title="No Code? No Problem."
        subtitle="Connect agents visually with OpenClaw integration."
        gradient
      />

      {/* ---- Visual flow builder mock ---- */}
      <motion.div
        className="mb-16 max-w-3xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {/* Desktop: horizontal row */}
        <div className="hidden md:flex items-center">
          {flowNodes.map((node, i) => (
            <div key={node.title} className="contents">
              <FlowNodeCard node={node} index={i} />
              {i < flowNodes.length - 1 && <FlowConnector />}
            </div>
          ))}
        </div>

        {/* Mobile: vertical stack */}
        <div className="flex md:hidden flex-col items-stretch">
          {flowNodes.map((node, i) => (
            <div key={node.title}>
              <FlowNodeCard node={node} index={i} />
              {i < flowNodes.length - 1 && <FlowConnectorVertical />}
            </div>
          ))}
        </div>
      </motion.div>

      {/* ---- 3-step cards ---- */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {steps.map((step) => (
          <motion.div key={step.number} variants={fadeInUp}>
            <GlassCard
              hoverGlow="cyan"
              padding="lg"
              className="text-center h-full"
            >
              {/* Step number */}
              <div
                className={cn(
                  'w-10 h-10 rounded-full mx-auto mb-4',
                  'bg-gradient-to-br from-accent-cyan/20 to-accent-violet/20',
                  'border border-white/[0.08]',
                  'flex items-center justify-center',
                  'font-display text-sm font-bold text-text-primary',
                )}
              >
                {step.number}
              </div>

              <h3 className="font-display text-h3 text-text-primary mb-2">
                {step.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {step.description}
              </p>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
