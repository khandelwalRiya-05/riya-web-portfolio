import { useState, useEffect } from 'react'
import './Navbar.css'

const navItems = [
  { label: 'About', id: 'hero' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Skills', id: 'skills' },
  { label: 'Contact', id: 'contact' },
]

// Navbar height offset so section isn't hidden behind sticky bar
const NAVBAR_OFFSET = 80

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET
  window.scrollTo({ top, behavior: 'smooth' })
}

export default function Navbar({ name }) {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('hero')
  const [menuOpen, setMenuOpen] = useState(false)

  // Update scrolled state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight active section based on scroll position
  useEffect(() => {
    const onScroll = () => {
      const ids = navItems.map(n => n.id)
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i])
        if (el && el.getBoundingClientRect().top <= NAVBAR_OFFSET + 40) {
          setActive(ids[i])
          return
        }
      }
      setActive('hero')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (e, id) => {
    e.preventDefault()           // stop browser jumping to anchor
    setActive(id)
    setMenuOpen(false)
    scrollToSection(id)
  }

  const initials = name
    ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'YN'

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner container">
        <a
          href="#hero"
          className="nav-logo"
          onClick={e => handleNavClick(e, 'hero')}
        >
          <span className="nav-initials">{initials}</span>
          <span className="nav-name">{name || 'Portfolio'}</span>
        </a>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navItems.map(item => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`nav-link ${active === item.id ? 'active' : ''}`}
                onClick={e => handleNavClick(e, item.id)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="nav-cta btn btn-primary"
          onClick={e => handleNavClick(e, 'contact')}
        >
          Hire Me
        </a>

        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}