import { useEffect, useRef, useCallback } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { cn } from '../../lib/cn'

interface ParticleBackgroundProps {
  className?: string
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
  color: string
}

const PARTICLE_COLORS = [
  'rgba(238, 238, 245,',   // white
  'rgba(238, 238, 245,',   // white (weighted)
  'rgba(0, 212, 255,',     // cyan
  'rgba(0, 212, 255,',     // cyan (weighted)
  'rgba(139, 92, 246,',    // violet
  'rgba(255, 64, 128,',    // coral (rare)
]

function createParticle(width: number, height: number): Particle {
  const color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)]
  const isHero = Math.random() < 0.1 // 10% chance of "hero" particle
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    radius: isHero ? Math.random() * 2 + 2 : Math.random() * 1.5 + 0.5,
    opacity: Math.random() * 0.35 + 0.1,
    color,
  }
}

function drawAurora(ctx: CanvasRenderingContext2D, w: number, h: number, time: number) {
  // Cyan blob - drifts slowly
  const x1 = w * 0.3 + Math.sin(time * 0.0003) * w * 0.15
  const y1 = h * 0.4 + Math.cos(time * 0.0002) * h * 0.15
  const g1 = ctx.createRadialGradient(x1, y1, 0, x1, y1, w * 0.45)
  g1.addColorStop(0, 'rgba(0, 212, 255, 0.06)')
  g1.addColorStop(1, 'rgba(0, 212, 255, 0)')
  ctx.fillStyle = g1
  ctx.fillRect(0, 0, w, h)

  // Violet blob - drifts slowly
  const x2 = w * 0.7 + Math.cos(time * 0.00025) * w * 0.15
  const y2 = h * 0.6 + Math.sin(time * 0.00035) * h * 0.15
  const g2 = ctx.createRadialGradient(x2, y2, 0, x2, y2, w * 0.4)
  g2.addColorStop(0, 'rgba(139, 92, 246, 0.05)')
  g2.addColorStop(1, 'rgba(139, 92, 246, 0)')
  ctx.fillStyle = g2
  ctx.fillRect(0, 0, w, h)

  // Coral blob - slower drift
  const x3 = w * 0.5 + Math.sin(time * 0.0002) * w * 0.1
  const y3 = h * 0.3 + Math.cos(time * 0.00015) * h * 0.1
  const g3 = ctx.createRadialGradient(x3, y3, 0, x3, y3, w * 0.3)
  g3.addColorStop(0, 'rgba(255, 64, 128, 0.03)')
  g3.addColorStop(1, 'rgba(255, 64, 128, 0)')
  ctx.fillStyle = g3
  ctx.fillRect(0, 0, w, h)
}

export function ParticleBackground({ className }: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>(0)
  const prefersReduced = useReducedMotion()

  const initParticles = useCallback((width: number, height: number) => {
    const isMobile = width < 768
    const count = isMobile ? 35 : 80
    particlesRef.current = Array.from({ length: count }, () =>
      createParticle(width, height)
    )
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (!parent) return

      const { width, height } = parent.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.scale(dpr, dpr)

      initParticles(width, height)
    }

    resizeCanvas()

    if (prefersReduced) {
      // Draw a single static frame for reduced motion
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      ctx.clearRect(0, 0, width, height)

      for (const p of particlesRef.current) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `${p.color} ${p.opacity})`
        ctx.fill()
      }
      return
    }

    const animate = () => {
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      ctx.clearRect(0, 0, width, height)

      // Draw aurora blob layer first
      drawAurora(ctx, canvas.width, canvas.height, performance.now())

      const particles = particlesRef.current
      const CONNECTION_DISTANCE = 150
      const CONNECTION_DISTANCE_SQ = CONNECTION_DISTANCE * CONNECTION_DISTANCE

      // Update and draw particles
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy

        // Wrap around edges
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10
        if (p.y < -10) p.y = height + 10
        if (p.y > height + 10) p.y = -10

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `${p.color} ${p.opacity})`
        ctx.fill()
      }

      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distSq = dx * dx + dy * dy

          if (distSq < CONNECTION_DISTANCE_SQ) {
            const dist = Math.sqrt(distSq)
            const connectionOpacity = (1 - dist / CONNECTION_DISTANCE) * 0.12
            const lineColor = Math.random() > 0.7
              ? `rgba(0, 212, 255, ${connectionOpacity})`
              : `rgba(255, 255, 255, ${connectionOpacity})`
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = lineColor
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    window.addEventListener('resize', resizeCanvas)

    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [prefersReduced, initParticles])

  return (
    <canvas
      ref={canvasRef}
      className={cn('absolute inset-0 pointer-events-none', className)}
      aria-hidden="true"
    />
  )
}
