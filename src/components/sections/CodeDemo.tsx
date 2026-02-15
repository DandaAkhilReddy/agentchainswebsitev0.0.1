import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/cn'
import { fadeInUp } from '../../design-system/animations'
import { SectionWrapper } from '../ui/SectionWrapper'
import { SectionHeading } from '../ui/SectionHeading'

/* ------------------------------------------------------------------ */
/*  Tab definitions                                                    */
/* ------------------------------------------------------------------ */
type TabId = 'python' | 'curl' | 'mcp'

interface Tab {
  id: TabId
  label: string
}

const tabs: Tab[] = [
  { id: 'python', label: 'Python' },
  { id: 'curl', label: 'cURL' },
  { id: 'mcp', label: 'MCP Config' },
]

/* ------------------------------------------------------------------ */
/*  Raw code strings                                                   */
/* ------------------------------------------------------------------ */
const codeSnippets: Record<TabId, string> = {
  python: `import requests

# Register and get API key
api = requests.post("https://api.agentchains.dev/auth/register",
    json={"email": "agent@example.com"}).json()

# List your computation for sale
listing = requests.post("https://api.agentchains.dev/listings",
    headers={"Authorization": f"Bearer {api['token']}"},
    json={
        "title": "Python 3.13 Features Summary",
        "content": result,  # Your computed result
        "price": 0.005
    }).json()

# That's it — buyers find you automatically
print(f"Listed! Earning from listing {listing['id']}")`,

  curl: `# Register
curl -X POST https://api.agentchains.dev/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{"email": "agent@example.com"}'

# Buy knowledge instantly
curl -X POST https://api.agentchains.dev/express-purchase \\
  -H "Authorization: Bearer $TOKEN" \\
  -d '{"query": "Python 3.13 features", "max_price": 0.01}'
# Response in <100ms`,

  mcp: `{
  "mcpServers": {
    "agentchains": {
      "command": "python",
      "args": ["-m", "agentchains.mcp"],
      "env": {
        "AGENTCHAINS_API_KEY": "your-key-here"
      }
    }
  }
}`,
}

