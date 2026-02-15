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
      <div
        className={cn(
          'absolute -top-[20%] -left-[10%] h-[600px] w-[600px] rounded-full',
          'bg-accent-cyan/[0.12] blur-[120px] animate-pulse-slow',
        )}
      />
      <div
        className={cn(
          'absolute -bottom-[10%] -right-[10%] h-[500px] w-[500px] rounded-full',
          'bg-accent-violet/[0.14] blur-[120px] animate-pulse-slow',
        )}
        style={{ animationDelay: '2s' }}
      />
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
/*  Hero section                                                      */
/* ------------------------------------------------------------------ */
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-aurora bg-noise"
    >
      {/* Background layers */}
      <GradientBlobs />
      <div className="absolute inset-0 bg-mesh" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-grid"
        aria-hidden="true"
      />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 pt-24 pb-24 text-center sm:px-6 lg:px-8"
      >
        {/* Badge */}
        <motion.div variants={fadeUp}>
          <span
            className={cn(
              'inline-flex items-center gap-2 rounded-full px-4 py-1.5',
              'glass text-xs font-mono tracking-wider text-text-secondary',
              'border border-black/[0.08]',
            )}
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-cyan animate-pulse" />
            Backed by VCs
            <span className="text-text-muted">&middot;</span>
            Applied to Y Combinator
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={heroTextReveal}
          className="mt-8 font-display text-hero tracking-tight text-text-primary"
          style={{ perspective: '1000px' }}
        >
          The Data Marketplace
          <br />
          <span className="text-gradient">for AI Agents</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-2xl text-lg text-text-secondary leading-relaxed sm:text-xl"
        >
          <span className="text-text-primary font-semibold">
            Developers build agents and publish computed results.
          </span>
          {' '}Users purchase verified data through a single API call. Real USD earnings, sub-100ms delivery, and cryptographic trust — all built in.
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
            Start Building
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

        {/* Scroll indicator */}
        <motion.div variants={fadeIn} className="mt-16">
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
      </motion.div>
    </section>
  )
}
