import { useState, useCallback } from 'react'
import { cn } from '../../lib/cn'

interface CodeBlockProps {
  code: string
  language?: string
  className?: string
}

function highlightSyntax(code: string): string {
  // Simple regex-based syntax highlighting for common patterns
  let highlighted = code
    // Escape HTML entities first
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  // Comments (single-line)
  highlighted = highlighted.replace(
    /(\/\/.*$|#.*$)/gm,
    '<span class="text-text-muted italic">$1</span>'
  )

  // Strings (double and single quotes)
  highlighted = highlighted.replace(
    /(&quot;|"|')(?:(?!\1).)*?\1/g,
    '<span class="text-emerald-400">$&</span>'
  )

  // Keywords
  highlighted = highlighted.replace(
    /\b(const|let|var|function|return|if|else|for|while|import|export|from|default|class|extends|new|this|async|await|try|catch|throw|typeof|interface|type|enum|public|private|protected|static|readonly|def|self|True|False|None|print|raise|except|finally|with|as|yield|lambda|pass)\b/g,
    '<span class="text-accent-violet">$1</span>'
  )

  // Built-in values and types
  highlighted = highlighted.replace(
    /\b(true|false|null|undefined|NaN|Infinity|void|string|number|boolean|any|never|unknown|object|Array|Promise|Map|Set|Error|console|window|document)\b/g,
    '<span class="text-accent-cyan">$1</span>'
  )

  // Numbers
  highlighted = highlighted.replace(
    /\b(\d+\.?\d*)\b/g,
    '<span class="text-accent-coral">$1</span>'
  )

  // Function calls
  highlighted = highlighted.replace(
    /\b([a-zA-Z_]\w*)\s*(?=\()/g,
    '<span class="text-yellow-300">$1</span>'
  )

  return highlighted
}

export function CodeBlock({
  code,
  language = 'typescript',
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea')
      textarea.value = code
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [code])

  const highlighted = highlightSyntax(code)
  const highlightedLines = highlighted.split('\n')

  return (
    <div className={cn('relative group rounded-xl overflow-hidden', className)}>
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 glass-heavy border-b border-white/5">
        <span className="text-xs font-mono text-text-muted uppercase tracking-wider">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className={cn(
            'px-3 py-1 rounded-md text-xs font-medium',
            'transition-all duration-200',
            'hover:bg-white/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-cyan/50',
            copied
              ? 'text-emerald-400'
              : 'text-text-muted opacity-0 group-hover:opacity-100',
          )}
          aria-label={copied ? 'Copied to clipboard' : 'Copy code to clipboard'}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Code area */}
      <div className="glass overflow-x-auto border-t-0 rounded-t-none">
        <pre className="p-4 text-sm leading-relaxed">
          <code className="font-mono">
            {highlightedLines.map((line, index) => (
              <div key={index} className="flex">
                <span
                  className="inline-block w-8 shrink-0 text-right mr-4 text-text-muted/40 select-none text-xs leading-relaxed"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <span
                  className="flex-1 min-w-0"
                  dangerouslySetInnerHTML={{
                    __html: line || '&nbsp;',
                  }}
                />
              </div>
            ))}
          </code>
        </pre>
      </div>

      {/* Subtle glow on the bottom edge */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-accent-cyan/20 to-transparent" />
    </div>
  )
}
