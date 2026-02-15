import { cn } from '../../lib/cn'
import { siteConfig } from '../../config/site'

/* ------------------------------------------------------------------ */
/*  Footer nav links — only real, working links                        */
/* ------------------------------------------------------------------ */
interface FooterLink {
  label: string
  href: string
  external?: boolean
}

const footerLinks: FooterLink[] = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Early Access', href: '#beta-access' },
  { label: 'GitHub', href: siteConfig.github, external: true },
  { label: 'Twitter / X', href: siteConfig.company.twitter, external: true },
  { label: 'LinkedIn', href: siteConfig.company.linkedin, external: true },
]

/* ------------------------------------------------------------------ */
/*  Social icons                                                       */
/* ------------------------------------------------------------------ */
function GitHubIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function TwitterIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Footer component                                                   */
/* ------------------------------------------------------------------ */
export default function Footer() {
  return (
    <footer className="glass-heavy border-t border-white/5">
      <div className="mx-auto max-w-site px-6 py-12 lg:py-16">
        {/* Nav links row */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              onClick={
                !link.external
                  ? (e: React.MouseEvent<HTMLAnchorElement>) => {
                      e.preventDefault()
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
                    }
                  : undefined
              }
              className={cn(
                'text-sm text-text-muted transition-colors duration-200',
                'hover:text-text-primary',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/50 rounded',
                'inline-flex items-center gap-1.5',
              )}
            >
              {link.label}
              {link.external && (
                <svg
                  className="h-3 w-3 opacity-40"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M3.5 1.5h7v7M10.5 1.5L1.5 10.5" />
                </svg>
              )}
            </a>
          ))}
        </div>

        {/* Contact support */}
        <div className="mt-16 flex items-center justify-center gap-2 text-sm text-text-secondary">
          <svg className="h-4 w-4 text-accent-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          <span>Contact Support:</span>
          <a
            href={`mailto:${siteConfig.company.email}`}
            className="text-accent-cyan hover:underline font-medium"
          >
            {siteConfig.company.email}
          </a>
        </div>

        {/* Divider */}
        <div className="mt-8 border-t border-white/5" />

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-muted">
            &copy; {new Date().getFullYear()} AgentChains. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {/* Social icons */}
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-text-muted hover:text-text-primary transition-colors duration-200"
            >
              <GitHubIcon />
            </a>
            <a
              href={siteConfig.company.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-text-muted hover:text-text-primary transition-colors duration-200"
            >
              <TwitterIcon />
            </a>
            <a
              href={siteConfig.company.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-text-muted hover:text-text-primary transition-colors duration-200"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
