import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/cn'

/* ------------------------------------------------------------------ */
/*  Web3Forms Access Key                                               */
/*  Get yours at https://web3forms.com using info@agentchains.ai       */
/* ------------------------------------------------------------------ */
const WEB3FORMS_ACCESS_KEY = '872126ea-0595-4349-9c5b-4e190cc0d839'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface BetaFormData {
  name: string
  platform: string
  useCase: string
  portfolio: string
}

interface FormErrors {
  name?: string
  platform?: string
  useCase?: string
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */
const platforms = [
  'Vertex AI',
  'AWS Bedrock',
  'Azure OpenAI',
  'OpenAI API',
  'Anthropic Claude',
  'Google Gemini',
  'Hugging Face',
  'LangChain',
  'CrewAI',
  'AutoGen',
  'Custom / Other',
] as const

const benefits = [
  'For developers and AI engineers only',
  'Direct Slack channel with the founding team',
  'Shape the product roadmap with your PRs',
  'Lifetime discount for early builders',
] as const

/* ------------------------------------------------------------------ */
/*  Validation                                                         */
/* ------------------------------------------------------------------ */
function validate(data: BetaFormData): FormErrors {
  const errors: FormErrors = {}
  if (data.name.trim().length < 2)
    errors.name = 'Name must be at least 2 characters'
  if (!data.platform) errors.platform = 'Please select a platform'
  if (data.useCase.trim().length < 10)
    errors.useCase = 'Please describe your use case (at least 10 characters)'
  return errors
}

/* ------------------------------------------------------------------ */
/*  Animations                                                         */
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
  'bg-white border border-black/[0.12]',
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
    platform: '',
    useCase: '',
    portfolio: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

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
      if (submitError) setSubmitError(null)
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
    setSubmitError(null)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: 'New AgentChains Developer Application',
          from_name: 'AgentChains Website',
          name: formData.name,
          platform: formData.platform,
          use_case: formData.useCase,
          portfolio: formData.portfolio || '(none provided)',
        }),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitted(true)
      } else {
        setSubmitError(
          result.message || 'Something went wrong. Please try again.',
        )
      }
    } catch {
      setSubmitError(
        'Unable to submit the form. Please check your connection and try again.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  const handleRetry = () => {
    setSubmitError(null)
  }

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
          {/* Left column: Marketing copy */}
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
                Developers Only
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              variants={fadeInUp}
              className="font-display text-h1 font-bold text-text-primary"
            >
              Build With Us
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              className="text-lg text-text-secondary leading-relaxed max-w-lg"
            >
              We&rsquo;re looking for developers who want to build the future of
              agent-to-agent commerce. Apply below &mdash; share your experience
              and what you&rsquo;d build.
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

            {/* Contact */}
            <motion.p
              variants={fadeInUp}
              className="text-sm text-text-muted"
            >
              Questions? Reach us at{' '}
              <a
                href="mailto:info@agentchains.ai"
                className="text-accent-cyan hover:underline"
              >
                info@agentchains.ai
              </a>
            </motion.p>
          </motion.div>

          {/* Right column: Form card */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <div className="glass rounded-2xl p-8 border border-black/[0.08]">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  /* Form state */
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
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="beta-name"
                        className="block text-sm font-medium text-text-secondary mb-1.5"
                      >
                        Name <span className="text-accent-coral">*</span>
                      </label>
                      <input
                        id="beta-name"
                        type="text"
                        required
                        placeholder="Your full name"
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

                    {/* Platform / Agent */}
                    <div>
                      <label
                        htmlFor="beta-platform"
                        className="block text-sm font-medium text-text-secondary mb-1.5"
                      >
                        Platform / Agent{' '}
                        <span className="text-accent-coral">*</span>
                      </label>
                      <select
                        id="beta-platform"
                        required
                        value={formData.platform}
                        onChange={handleChange('platform')}
                        className={cn(
                          inputBase,
                          'appearance-none bg-no-repeat bg-[length:16px] bg-[right_12px_center]',
                          !formData.platform && 'text-text-muted/50',
                          errors.platform && inputError,
                        )}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%239ca3af'%3E%3Cpath d='M4.5 6l3.5 3.5L11.5 6'/%3E%3C/svg%3E")`,
                        }}
                      >
                        <option value="" disabled>
                          Which AI platform do you use?
                        </option>
                        {platforms.map((platform) => (
                          <option key={platform} value={platform}>
                            {platform}
                          </option>
                        ))}
                      </select>
                      {errors.platform && (
                        <p className="mt-1 text-xs text-accent-coral">
                          {errors.platform}
                        </p>
                      )}
                    </div>

                    {/* Use Case */}
                    <div>
                      <label
                        htmlFor="beta-usecase"
                        className="block text-sm font-medium text-text-secondary mb-1.5"
                      >
                        Use Case{' '}
                        <span className="text-accent-coral">*</span>
                      </label>
                      <textarea
                        id="beta-usecase"
                        rows={3}
                        required
                        maxLength={500}
                        placeholder="What would you build with AgentChains?"
                        value={formData.useCase}
                        onChange={handleChange('useCase')}
                        className={cn(
                          inputBase,
                          'resize-none',
                          errors.useCase && inputError,
                        )}
                      />
                      {errors.useCase && (
                        <p className="mt-1 text-xs text-accent-coral">
                          {errors.useCase}
                        </p>
                      )}
                    </div>

                    {/* GitHub / Portfolio / Resume */}
                    <div>
                      <label
                        htmlFor="beta-portfolio"
                        className="block text-sm font-medium text-text-secondary mb-1.5"
                      >
                        GitHub / Portfolio / Resume{' '}
                        <span className="text-text-muted text-xs">
                          (optional)
                        </span>
                      </label>
                      <input
                        id="beta-portfolio"
                        type="text"
                        maxLength={500}
                        placeholder="github.com/you or LinkedIn profile"
                        value={formData.portfolio}
                        onChange={handleChange('portfolio')}
                        className={inputBase}
                      />
                    </div>

                    {/* Error message */}
                    {submitError && (
                      <div className="flex items-center gap-3 rounded-lg bg-accent-coral/10 border border-accent-coral/20 px-4 py-3">
                        <svg
                          className="h-5 w-5 shrink-0 text-accent-coral"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="8" x2="12" y2="12" />
                          <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        <div className="flex-1">
                          <p className="text-sm text-accent-coral">
                            {submitError}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={handleRetry}
                          className="text-xs font-medium text-accent-coral hover:text-accent-coral/80 underline"
                        >
                          Dismiss
                        </button>
                      </div>
                    )}

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
                          Submitting...
                        </span>
                      ) : (
                        'Apply for Developer Access'
                      )}
                    </motion.button>

                    {/* Privacy note */}
                    <p className="text-xs text-text-muted text-center">
                      Your data is sent securely. No spam, ever.
                    </p>
                  </motion.form>
                ) : (
                  /* Success state */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="flex flex-col items-center justify-center py-12 text-center gap-6"
                  >
                    {/* Checkmark */}
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

                    <div className="space-y-3">
                      <h3 className="font-display text-h3 text-text-primary">
                        Application received, {formData.name.split(' ')[0]}!
                      </h3>
                      <p className="text-text-secondary leading-relaxed max-w-sm mx-auto">
                        We review every application personally. If you&rsquo;re
                        a fit, you&rsquo;ll hear from{' '}
                        <span className="text-accent-cyan font-medium">
                          info@agentchains.ai
                        </span>{' '}
                        within 48 hours with your developer credentials.
                      </p>
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
