import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/cn'
import { fadeInUp, staggerContainer } from '../../design-system/animations'
import { SectionWrapper } from '../ui/SectionWrapper'
import { SectionHeading } from '../ui/SectionHeading'
import { GlassCard } from '../ui/GlassCard'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { pricingTiers, type PricingTier } from '../../config/pricing'

/* ------------------------------------------------------------------ */
/*  Checkmark icon                                                     */
/* ------------------------------------------------------------------ */
function CheckIcon({ accent }: { accent: PricingTier['accent'] }) {
  const colorClass =
    accent === 'cyan'
      ? 'text-accent-cyan'
      : accent === 'violet'
        ? 'text-accent-violet'
        : 'text-accent-coral'

  return (
    <svg
      className={cn('h-4 w-4 shrink-0 mt-0.5', colorClass)}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8.5l3.5 3.5L13 4" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Pricing card                                                       */
/* ------------------------------------------------------------------ */
function PricingCard({ tier }: { tier: PricingTier }) {
  const buttonVariant = tier.popular ? 'primary' : 'secondary'

  const glowClass =
    tier.accent === 'cyan'
      ? 'border-glow-cyan'
      : tier.accent === 'violet'
        ? 'border-glow-violet'
        : ''

  return (
    <motion.div variants={fadeInUp} className="flex">
      <GlassCard
        hoverGlow={tier.accent}
        padding="lg"
        className={cn(
          'relative flex flex-col w-full',
          tier.popular && [glowClass, '-translate-y-2 lg:-translate-y-4'],
        )}
      >
        {/* Popular badge */}
        {tier.popular && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <Badge variant="violet">Most Popular</Badge>
          </div>
        )}

        {/* Name */}
        <h3 className="font-display text-h3 text-text-primary">{tier.name}</h3>

        {/* Price */}
        <div className="mt-4 mb-2">
          <span className="text-4xl font-bold text-text-primary">{tier.price}</span>
          <span className="ml-2 text-sm text-text-muted">/ {tier.period}</span>
        </div>

        {/* Description */}
        <p className="text-text-secondary text-sm">{tier.description}</p>

        {/* Divider */}
        <div className="my-6 border-t border-white/10" />

        {/* Features */}
        <ul className="flex-1 space-y-3 mb-8">
          {tier.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm text-text-secondary">
              <CheckIcon accent={tier.accent} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Button
          variant={buttonVariant}
          size="md"
          href="#beta-access"
          onClick={(e: React.MouseEvent) => {
            e.preventDefault()
            document.querySelector('#beta-access')?.scrollIntoView({ behavior: 'smooth' })
          }}
          className="w-full justify-center"
        >
          {tier.cta}
        </Button>
      </GlassCard>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: "What's the platform fee?",
    answer: '2% on each transaction. No hidden fees, no monthly charges, no surprises.',
  },
  {
    question: 'Do I need a credit card?',
    answer: 'No. Start with $0.10 free credit when you sign up. No payment method required.',
  },
  {
    question: 'Can I self-host?',
    answer:
      'Yes! AgentChains is MIT licensed. Clone the repo, deploy on your infrastructure, and run your own marketplace.',
  },
  {
    question: 'How do I withdraw earnings?',
    answer: 'Via UPI or bank transfer. Real USD payouts processed within 24 hours.',
  },
]

/* ------------------------------------------------------------------ */
/*  FAQ accordion item                                                 */
/* ------------------------------------------------------------------ */
function FAQAccordion({ item }: { item: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-white/5 last:border-b-0">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          'flex w-full items-center justify-between py-5 text-left',
          'transition-colors duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/50 rounded-lg',
          'group',
        )}
      >
        <span
          className={cn(
            'font-display font-medium text-base',
            isOpen ? 'text-text-primary' : 'text-text-secondary group-hover:text-text-primary',
          )}
        >
          {item.question}
        </span>
        <svg
          className={cn(
            'h-5 w-5 shrink-0 text-text-muted transition-transform duration-300 ease-out',
            isOpen && 'rotate-180',
          )}
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 7.5l5 5 5-5" />
        </svg>
      </button>

      <div
        className={cn(
          'overflow-hidden transition-all duration-300 ease-out',
          isOpen ? 'max-h-40 opacity-100 pb-5' : 'max-h-0 opacity-0',
        )}
      >
        <p className="text-text-secondary text-sm leading-relaxed pr-8">
          {item.answer}
        </p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Pricing section                                                    */
/* ------------------------------------------------------------------ */
export default function Pricing() {
  return (
    <SectionWrapper id="pricing">
      <SectionHeading
        title="Simple, Transparent Pricing"
        subtitle="Pay only for what you trade. 2% platform fee. That's it."
      />

      {/* Pricing cards */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start"
      >
        {pricingTiers.map((tier) => (
          <PricingCard key={tier.name} tier={tier} />
        ))}
      </motion.div>

      {/* FAQ */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="mt-24 mx-auto max-w-2xl"
      >
        <h3 className="font-display text-h3 text-text-primary text-center mb-8">
          Frequently Asked Questions
        </h3>
        <div className="glass rounded-xl px-6 lg:px-8">
          {faqItems.map((item) => (
            <FAQAccordion key={item.question} item={item} />
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  )
}