/* ------------------------------------------------------------------ */
/*  Simple syntax highlighting via spans                               */
/* ------------------------------------------------------------------ */
function highlightPython(code: string) {
  const comments = /(#.*$)/gm

  // First, split by comments to handle them separately
  const parts: { text: string; type: 'code' | 'comment' }[] = []
  let lastIndex = 0

  code.replace(comments, (match, _g1, offset) => {
    if (offset > lastIndex) {
      parts.push({ text: code.slice(lastIndex, offset), type: 'code' })
    }
    parts.push({ text: match, type: 'comment' })
    lastIndex = offset + match.length
    return match
  })
  if (lastIndex < code.length) {
    parts.push({ text: code.slice(lastIndex), type: 'code' })
  }

  return parts.map((part, pi) => {
    if (part.type === 'comment') {
      return (
        <span key={pi} className="text-text-muted">
          {part.text}
        </span>
      )
    }

    // For code parts, highlight keywords and strings
    const elements: React.ReactNode[] = []
    let remaining = part.text
    let idx = 0

    // Combine keywords and strings into a single regex for ordered matching
    const combined = new RegExp(
      `(f?"[^"]*"|'[^']*')|\\b(import|from|as|def|class|return|if|else|for|in|with|print|json)\\b`,
      'g',
    )

    let match: RegExpExecArray | null
    let lastEnd = 0

    while ((match = combined.exec(remaining)) !== null) {
      // Add plain text before the match
      if (match.index > lastEnd) {
        elements.push(
          <span key={`${pi}-${idx++}`}>
            {remaining.slice(lastEnd, match.index)}
          </span>,
        )
      }

      if (match[1]) {
        // String match
        elements.push(
          <span key={`${pi}-${idx++}`} className="text-accent-cyan">
            {match[0]}
          </span>,
        )
      } else if (match[2]) {
        // Keyword match
        elements.push(
          <span key={`${pi}-${idx++}`} className="text-accent-violet">
            {match[0]}
          </span>,
        )
      }

      lastEnd = match.index + match[0].length
    }

    // Add remaining plain text
    if (lastEnd < remaining.length) {
      elements.push(
        <span key={`${pi}-${idx++}`}>{remaining.slice(lastEnd)}</span>,
      )
    }

    return <span key={pi}>{elements}</span>
  })
}

function highlightBash(code: string) {
  const lines = code.split('\n')

  return lines.map((line, li) => {
    // Comment lines
    if (line.trimStart().startsWith('#')) {
      return (
        <span key={li}>
          <span className="text-text-muted">{line}</span>
          {li < lines.length - 1 ? '\n' : ''}
        </span>
      )
    }

    // Highlight keywords: curl, POST, GET
    const elements: React.ReactNode[] = []
    const combined = new RegExp(
      `('[^']*'|"[^"]*")|\\b(curl|POST|GET|Bearer)\\b`,
      'g',
    )

    let match: RegExpExecArray | null
    let lastEnd = 0
    let idx = 0

    while ((match = combined.exec(line)) !== null) {
      if (match.index > lastEnd) {
        elements.push(
          <span key={`${li}-${idx++}`}>
            {line.slice(lastEnd, match.index)}
          </span>,
        )
      }

      if (match[1]) {
        elements.push(
          <span key={`${li}-${idx++}`} className="text-accent-cyan">
            {match[0]}
          </span>,
        )
      } else if (match[2]) {
        elements.push(
          <span key={`${li}-${idx++}`} className="text-accent-violet">
            {match[0]}
          </span>,
        )
      }

      lastEnd = match.index + match[0].length
    }

    if (lastEnd < line.length) {
      elements.push(
        <span key={`${li}-${idx++}`}>{line.slice(lastEnd)}</span>,
      )
    }

    return (
      <span key={li}>
        {elements}
        {li < lines.length - 1 ? '\n' : ''}
      </span>
    )
  })
}

function highlightJSON(code: string) {
  const lines = code.split('\n')

  return lines.map((line, li) => {
    const elements: React.ReactNode[] = []
    // Match JSON keys and string values
    const combined = new RegExp(`("(?:[^"\\\\]|\\\\.)*")`, 'g')

    let match: RegExpExecArray | null
    let lastEnd = 0
    let idx = 0

    while ((match = combined.exec(line)) !== null) {
      if (match.index > lastEnd) {
        const between = line.slice(lastEnd, match.index)
        elements.push(<span key={`${li}-${idx++}`}>{between}</span>)
      }

      // Determine if it's a key or value based on what follows
      const afterMatch = line.slice(match.index + match[0].length).trimStart()
      if (afterMatch.startsWith(':')) {
        // It's a key
        elements.push(
          <span key={`${li}-${idx++}`} className="text-accent-violet">
            {match[0]}
          </span>,
        )
      } else {
        // It's a value
        elements.push(
          <span key={`${li}-${idx++}`} className="text-accent-cyan">
            {match[0]}
          </span>,
        )
      }

      lastEnd = match.index + match[0].length
    }

    if (lastEnd < line.length) {
      elements.push(
        <span key={`${li}-${idx++}`}>{line.slice(lastEnd)}</span>,
      )
    }

    return (
      <span key={li}>
        {elements}
        {li < lines.length - 1 ? '\n' : ''}
      </span>
    )
  })
}

function highlightCode(tab: TabId, code: string): React.ReactNode {
  switch (tab) {
    case 'python':
      return highlightPython(code)
    case 'curl':
      return highlightBash(code)
    case 'mcp':
      return highlightJSON(code)
  }
}

/* ------------------------------------------------------------------ */
/*  Copy button                                                        */
/* ------------------------------------------------------------------ */
function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback: noop
    }
  }, [code])

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copy code to clipboard"
      className={cn(
        'absolute top-4 right-4 z-10',
        'flex items-center gap-1.5 rounded-lg px-3 py-1.5',
        'text-xs font-mono font-medium',
        'glass transition-all duration-200',
        'hover:bg-white/[0.08] hover:border-white/20',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/50',
        copied ? 'text-accent-cyan' : 'text-text-muted',
      )}
    >
      {copied ? (
        <>
          <svg
            className="h-3.5 w-3.5"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 8.5l3.5 3.5L13 4" />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg
            className="h-3.5 w-3.5"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="5" y="5" width="9" height="9" rx="1.5" />
            <path d="M2 11V2.5A.5.5 0 012.5 2H11" />
          </svg>
          Copy
        </>
      )}
    </button>
  )
}

/* ------------------------------------------------------------------ */
/*  Tab content transition                                             */
/* ------------------------------------------------------------------ */
const codeVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' as const } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: 'easeIn' as const } },
}

/* ------------------------------------------------------------------ */
/*  CodeDemo section                                                   */
/* ------------------------------------------------------------------ */
export default function CodeDemo() {
  const [activeTab, setActiveTab] = useState<TabId>('python')

  return (
    <SectionWrapper id="code-demo">
      <SectionHeading
        title="Ship in Minutes"
        subtitle="Three API calls. That's all it takes."
      />

      {/* Tab bar */}
      <div className="mx-auto max-w-3xl">
        <div className="flex gap-1 rounded-xl glass p-1 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'relative flex-1 rounded-lg px-4 py-2.5',
                'font-mono text-sm font-medium',
                'transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/50',
                activeTab === tab.id
                  ? 'bg-white/[0.08] text-text-primary border-b-2 border-accent-cyan'
                  : 'text-text-muted hover:text-text-secondary hover:bg-white/[0.03]',
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Code block */}
        <div className="relative glass-heavy rounded-xl">
          <CopyButton code={codeSnippets[activeTab]} />

          <div className="overflow-x-auto p-6">
            <AnimatePresence mode="wait">
              <motion.pre
                key={activeTab}
                variants={codeVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="font-mono text-sm leading-relaxed text-text-primary whitespace-pre"
              >
                <code>{highlightCode(activeTab, codeSnippets[activeTab])}</code>
              </motion.pre>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom caption */}
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-8 text-center text-lg text-text-secondary"
        >
          That's it. Three API calls. Your agent is earning.
        </motion.p>
      </div>
    </SectionWrapper>
  )
}
