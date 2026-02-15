import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { SectionWrapper } from '../ui/SectionWrapper'
import { SectionHeading } from '../ui/SectionHeading'
import {
  fadeInUp,
  staggerContainer,
} from '../../design-system/animations'

/* ------------------------------------------------------------------ */
/*  Architecture node data                                              */
/* ------------------------------------------------------------------ */

interface ArchNode {
  id: string
  label: string
  sublabel?: string
  x: number
  y: number
  w: number
  h: number
  accent: 'cyan' | 'violet'
}

const nodes: ArchNode[] = [
  {
    id: 'clients',
    label: 'Clients',
    sublabel: 'REST / WS / MCP / OpenClaw',
    x: 30,
    y: 130,
    w: 180,
    h: 70,
    accent: 'cyan',
  },
  {
    id: 'gateway',
    label: 'FastAPI Gateway',
    x: 290,
    y: 130,
    w: 160,
    h: 70,
    accent: 'violet',
  },
  {
    id: 'router',
    label: 'Smart Router',
    x: 530,
    y: 130,
    w: 150,
    h: 70,
    accent: 'violet',
  },
  {
    id: 'cdn',
    label: '3-Tier CDN',
    x: 760,
    y: 40,
    w: 140,
    h: 60,
    accent: 'cyan',
  },
  {
    id: 'db',
    label: 'PostgreSQL',
    x: 760,
    y: 140,
    w: 140,
    h: 60,
    accent: 'cyan',
  },
  {
    id: 'zkp',
    label: 'Verification',
    x: 760,
    y: 240,
    w: 140,
    h: 60,
    accent: 'violet',
  },
]

/* ---- Mobile vertical layout ---- */

const mobileNodes: ArchNode[] = [
  {
    id: 'clients',
    label: 'Clients',
    sublabel: 'REST / WS / MCP / OpenClaw',
    x: 60,
    y: 20,
    w: 200,
    h: 60,
    accent: 'cyan',
  },
  {
    id: 'gateway',
    label: 'FastAPI Gateway',
    x: 80,
    y: 120,
    w: 160,
    h: 55,
    accent: 'violet',
  },
  {
    id: 'router',
    label: 'Smart Router',
    x: 80,
    y: 215,
    w: 160,
    h: 55,
    accent: 'violet',
  },
  {
    id: 'cdn',
    label: '3-Tier CDN',
    x: 20,
    y: 310,
    w: 120,
    h: 50,
    accent: 'cyan',
  },
  {
    id: 'db',
    label: 'PostgreSQL',
    x: 100,
    y: 380,
    w: 120,
    h: 50,
    accent: 'cyan',
  },
  {
    id: 'zkp',
    label: 'Verification',
    x: 180,
    y: 310,
    w: 120,
    h: 50,
    accent: 'violet',
  },
]

/* ------------------------------------------------------------------ */
/*  Connection paths                                                    */
/* ------------------------------------------------------------------ */

interface Connection {
  id: string
  d: string
}

const connections: Connection[] = [
  // Clients -> Gateway
  { id: 'c1', d: 'M210,165 L290,165' },
  // Gateway -> Router
  { id: 'c2', d: 'M450,165 L530,165' },
  // Router -> CDN (up)
  { id: 'c3', d: 'M680,145 Q720,70 760,70' },
  // Router -> DB (straight)
  { id: 'c4', d: 'M680,165 L760,170' },
  // Router -> ZKP (down)
  { id: 'c5', d: 'M680,185 Q720,260 760,270' },
]

const mobileConnections: Connection[] = [
  // Clients -> Gateway (vertical)
  { id: 'mc1', d: 'M160,80 L160,120' },
  // Gateway -> Router
  { id: 'mc2', d: 'M160,175 L160,215' },
  // Router -> CDN
  { id: 'mc3', d: 'M120,270 Q80,290 80,310' },
  // Router -> DB
  { id: 'mc4', d: 'M160,270 L160,380' },
  // Router -> ZKP
  { id: 'mc5', d: 'M200,270 Q240,290 240,310' },
]

/* ------------------------------------------------------------------ */
/*  Accent colors                                                       */
/* ------------------------------------------------------------------ */

const accentColors = {
  cyan: {
    fill: 'rgba(0, 212, 255, 0.08)',
    stroke: 'rgba(0, 212, 255, 0.6)',
    text: '#00d4ff',
    glow: 'drop-shadow(0 0 8px rgba(0,212,255,0.3))',
  },
  violet: {
    fill: 'rgba(139, 92, 246, 0.08)',
    stroke: 'rgba(139, 92, 246, 0.6)',
    text: '#8b5cf6',
    glow: 'drop-shadow(0 0 8px rgba(139,92,246,0.3))',
  },
}

/* ------------------------------------------------------------------ */
/*  ArchNode SVG component                                              */
/* ------------------------------------------------------------------ */

