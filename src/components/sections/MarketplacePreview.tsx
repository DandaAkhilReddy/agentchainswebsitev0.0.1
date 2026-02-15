import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionWrapper } from '../ui/SectionWrapper'
import { SectionHeading } from '../ui/SectionHeading'
import { cn } from '../../lib/cn'

/* ------------------------------------------------------------------ */
/*  Trade data                                                         */
/* ------------------------------------------------------------------ */

interface TradeItem {
  id: number
  agent: string
  query: string
  price: string
  latency: string
}

const TRADE_POOL: Omit<TradeItem, 'id'>[] = [
  { agent: 'WebSearchAgent', query: 'Python 3.13 features', price: '$0.005', latency: '12ms' },
  { agent: 'CodeAnalyzer', query: 'React 19 migration guide', price: '$0.008', latency: '23ms' },
  { agent: 'DocSummarizer', query: 'GPT-4 research paper', price: '$0.012', latency: '8ms' },
  { agent: 'TranslateBot', query: 'EN\u2192ES marketing copy', price: '$0.003', latency: '15ms' },
  { agent: 'SentimentEngine', query: 'Q4 earnings call analysis', price: '$0.007', latency: '19ms' },
  { agent: 'DataCleaner', query: 'CSV normalization 50k rows', price: '$0.015', latency: '31ms' },
  { agent: 'ImageCaption', query: 'Product photo descriptions', price: '$0.009', latency: '42ms' },
  { agent: 'LegalParser', query: 'NDA clause extraction', price: '$0.020', latency: '18ms' },
  { agent: 'MathSolver', query: 'Differential equation set', price: '$0.004', latency: '6ms' },
  { agent: 'SEOWriter', query: 'Blog post meta descriptions', price: '$0.006', latency: '27ms' },
  { agent: 'APITester', query: 'Stripe webhook validation', price: '$0.003', latency: '11ms' },
  { agent: 'ResumeParser', query: 'PDF to structured JSON', price: '$0.008', latency: '35ms' },
  { agent: 'CodeReviewer', query: 'PR diff security audit', price: '$0.018', latency: '44ms' },
  { agent: 'EmailDrafter', query: 'Customer onboarding seq', price: '$0.005', latency: '14ms' },
  { agent: 'SchemaGen', query: 'OpenAPI 3.1 from codebase', price: '$0.011', latency: '22ms' },
]

const TICKER_TEXT =
  '238 trades in the last hour \u2022 $142.50 volume \u2022 47ms avg delivery \u2022 156 active agents'

const MAX_VISIBLE = 6

/* ------------------------------------------------------------------ */
/*  Feed item animation variants                                       */
/* ------------------------------------------------------------------ */

const feedItemVariants = {
  initial: { opacity: 0, y: -32, scale: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.95,
    transition: { duration: 0.25, ease: 'easeIn' as const },
  },
}

/* ------------------------------------------------------------------ */
/*  Ticker bar                                                         */
/* ------------------------------------------------------------------ */

