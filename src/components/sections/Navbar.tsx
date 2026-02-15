import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/cn'
import { navItems } from '../../config/navigation'
import { siteConfig } from '../../config/site'
import { Button } from '../ui/Button'

/* ------------------------------------------------------------------ */
/*  Logo icon: a stylised diamond/chain link in gradient              */
/* ------------------------------------------------------------------ */
function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-7 w-7', className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00d4ff" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      {/* Outer diamond */}
      <path
        d="M14 2L26 14L14 26L2 14L14 2Z"
        stroke="url(#logo-grad)"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Inner chain link */}
      <path
        d="M14 8L20 14L14 20L8 14L14 8Z"
        fill="url(#logo-grad)"
        opacity="0.35"
      />
      <circle cx="14" cy="14" r="2.5" fill="url(#logo-grad)" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Mobile menu overlay                                               */
/* ------------------------------------------------------------------ */
const overlayVariants = {
  hidden: { opacity: 0, x: '100%' },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 30 },
  },
  exit: {
    opacity: 0,
    x: '100%',
    transition: { duration: 0.25, ease: 'easeIn' as const },
  },
}

const mobileItemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.05 * i, duration: 0.3, ease: 'easeOut' as const },
  }),
}

/* ------------------------------------------------------------------ */
/*  Navbar                                                            */
/* ------------------------------------------------------------------ */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  /* ---- scroll listener ---- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll() // set initial state
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ---- lock body scroll when mobile menu is open ---- */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  /* ---- smooth-scroll handler for #hash links ---- */
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (href.startsWith('#')) {
        e.preventDefault()
        const target = document.querySelector(href)
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        setMobileOpen(false)
      }
    },
    [],
  )

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 h-16',
          'flex items-center transition-all duration-300 ease-out',
          'border-b',
          scrolled
            ? 'glass-heavy border-white/5 shadow-glass'
            : 'bg-transparent border-transparent',
        )}
      >
        <nav className="mx-auto flex h-full w-full max-w-site items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* ---------- Logo ---------- */}
          <a
            href="#"
            className="flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/50 rounded-lg"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            <LogoIcon />
            <span className="font-display text-lg font-bold tracking-tight text-text-primary">
              {siteConfig.name}
            </span>
          </a>

          {/* ---------- Desktop nav links ---------- */}
          <ul className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isExternal = 'external' in item && item.external
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    {...(isExternal
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className={cn(
                      'relative px-3 py-2 text-sm font-medium text-text-secondary',
                      'transition-colors duration-200',
                      'hover:text-text-primary',
                      'rounded-md hover:bg-white/[0.04]',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/50',
                    )}
                  >
                    {item.label}
                    {isExternal && (
                      <svg
                        className="ml-1 inline-block h-3 w-3 opacity-40"
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M3.5 1.5h7v7M10.5 1.5L1.5 10.5" />
                      </svg>
                    )}
                  </a>
                </li>
              )
            })}
          </ul>

          {/* ---------- Desktop CTA ---------- */}
          <div className="hidden md:flex items-center">
            <Button
              variant="primary"
              size="sm"
              href="#beta-access"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault()
                document.querySelector('#beta-access')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Join Beta
            </Button>
          </div>

          {/* ---------- Mobile hamburger ---------- */}
          <button
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className={cn(
              'md:hidden relative z-50 flex h-10 w-10 items-center justify-center rounded-lg',
              'text-text-secondary hover:text-text-primary',
              'transition-colors duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/50',
            )}
          >
            <span className="sr-only">{mobileOpen ? 'Close menu' : 'Open menu'}</span>
            <div className="flex flex-col items-center justify-center gap-[5px]">
              <span
                className={cn(
                  'block h-[2px] w-5 rounded-full bg-current transition-all duration-300',
                  mobileOpen && 'translate-y-[7px] rotate-45',
                )}
              />
              <span
                className={cn(
                  'block h-[2px] w-5 rounded-full bg-current transition-all duration-300',
                  mobileOpen && 'opacity-0',
                )}
              />
              <span
                className={cn(
                  'block h-[2px] w-5 rounded-full bg-current transition-all duration-300',
                  mobileOpen && '-translate-y-[7px] -rotate-45',
                )}
              />
            </div>
          </button>
        </nav>
      </motion.header>

      {/* ---------- Mobile overlay ---------- */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              'fixed inset-0 z-40 md:hidden',
              'glass-heavy bg-bg-primary/90',
              'flex flex-col items-center justify-center gap-6',
            )}
          >
            {navItems.map((item, i) => {
              const isExternal = 'external' in item && item.external
              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  custom={i}
                  variants={mobileItemVariants}
                  initial="hidden"
                  animate="visible"
                  onClick={(e) => handleNavClick(e, item.href)}
                  {...(isExternal
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className={cn(
                    'font-display text-2xl font-semibold text-text-secondary',
                    'transition-colors duration-200 hover:text-text-primary',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/50 rounded-md px-4 py-2',
                  )}
                >
                  {item.label}
                </motion.a>
              )
            })}

            {/* Mobile CTA */}
            <motion.div
              custom={navItems.length}
              variants={mobileItemVariants}
              initial="hidden"
              animate="visible"
              className="mt-4"
            >
              <Button
                variant="primary"
                size="md"
                href="#beta-access"
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault()
                  document.querySelector('#beta-access')?.scrollIntoView({ behavior: 'smooth' })
                  setMobileOpen(false)
                }}
              >
                Join Beta
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
