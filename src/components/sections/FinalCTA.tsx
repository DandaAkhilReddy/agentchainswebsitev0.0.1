import { motion } from 'framer-motion'
import { cn } from '../../lib/cn'
import { fadeInUp, staggerContainer } from '../../design-system/animations'
import { Button } from '../ui/Button'

/* ------------------------------------------------------------------ */
/*  FinalCTA section                                                   */
/* ------------------------------------------------------------------ */
export default function FinalCTA() {
  return (
    <section
      id="cta"
      className={cn(
        'relative py-32 lg:py-40 overflow-hidden',
        'scroll-mt-20',
      )}
    >
      {/* Background: gradient mesh + animated blobs */}
      <div className="absolute inset-0 bg-mesh" aria-hidden="true" />

      {/* Radial gradient overlays for the dramatic blend */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: [
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0, 212, 255, 0.08) 0%, transparent 70%)',
            'radial-gradient(ellipse 60% 50% at 30% 60%, rgba(139, 92, 246, 0.10) 0%, transparent 70%)',
            'radial-gradient(ellipse 50% 40% at 70% 50%, rgba(255, 64, 128, 0.06) 0%, transparent 70%)',
          ].join(', '),
        }}
      />

      {/* Top/bottom fade to bg-primary */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(180deg, #0c0c18 0%, transparent 20%, transparent 80%, #0c0c18 100%)',
        }}
      />

      {/* Animated glow blob - top left */}
      <div
        className="absolute -top-40 -left-40 h-80 w-80 rounded-full opacity-20 blur-3xl animate-pulse-slow"
        style={{ background: 'radial-gradient(circle, #00d4ff 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      {/* Animated glow blob - bottom right */}
      <div
        className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full opacity-15 blur-3xl animate-pulse-slow"
        style={{
          background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)',
          animationDelay: '2s',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="relative z-10 mx-auto max-w-3xl px-6 text-center"
      >
        {/* Headline */}
        <motion.h2
          variants={fadeInUp}
          className="font-display text-h1 text-text-primary mb-6"
        >
          Your Agents Are{' '}
          <span className="text-gradient-warm">Wasting Money</span>{' '}
          Right Now.
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          variants={fadeInUp}
          className="text-lg lg:text-xl text-text-secondary leading-relaxed mb-10 max-w-2xl mx-auto"
        >
          Join 500+ developers already on the waitlist. Beta launching Q1 2026.
          <br className="hidden sm:block" />
          <span className="text-accent-cyan font-medium">Limited spots remaining.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
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
            href="#"
          >
            Read the Docs
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