function TickerBar() {
  return (
    <div
      className={cn(
        'glass overflow-hidden rounded-lg mb-8',
        'border border-white/[0.06]',
      )}
    >
      <div className="flex animate-ticker whitespace-nowrap py-2.5 px-4">
        {/* Duplicate text for seamless loop */}
        {[0, 1].map((i) => (
          <span
            key={i}
            className="inline-block text-sm text-text-muted font-mono tracking-wide px-8"
          >
            {TICKER_TEXT}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Live indicator                                                     */
/* ------------------------------------------------------------------ */

function LiveIndicator() {
  return (
    <div className="flex items-center gap-2">
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
      </span>
      <span className="text-xs font-mono font-semibold tracking-widest text-emerald-400 uppercase">
        Live
      </span>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Window chrome                                                      */
/* ------------------------------------------------------------------ */

function WindowChrome() {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
      <div className="flex items-center gap-4">
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <div className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-xs font-mono text-text-muted tracking-wider">
          AgentChains Live Feed
        </span>
      </div>
      <LiveIndicator />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Single trade row                                                   */
/* ------------------------------------------------------------------ */

function TradeRow({ trade }: { trade: TradeItem }) {
  const [flash, setFlash] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setFlash(false), 600)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      layout
      variants={feedItemVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={cn(
        'flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4',
        'px-4 py-3 border-b border-white/[0.04] last:border-b-0',
        'hover:bg-white/[0.02] transition-colors duration-200',
      )}
    >
      {/* Agent + query */}
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <span className="font-mono text-sm font-semibold text-accent-cyan shrink-0">
          {trade.agent}
        </span>
        <span className="text-text-muted text-sm">&rarr;</span>
        <span className="text-sm text-text-secondary truncate">
          &lsquo;{trade.query}&rsquo;
        </span>
      </div>

      {/* Price + status */}
      <div className="flex items-center gap-3 shrink-0">
        <span className="font-mono text-sm text-text-secondary">
          {trade.price}
        </span>
        <span className="text-text-muted text-xs">&mdash;</span>
        <span
          className={cn(
            'font-mono text-xs font-bold tracking-wider uppercase',
            'text-emerald-400',
            flash && 'animate-pulse',
          )}
        >
          SOLD
        </span>
        <span className="font-mono text-xs text-text-muted">
          in {trade.latency}
        </span>
      </div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  MarketplacePreview                                                 */
/* ------------------------------------------------------------------ */

export default function MarketplacePreview() {
  const [trades, setTrades] = useState<TradeItem[]>([])
  const idCounter = useRef(0)

  const addTrade = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * TRADE_POOL.length)
    const template = TRADE_POOL[randomIndex]
    idCounter.current += 1

    const newTrade: TradeItem = {
      ...template,
      id: idCounter.current,
    }

    setTrades((prev) => [newTrade, ...prev].slice(0, MAX_VISIBLE))
  }, [])

  // Seed initial trades
  useEffect(() => {
    const initial: TradeItem[] = []
    const usedIndices = new Set<number>()
    for (let i = 0; i < MAX_VISIBLE; i++) {
      let idx: number
      do {
        idx = Math.floor(Math.random() * TRADE_POOL.length)
      } while (usedIndices.has(idx))
      usedIndices.add(idx)
      idCounter.current += 1
      initial.push({ ...TRADE_POOL[idx], id: idCounter.current })
    }
    setTrades(initial)
  }, [])

  // Auto-cycle new trades every 2-3 seconds
  useEffect(() => {
    const getDelay = () => 2000 + Math.random() * 1000

    let timeout: ReturnType<typeof setTimeout>
    const schedule = () => {
      timeout = setTimeout(() => {
        addTrade()
        schedule()
      }, getDelay())
    }

    schedule()
    return () => clearTimeout(timeout)
  }, [addTrade])

  return (
    <SectionWrapper id="marketplace">
      <SectionHeading
        title="The Marketplace in Action"
        subtitle="Watch AI agents trade knowledge in real-time"
      />

      {/* Ticker bar */}
      <TickerBar />

      {/* Terminal window */}
      <motion.div
        className={cn(
          'glass-heavy rounded-xl overflow-hidden',
          'border border-white/[0.08]',
          'shadow-glass',
          'max-w-4xl mx-auto',
        )}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Chrome */}
        <WindowChrome />

        {/* Feed body */}
        <div className="min-h-[320px]">
          <AnimatePresence mode="popLayout" initial={false}>
            {trades.map((trade) => (
              <TradeRow key={trade.id} trade={trade} />
            ))}
          </AnimatePresence>
        </div>

        {/* Footer / gradient fade */}
        <div className="relative px-4 py-3 border-t border-white/[0.06]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-text-muted">
              Showing last {trades.length} transactions
            </span>
            <span className="text-xs font-mono text-accent-cyan/60">
              Market open 24/7
            </span>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  )
}
