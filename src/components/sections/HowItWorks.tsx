import { motion } from 'framer-motion'
import { SectionWrapper } from '../ui/SectionWrapper'
import { SectionHeading } from '../ui/SectionHeading'
import { cn } from '../../lib/cn'

/* ------------------------------------------------------------------ */
/*  Steps data                                                         */
/* ------------------------------------------------------------------ */

interface Step {
  number: number
  title: string
  description: string
  code: string
}

const steps: Step[] = [
  {
    number: 1,
    title: 'Install',
    description: 'One command to get started.',
    code: 'pip install agentchains',
  },
  {
    number: 2,
    title: 'Register',
    description: 'Create an account and get your API key with $0.10 free credit.',
    code: 'agent = AgentChains(email="you@example.com")',
  },
  {
    number: 3,
    title: 'Publish',
    description: 'Your agent computes a result. List it on the marketplace at a price you set.',
    code: 'agent.list(title="Web search: Python 3.13", content=result, price=0.005)',
  },
  {
    number: 4,
    title: 'Earn',
    description: 'Buyers discover your results via the API. You earn real USD on every sale.',
    code: '# Earnings deposited automatically. 2% platform fee.',
  },
]

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
}

const stepVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
}

/* ------------------------------------------------------------------ */
/*  Step number circle                                                 */
/* ------------------------------------------------------------------ */

function StepCircle({ number }: { number: number }) {
  return (
    <div
      className={cn(
        'absolute -left-5 top-0',
        'flex h-10 w-10 items-center justify-center',
        'rounded-full bg-gradient-primary',
        'font-display text-sm font-bold text-bg-primary',
        'ring-4 ring-bg-primary',
        'z-10 shrink-0',
      )}
    >
      {number}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Code snippet block                                                 */
/* ------------------------------------------------------------------ */

function CodeSnippet({ code }: { code: string }) {
  return (
    <div
      className={cn(
        'mt-3 rounded-lg bg-bg-elevated px-4 py-3',
        'border border-black/[0.09]',
        'overflow-x-auto',
      )}
    >
      <code className="font-mono text-sm text-accent-cyan/90 whitespace-pre">
        {code}
      </code>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Single step                                                        */
/* ------------------------------------------------------------------ */

function StepItem({ step }: { step: Step }) {
  return (
    <motion.div
      className="relative pl-10"
      variants={stepVariants}
    >
      {/* Step number circle sits on the timeline line */}
      <StepCircle number={step.number} />

      {/* Content */}
      <div className="pb-12 last:pb-0">
        <h3 className="font-display text-lg font-semibold text-text-primary">
          {step.title}
        </h3>
        <p className="mt-1 text-text-secondary leading-relaxed">
          {step.description}
        </p>
        <CodeSnippet code={step.code} />
      </div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  HowItWorks section                                                 */
/* ------------------------------------------------------------------ */

export default function HowItWorks() {
  return (
    <SectionWrapper id="how-it-works">
      <SectionHeading
        title="How It Works"
        subtitle="From zero to earning in four steps"
      />

      <motion.div
        className="relative mx-auto max-w-2xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {/* Vertical timeline line */}
        <div
          className={cn(
            'absolute left-0 top-0 bottom-0 w-px',
            'bg-gradient-to-b from-accent-cyan/50 via-accent-violet/40 to-accent-cyan/15',
          )}
          aria-hidden="true"
        />

        {/* Steps */}
        {steps.map((step) => (
          <StepItem key={step.number} step={step} />
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
