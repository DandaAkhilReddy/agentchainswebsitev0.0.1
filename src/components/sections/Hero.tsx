import { motion } from 'framer-motion'
import { cn } from '../../lib/cn'
import { siteConfig } from '../../config/site'
import { Button } from '../ui/Button'
import { heroTextReveal } from '../../design-system/animations'

/* ------------------------------------------------------------------ */
/*  Animation variants                                                */
/* ------------------------------------------------------------------ */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8 },
  },
}

/* ------------------------------------------------------------------ */
/*  Stats configuration                                               */
/* ------------------------------------------------------------------ */
const stats = [
  { value: '500+', label: 'On the Waitlist' },
  { value: 'Q1 2026', label: 'Beta Launch' },
  { value: '<100ms', label: 'Delivery Latency' },
  { value: '50-90%', label: 'Cost Savings' },
] as const

/* ------------------------------------------------------------------ */
/*  GitHub icon SVG                                                   */
/* ------------------------------------------------------------------ */
function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      className={cn('h-4 w-4', className)}
      aria-hidden="true"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Animated gradient blobs (background decoration)                   */
/* ------------------------------------------------------------------ */
function GradientBlobs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Cyan blob - top left */}
      <div
        className={cn(
          'absolute -top-[20%] -left-[10%] h-[600px] w-[600px] rounded-full',
          'bg-accent-cyan/[0.12] blur-[120px] animate-pulse-slow',
        )}
      />
      {/* Violet blob - bottom right */}
      <div
        className={cn(
          'absolute -bottom-[10%] -right-[10%] h-[500px] w-[500px] rounded-full',
          'bg-accent-violet/[0.14] blur-[120px] animate-pulse-slow',
        )}
        style={{ animationDelay: '2s' }}
      />
      {/* Coral blob - center bottom */}
      <div
        className={cn(
          'absolute bottom-[10%] left-[30%] h-[350px] w-[350px] rounded-full',
          'bg-accent-coral/[0.10] blur-[100px] animate-pulse-slow',
        )}
        style={{ animationDelay: '3.5s' }}
      />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Scroll indicator (bouncing arrow)                                 */
/* ------------------------------------------------------------------ */
function ScrollIndicator() {
  return (
    <motion.div
      variants={fadeIn}
      className="absolute bottom-8 left-1/2 -translate-x-1/2"
    >
      <a
        href="#features"
        onClick={(e) => {
          e.preventDefault()
          document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' })
        }}
        className={cn(
          'flex flex-col items-center gap-2 text-text-muted',
          'transition-colors duration-300 hover:text-text-secondary',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/50 rounded-lg p-2',
        )}
        aria-label="Scroll to features"
      >
        <span className="text-xs font-mono tracking-widest uppercase">Explore</span>
        <svg
          className="h-5 w-5 animate-bounce"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10 4v12M5 11l5 5 5-5" />
        </svg>
      </a>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Hero section                                                      */
/* ------------------------------------------------------------------ */
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-aurora bg-noise"
    >
      {/* ---------- Background layers ---------- */}
      <GradientBlobs />

      {/* Radial mesh overlay */}
      <div className="absolute inset-0 bg-mesh" aria-hidden="true" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      {/* ---------- Content ---------- */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 pt-24 pb-16 text-center sm:px-6 lg:px-8"
      >
        {/* Badge / Pill */}
        <motion.div variants={fadeUp}>
          <span
            className={cn(
              'inline-flex items-center gap-2 rounded-full px-4 py-1.5',
              'glass text-xs font-mono tracking-wider text-text-secondary',
              'border border-white/[0.08]',
            )}
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-cyan animate-pulse" />
            MIT Licensed
            <span className="text-text-muted">&middot;</span>
            Backed by VCs
            <span className="text-text-muted">&middot;</span>
            Applied to Y Combinator
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          variants={heroTextReveal}
          className="mt-8 font-display text-hero tracking-tight text-text-primary"
          style={{ perspective: '1000px' }}
        >
          Stop Paying Twice for
          <br />
          <span className="text-gradient">the Same AI Answer</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-2xl text-lg text-text-secondary leading-relaxed sm:text-xl"
        >
          <span className="text-text-primary font-semibold">
            Your AI agents are re-computing answers that already exist.
          </span>
          {' '}AgentChains lets agents trade cached results in a marketplace — one agent computes, every agent benefits. Save 50-90% on API costs.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Button
            variant="primary"
            size="lg"
            href="#beta-access"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault()
              document.querySelector('#beta-access')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Request Early Access
          </Button>

          <Button
            variant="secondary"
            size="lg"
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            icon={<GitHubIcon />}
          >
            View on GitHub
          </Button>
        </motion.div>

        {/* Trust badges row */}
        <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {/* VC Badge */}
          <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 glass text-xs font-mono tracking-wider text-text-secondary border border-accent-violet/20">
            <svg className="h-4 w-4 text-accent-violet" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
            Backed by Venture Capitalists
          </span>
          {/* YC Badge */}
          <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 glass text-xs font-mono tracking-wider text-text-secondary border border-accent-coral/20">
            <span className="flex items-center justify-center h-5 w-5 rounded bg-accent-coral/20 text-accent-coral text-[10px] font-bold">YC</span>
            Applied to Y Combinator
          </span>
          {/* Waitlist Badge */}
          <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 glass text-xs font-mono tracking-wider text-text-secondary border border-accent-cyan/20">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-cyan animate-pulse" />
            500+ on the waitlist
          </span>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          variants={fadeUp}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-4"
        >
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-1.5">
              {/* Separator dot (skip first) */}
              {i > 0 && (
                <span className="mr-1.5 inline-block h-1 w-1 rounded-full bg-text-muted/50 sm:mr-2" />
              )}
              <span className="font-mono text-sm font-semibold text-accent-cyan">
                {stat.value}
              </span>
              <span className="text-sm text-text-muted">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ---------- Scroll indicator ---------- */}
      <ScrollIndicator />
    </section>
  )
}
