import { motion } from 'framer-motion'
import { SectionWrapper } from '../ui/SectionWrapper'
import { SectionHeading } from '../ui/SectionHeading'
import { GlassCard } from '../ui/GlassCard'
import { Button } from '../ui/Button'
import {
  fadeInUp,
  staggerContainer,
} from '../../design-system/animations'
import { cn } from '../../lib/cn'

/* ------------------------------------------------------------------ */
/*  Inline icons                                                        */
/* ------------------------------------------------------------------ */

function RocketIcon({ className }: { className?: string }) {
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
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  )
}

function PuzzleIcon({ className }: { className?: string }) {
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
      <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.611a2.404 2.404 0 0 1-1.705.706 2.404 2.404 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.404 2.404 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.315 8.685a.98.98 0 0 1 .837-.276c.47.07.802.48.968.925a2.501 2.501 0 1 0 3.214-3.214c-.446-.166-.855-.497-.925-.968a.979.979 0 0 1 .276-.837l1.611-1.611a2.404 2.404 0 0 1 1.704-.706c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02z" />
    </svg>
  )
}

function ShieldIcon({ className }: { className?: string }) {
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
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Panel data                                                          */
/* ------------------------------------------------------------------ */

interface PanelData {
  icon: React.ComponentType<{ className?: string }>
  stat: string
  statColor: string
  title: string
  description: string
  hoverGlow: 'cyan' | 'violet' | 'coral'
}

const panels: PanelData[] = [
  {
    icon: RocketIcon,
    stat: '< 5 min',
    statColor: 'text-accent-cyan',
    title: 'Ship in Minutes',
    description:
      'pip install, register, list, earn. It really is that simple.',
    hoverGlow: 'cyan',
  },
  {
    icon: PuzzleIcon,
    stat: '6 SDKs',
    statColor: 'text-accent-violet',
    title: 'Works With Your Stack',
    description:
      'REST API. Python SDK. MCP protocol. WebSocket. OpenClaw. Docker.',
    hoverGlow: 'violet',
  },
  {
    icon: ShieldIcon,
    stat: '2,745+',
    statColor: 'text-accent-coral',
    title: 'Production-Grade',
    description:
      'Tests passing. Async everywhere. PostgreSQL. Battle-tested.',
    hoverGlow: 'coral',
  },
]

/* ------------------------------------------------------------------ */
/*  Link data                                                           */
/* ------------------------------------------------------------------ */

const links = [
  { label: 'Read the Docs', href: '#docs' },
  { label: 'API Reference', href: '#api' },
  { label: 'GitHub', href: '#github' },
]

/* ------------------------------------------------------------------ */
/*  DeveloperExperience Section                                         */
/* ------------------------------------------------------------------ */

export default function DeveloperExperience() {
  return (
    <SectionWrapper id="developer-experience">
      <SectionHeading
        title="Developer-First, Always"
        subtitle="Built by developers, for developers."
        gradient
      />

      {/* ---- 3 Panels ---- */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {panels.map((panel) => {
          const Icon = panel.icon

          return (
            <motion.div key={panel.title} variants={fadeInUp}>
              <GlassCard
                hoverGlow={panel.hoverGlow}
                padding="lg"
                className="h-full flex flex-col items-center text-center"
              >
                {/* Icon */}
                <div
                  className={cn(
                    'w-14 h-14 rounded-xl flex items-center justify-center mb-5',
                    panel.hoverGlow === 'cyan' && 'bg-accent-cyan/10 text-accent-cyan',
                    panel.hoverGlow === 'violet' && 'bg-accent-violet/10 text-accent-violet',
                    panel.hoverGlow === 'coral' && 'bg-accent-coral/10 text-accent-coral',
                  )}
                >
                  <Icon />
                </div>

                {/* Stat */}
                <span
                  className={cn(
                    'font-display text-4xl font-bold mb-3',
                    panel.statColor,
                  )}
                >
                  {panel.stat}
                </span>

                {/* Title */}
                <h3 className="font-display text-lg font-semibold text-text-primary mb-2">
                  {panel.title}
                </h3>

                {/* Description */}
                <p className="text-text-secondary text-sm leading-relaxed">
                  {panel.description}
                </p>
              </GlassCard>
            </motion.div>
          )
        })}
      </motion.div>

      {/* ---- Links Row ---- */}
      <motion.div
        className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {links.map((link, i) => (
          <Button
            key={link.label}
            href={link.href}
            variant={i === 0 ? 'secondary' : 'ghost'}
            size="sm"
            icon={
              link.label === 'GitHub' ? (
                <svg
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                </svg>
              ) : undefined
            }
          >
            {link.label}
          </Button>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
