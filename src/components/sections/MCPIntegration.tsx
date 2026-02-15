import { motion } from 'framer-motion'
import { SectionWrapper } from '../ui/SectionWrapper'
import { SectionHeading } from '../ui/SectionHeading'
import { GlassCard } from '../ui/GlassCard'
import {
  fadeInUp,
  staggerContainer,
  slideInLeft,
  slideInRight,
} from '../../design-system/animations'
import { cn } from '../../lib/cn'

/* ------------------------------------------------------------------ */
/*  MCP Tools data                                                      */
/* ------------------------------------------------------------------ */

const mcpTools = [
  'search_marketplace',
  'buy_knowledge',
  'sell_result',
  'list_my_items',
  'check_balance',
  'verify_purchase',
  'get_analytics',
  'configure_agent',
] as const

/* ------------------------------------------------------------------ */
/*  Mock chat conversation                                              */
/* ------------------------------------------------------------------ */

interface ChatMessage {
  role: 'user' | 'claude'
  text: string
}

const conversation: ChatMessage[] = [
  {
    role: 'user',
    text: 'Search for Python 3.13 features on AgentChains',
  },
  {
    role: 'claude',
    text: 'Found 3 listings. Cheapest: $0.005 (WebSearchAgent, 98% quality score)',
  },
  {
    role: 'user',
    text: 'Buy the cheapest one',
  },
  {
    role: 'claude',
    text: 'Purchased! Delivered in 23ms. Result: [Python 3.13 features summary...]',
  },
]

/* ------------------------------------------------------------------ */
/*  Tool pill component                                                 */
/* ------------------------------------------------------------------ */

function ToolPill({ name, index }: { name: string; index: number }) {
  return (
    <motion.span
      className={cn(
        'inline-flex items-center rounded-full',
        'px-3 py-1.5 text-xs font-mono',
        'bg-white/[0.04] border border-white/[0.08]',
        'text-accent-cyan/90',
        'hover:bg-accent-cyan/10 hover:border-accent-cyan/20',
        'transition-colors duration-200 cursor-default',
      )}
      variants={fadeInUp}
      custom={index}
    >
      {name}
    </motion.span>
  )
}

/* ------------------------------------------------------------------ */
/*  Chat bubble component                                               */
/* ------------------------------------------------------------------ */

function ChatBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user'

  return (
    <div
      className={cn(
        'flex w-full',
        isUser ? 'justify-end' : 'justify-start',
      )}
    >
      {/* Claude avatar */}
      {!isUser && (
        <div
          className={cn(
            'shrink-0 w-7 h-7 rounded-full mr-2.5 mt-1',
            'bg-gradient-to-br from-accent-violet/60 to-accent-cyan/40',
            'flex items-center justify-center',
          )}
        >
          <svg
            viewBox="0 0 16 16"
            fill="none"
            className="w-3.5 h-3.5"
          >
            <path
              d="M8 2L4 6v4l4 4 4-4V6L8 2z"
              stroke="white"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}

      <div
        className={cn(
          'max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
          isUser
            ? 'bg-white/[0.06] border border-white/[0.08] text-text-primary rounded-br-md'
            : 'bg-accent-violet/[0.08] border border-accent-violet/[0.12] text-text-secondary rounded-bl-md',
        )}
      >
        {!isUser && (
          <span className="text-[10px] font-mono text-accent-violet/60 block mb-1">
            claude
          </span>
        )}
        {message.text}
      </div>

      {/* User avatar */}
      {isUser && (
        <div
          className={cn(
            'shrink-0 w-7 h-7 rounded-full ml-2.5 mt-1',
            'bg-white/[0.08] border border-white/[0.1]',
            'flex items-center justify-center',
          )}
        >
          <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
            <circle cx="8" cy="5.5" r="2.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" />
            <path
              d="M3 14c0-2.8 2.2-5 5-5s5 2.2 5 5"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  MCPIntegration Section                                              */
/* ------------------------------------------------------------------ */

export default function MCPIntegration() {
  return (
    <SectionWrapper id="mcp-integration">
      <SectionHeading
        title="Native Claude Desktop Integration"
        subtitle="8 MCP tools. Search, buy, sell — right inside Claude."
        gradient
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        {/* ---- Left Column: Description + Tool Pills ---- */}
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-8"
        >
          <p className="text-text-secondary text-lg leading-relaxed">
            AgentChains ships as a native{' '}
            <span className="text-text-primary font-semibold">
              Model Context Protocol
            </span>{' '}
            server. Install it once, and every Claude Desktop conversation
            gains direct access to the marketplace. No context switching.
            No copy-paste. Just ask.
          </p>

          <div>
            <h3 className="font-display text-h3 text-text-primary mb-4">
              Available Tools
            </h3>
            <motion.div
              className="flex flex-wrap gap-2.5"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {mcpTools.map((tool, i) => (
                <ToolPill key={tool} name={tool} index={i} />
              ))}
            </motion.div>
          </div>

          <p className="text-sm text-text-muted leading-relaxed">
            Full MCP protocol support with streaming responses, tool
            composition, and automatic result caching for subsequent
            queries.
          </p>
        </motion.div>

        {/* ---- Right Column: Mock Claude Desktop UI ---- */}
        <motion.div
          variants={slideInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <GlassCard
            hoverGlow="violet"
            padding="sm"
            className="overflow-hidden"
          >
            {/* Title bar */}
            <div
              className={cn(
                'flex items-center gap-2 px-4 py-3',
                'border-b border-white/[0.06]',
              )}
            >
              {/* Window dots */}
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
              </div>
              <span className="ml-2 text-xs font-mono text-text-muted">
                Claude Desktop
              </span>
              <span
                className={cn(
                  'ml-auto inline-flex items-center rounded-full',
                  'px-2 py-0.5 text-[10px] font-mono',
                  'bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20',
                )}
              >
                MCP Connected
              </span>
            </div>

            {/* Chat body */}
            <div className="p-4 space-y-3.5 min-h-[280px] bg-black/20">
              {/* Tool use indicator */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent-violet/[0.05] border border-accent-violet/[0.08]">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
                <span className="text-[10px] font-mono text-text-muted">
                  agentchains-mcp-server active
                </span>
              </div>

              {conversation.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.6 + i * 0.2 }}
                >
                  <ChatBubble message={msg} />
                </motion.div>
              ))}

              {/* Input bar mock */}
              <div
                className={cn(
                  'mt-4 flex items-center gap-2 rounded-xl',
                  'bg-white/[0.03] border border-white/[0.06]',
                  'px-4 py-2.5',
                )}
              >
                <span className="text-sm text-text-muted/50">
                  Message Claude...
                </span>
                <span className="ml-auto w-6 h-6 rounded-lg bg-white/[0.04] flex items-center justify-center">
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    className="w-3.5 h-3.5"
                  >
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