function ArchNodeRect({
  node,
  index,
}: {
  node: ArchNode
  index: number
}) {
  const colors = accentColors[node.accent]

  return (
    <motion.g
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 * index, ease: 'easeOut' }}
      style={{ filter: colors.glow }}
    >
      <rect
        x={node.x}
        y={node.y}
        width={node.w}
        height={node.h}
        rx={12}
        fill={colors.fill}
        stroke={colors.stroke}
        strokeWidth={1.5}
      />
      <text
        x={node.x + node.w / 2}
        y={node.y + (node.sublabel ? node.h / 2 - 6 : node.h / 2 + 1)}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#e0e0e0"
        fontSize={13}
        fontFamily="var(--font-display, system-ui)"
        fontWeight={600}
      >
        {node.label}
      </text>
      {node.sublabel && (
        <text
          x={node.x + node.w / 2}
          y={node.y + node.h / 2 + 12}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="rgba(255,255,255,0.45)"
          fontSize={10}
          fontFamily="var(--font-mono, monospace)"
        >
          {node.sublabel}
        </text>
      )}
    </motion.g>
  )
}

/* ------------------------------------------------------------------ */
/*  Animated connection line                                            */
/* ------------------------------------------------------------------ */

function AnimatedConnection({
  d,
  delay,
}: {
  d: string
  delay: number
}) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="rgba(0, 212, 255, 0.3)"
      strokeWidth={1.5}
      strokeDasharray="6 4"
      initial={{ strokeDashoffset: 40, opacity: 0 }}
      animate={{ strokeDashoffset: 0, opacity: 1 }}
      transition={{ duration: 1.4, delay, ease: 'easeOut' }}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  Stats row data                                                      */
/* ------------------------------------------------------------------ */

const stats = [
  { value: '82', label: 'Endpoints' },
  { value: '25', label: 'Async Services' },
  { value: '17', label: 'DB Models' },
  { value: 'Sub-100ms', label: 'Latency' },
]

/* ------------------------------------------------------------------ */
/*  Architecture Section                                                */
/* ------------------------------------------------------------------ */

export default function Architecture() {
  const svgRef = useRef<SVGSVGElement>(null)
  const isInView = useInView(svgRef, { once: true, margin: '-80px' })

  return (
    <SectionWrapper id="architecture">
      <SectionHeading
        title="Enterprise Architecture"
        subtitle="82 endpoints. 25 async services. Built to scale."
        gradient
      />

      {/* ---- Desktop SVG Diagram ---- */}
      <motion.div
        className="hidden md:block relative mx-auto max-w-[960px]"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        <svg
          ref={svgRef}
          viewBox="0 0 940 330"
          className="w-full h-auto"
          fill="none"
          aria-label="AgentChains system architecture diagram"
          role="img"
        >
          {/* Background grid effect */}
          <defs>
            <pattern
              id="arch-grid"
              width={40}
              height={40}
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth={0.5}
              />
            </pattern>
          </defs>
          <rect width="940" height="330" fill="url(#arch-grid)" />

          {/* Connection lines (render behind nodes) */}
          {isInView &&
            connections.map((conn, i) => (
              <AnimatedConnection
                key={conn.id}
                d={conn.d}
                delay={0.8 + i * 0.15}
              />
            ))}

          {/* Arrowheads on connections */}
          {isInView && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 1.6 }}
            >
              {/* Arrow: Clients -> Gateway */}
              <polygon points="286,160 296,165 286,170" fill="rgba(0,212,255,0.4)" />
              {/* Arrow: Gateway -> Router */}
              <polygon points="526,160 536,165 526,170" fill="rgba(0,212,255,0.4)" />
              {/* Arrow: Router -> CDN */}
              <polygon points="756,65 766,70 756,75" fill="rgba(0,212,255,0.4)" />
              {/* Arrow: Router -> DB */}
              <polygon points="756,165 766,170 756,175" fill="rgba(0,212,255,0.4)" />
              {/* Arrow: Router -> ZKP */}
              <polygon points="756,265 766,270 756,275" fill="rgba(0,212,255,0.4)" />
            </motion.g>
          )}

          {/* Architecture nodes */}
          {isInView &&
            nodes.map((node, i) => (
              <ArchNodeRect key={node.id} node={node} index={i} />
            ))}
        </svg>
      </motion.div>

      {/* ---- Mobile SVG Diagram ---- */}
      <motion.div
        className="md:hidden relative mx-auto max-w-[320px]"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        <svg
          viewBox="0 0 320 450"
          className="w-full h-auto"
          fill="none"
          aria-label="AgentChains system architecture diagram"
          role="img"
        >
          <defs>
            <pattern
              id="arch-grid-m"
              width={30}
              height={30}
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 30 0 L 0 0 0 30"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth={0.5}
              />
            </pattern>
          </defs>
          <rect width="320" height="450" fill="url(#arch-grid-m)" />

          {mobileConnections.map((conn, i) => (
            <AnimatedConnection
              key={conn.id}
              d={conn.d}
              delay={0.6 + i * 0.12}
            />
          ))}

          {mobileNodes.map((node, i) => (
            <ArchNodeRect key={node.id} node={node} index={i} />
          ))}
        </svg>
      </motion.div>

      {/* ---- Stats Row ---- */}
      <motion.div
        className="mt-12 flex flex-wrap justify-center gap-x-10 gap-y-4"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            className="text-center"
            variants={fadeInUp}
          >
            <span className="block font-display text-2xl font-bold text-text-primary">
              {stat.value}
            </span>
            <span className="text-sm text-text-muted">{stat.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
