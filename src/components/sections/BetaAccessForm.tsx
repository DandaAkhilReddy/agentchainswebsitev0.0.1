import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/cn'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface BetaFormData {
  name: string
  email: string
  company: string
  role: string
  useCase: string
}

interface FormErrors {
  name?: string
  email?: string
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */
const roles = [
  '',
  'Engineer',
  'Engineering Manager',
  'CTO / VP Engineering',
  'Product Manager',
  'Founder / CEO',
  'Other',
] as const

const benefits = [
  'Priority access when we launch Q1 2026',
  'Direct Slack channel with the founding team',
  'Shape the product roadmap with your feedback',
  'Lifetime discount for early supporters',
] as const

/* ------------------------------------------------------------------ */
/*  Validation                                                         */
/* ------------------------------------------------------------------ */
function validate(data: BetaFormData): FormErrors {
  const errors: FormErrors = {}
  if (data.name.trim().length < 2)
    errors.name = 'Name must be at least 2 characters'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = 'Please enter a valid email'
  return errors
}

/* ------------------------------------------------------------------ */
/*  Animations (local to avoid coupling with shared module)            */
/* ------------------------------------------------------------------ */
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

/* ------------------------------------------------------------------ */
/*  Shared input styling                                               */
/* ------------------------------------------------------------------ */
const inputBase = [
  'w-full rounded-lg px-4 py-3',
  'bg-white/[0.04] border border-white/[0.08]',
  'text-text-primary placeholder:text-text-muted/50',
  'focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 focus:border-accent-cyan/30',
  'transition-all duration-200',
].join(' ')

const inputError = 'border-accent-coral/50 focus:ring-accent-coral/50'

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function BetaAccessForm() {
  const [formData, setFormData] = useState<BetaFormData>({
    name: '',
    email: '',
    company: '',
    role: '',
    useCase: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  /* ---- helpers --------------------------------------------------- */
  const handleChange =
    (field: keyof BetaFormData) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }))
      if (errors[field as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }))
      }
    }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const validationErrors = validate(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors({})
    setSubmitting(true)

    // TODO: Replace with actual API call
    console.log('[BetaAccessForm] Submission:', formData)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setSubmitting(false)
    setSubmitted(true)
  }

  /* ---- random position number (stable per mount) ----------------- */
  const [queuePosition] = useState(
    () => Math.floor(Math.random() * 200) + 500,
  )

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */
  return (
    <section
      id="beta-access"
      className="w-full py-section bg-bg-secondary scroll-mt-20"
    >
      <div className="max-w-site mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* ─── Left column: Marketing copy ───────────────────────── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="flex flex-col gap-6"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp}>
              <span
                className={cn(
                  'inline-flex items-center gap-2 rounded-full',
                  'px-4 py-1.5 text-sm font-medium',
                  'bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20',
                )}
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-cyan opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-cyan" />
                </span>
                Limited Beta
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              variants={fadeInUp}
              className="font-display text-h1 font-bold text-text-primary"
            >
              Get Early Access
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              className="text-lg text-text-secondary leading-relaxed max-w-lg"
            >
              Join the founding cohort of developers building the future of
              agent-to-agent knowledge exchange. Be among the first to list,
              discover, and monetize AI agent chains on the open marketplace.
            </motion.p>

            {/* Benefits list */}
            <motion.ul variants={fadeInUp} className="space-y-3">
              {benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-3 text-text-secondary"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-cyan" />
                  <span>{benefit}</span>
                </li>
              ))}
            </motion.ul>

            {/* Urgency */}
            <motion.p
              variants={fadeInUp}
              className="text-accent-coral font-medium"
            >
              Limited to first 1,000 beta users
            </motion.p>
          </motion.div>

          {/* ─── Right column: Form card ───────────────────────────── */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <div className="glass rounded-2xl p-8 border border-white/[0.08]">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  /* ── Form state ──────────────────────────────────── */
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                    noValidate
                  >
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="beta-name"
                        className="block text-sm font-medium text-text-secondary mb-1.5"
                      >
                        Full Name <span className="text-accent-coral">*</span>
                      </label>
                      <input
                        id="beta-name"
                        type="text"
                        required
                        placeholder="Ada Lovelace"
                        value={formData.name}
                        onChange={handleChange('name')}
                        className={cn(inputBase, errors.name && inputError)}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-accent-coral">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Work Email */}
                    <div>
                      <label
                        htmlFor="beta-email"
                        className="block text-sm font-medium text-text-secondary mb-1.5"
                      >
                        Work Email <span className="text-accent-coral">*</span>
                      </label>
                      <input
                        id="beta-email"
                        type="email"
                        required
                        placeholder="ada@company.com"
                        value={formData.email}
                        onChange={handleChange('email')}
                        className={cn(inputBase, errors.email && inputError)}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-accent-coral">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Company */}
                    <div>
                      <label
                        htmlFor="beta-company"
                        className="block text-sm font-medium text-text-secondary mb-1.5"
                      >
                        Company{' '}
                        <span className="text-text-muted text-xs">
                          (optional)
                        </span>
                      </label>
                      <input
                        id="beta-company"
                        type="text"
                        placeholder="Acme Corp"
                        value={formData.company}
                        onChange={handleChange('company')}
                        className={inputBase}
                      />
                    </div>

                    {/* Role */}
                    <div>
                      <label
                        htmlFor="beta-role"
                        className="block text-sm font-medium text-text-secondary mb-1.5"
                      >
                        Role{' '}
                        <span className="text-text-muted text-xs">
                          (optional)
                        </span>
                      </label>
                      <select
                        id="beta-role"
                        value={formData.role}
                        onChange={handleChange('role')}
                        className={cn(
                          inputBase,
                          'appearance-none bg-no-repeat bg-[length:16px] bg-[right_12px_center]',
                          !formData.role && 'text-text-muted/50',
                        )}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%236868a0'%3E%3Cpath d='M4.5 6l3.5 3.5L11.5 6'/%3E%3C/svg%3E")`,
                        }}
                      >
                        <option value="" disabled>
                          Select your role
                        </option>
                        {roles.slice(1).map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Use Case */}
                    <div>
                      <label
                        htmlFor="beta-usecase"
                        className="block text-sm font-medium text-text-secondary mb-1.5"
                      >
                        Primary Use Case{' '}
                        <span className="text-text-muted text-xs">
                          (optional)
                        </span>
                      </label>
                      <textarea
                        id="beta-usecase"
                        rows={3}
                        maxLength={500}
                        placeholder="How do you plan to use AgentChains?"
                        value={formData.useCase}
                        onChange={handleChange('useCase')}
                        className={cn(inputBase, 'resize-none')}
                      />
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={submitting}
                      whileHover={{ scale: submitting ? 1 : 1.02 }}
                      whileTap={{ scale: submitting ? 1 : 0.98 }}
                      className={cn(
                        'w-full rounded-lg py-3 font-semibold text-white',
                        'bg-gradient-to-r from-accent-cyan to-accent-violet',
                        'transition-all duration-200',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/50',
                        'disabled:opacity-60 disabled:cursor-not-allowed',
                        'shadow-glow-cyan hover:shadow-glow-cyan-strong',
                      )}
                    >
                      {submitting ? (
                        <span className="inline-flex items-center gap-2">
                          <svg
                            className="h-4 w-4 animate-spin"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                          </svg>
                          Securing your spot...
                        </span>
                      ) : (
                        'Request Early Access'
                      )}
                    </motion.button>

                    {/* Privacy note */}
                    <p className="text-xs text-text-muted text-center">
                      No spam, ever. We respect your privacy.
                    </p>
                  </motion.form>
                ) : (
                  /* ── Success state ───────────────────────────────── */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="flex flex-col items-center justify-center py-12 text-center gap-6"
                  >
                    {/* Glowing checkmark circle */}
                    <div
                      className={cn(
                        'flex h-16 w-16 items-center justify-center rounded-full',
                        'bg-accent-cyan/10 border border-accent-cyan/30',
                        'shadow-glow-cyan',
                      )}
                    >
                      <svg
                        className="h-8 w-8 text-accent-cyan"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-display text-h3 text-text-primary">
                        You're on the list!
                      </h3>
                      <p className="text-text-secondary leading-relaxed max-w-xs mx-auto">
                        We'll reach out to{' '}
                        <span className="text-accent-cyan font-medium">
                          {formData.email}
                        </span>{' '}
                        when your beta spot opens up.
                      </p>
                    </div>

                    {/* Queue position */}
                    <div
                      className={cn(
                        'inline-flex items-center gap-2 rounded-full',
                        'px-4 py-2 text-sm font-medium',
                        'bg-accent-violet/10 text-accent-violet border border-accent-violet/20',
                      )}
                    >
                      Position #{queuePosition} in line
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
