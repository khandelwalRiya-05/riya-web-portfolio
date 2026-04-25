import { useEffect, useRef } from 'react'
import { Github, Linkedin, Mail, MapPin, Download, ArrowRight } from 'lucide-react'
import './Hero.css'

export default function Hero({ data }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let particles = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      initParticles()
    }

    const initParticles = () => {
      particles = Array.from({ length: 40 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 1,
        opacity: Math.random() * 0.4 + 0.1,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(29, 78, 216, ${p.opacity})`
        ctx.fill()
      })

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(29, 78, 216, ${0.08 * (1 - dist / 120)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  if (!data) return null

  const firstName = data.name?.split(' ')[0] || 'Your'
  const lastName = data.name?.split(' ').slice(1).join(' ') || 'Name'

  return (
    <section id="hero" className="hero">
      <canvas ref={canvasRef} className="hero-canvas" />

      <div className="hero-bg-grid" />

      <div className="container hero-inner">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Available for opportunities
          </div>

          <h1 className="hero-name">
            <span className="hero-name-first">{firstName}</span>
            <br />
            <span className="hero-name-last gradient-text">{lastName}</span>
          </h1>

          <p className="hero-title">{data.title}</p>

          <p className="hero-summary">{data.summary}</p>

          <div className="hero-meta">
            <span className="hero-meta-item">
              <MapPin size={14} />
              {data.location}
            </span>
          </div>

          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary">
              Get in Touch <ArrowRight size={16} />
            </a>
            <a href="#projects" className="btn btn-secondary">
              View Projects
            </a>
          </div>

          <div className="hero-socials">
            <a href={data.github} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href={`mailto:${data.email}`} className="social-link" aria-label="Email">
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-card-orbit">
            <div className="orbit-ring orbit-ring-1" />
            <div className="orbit-ring orbit-ring-2" />

            <div className="hero-avatar">
              <div className="avatar-initials">
                {data.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'YN'}
              </div>
            </div>

            <div className="orbit-chip chip-1">
              <span>🤖</span> AI/ML
            </div>
            <div className="orbit-chip chip-2">
              <span>⚡</span> Go
            </div>
            <div className="orbit-chip chip-3">
              <span>⚛️</span> React
            </div>
            <div className="orbit-chip chip-4">
              <span>🐍</span> Python
            </div>
          </div>

          <div className="hero-stats">
            <div className="stat-card">
              <div className="stat-value">9.1</div>
              <div className="stat-label">CGPA</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">2+</div>
              <div className="stat-label">Years Exp.</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">8+</div>
              <div className="stat-label">Attack Types</div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll-hint">
        <div className="scroll-dot" />
        Scroll to explore
      </div>
    </section>
  )
}
