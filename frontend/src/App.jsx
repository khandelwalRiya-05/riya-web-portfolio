import { useEffect, useRef } from 'react'
import { usePortfolio } from './hooks/usePortfolio'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import './App.css'

export default function App() {
  const { data, loading } = usePortfolio()

  // Intersection Observer for scroll-reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )

    const targets = document.querySelectorAll('.card, .skills-card, .project-card')
    targets.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [data])

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-logo">
          {/* Animated logo */}
          <div className="loading-rings">
            <div className="loading-ring" />
            <div className="loading-ring" />
          </div>
          <div className="loading-dot" />
        </div>
        <p className="loading-text">Loading portfolio...</p>
      </div>
    )
  }

  return (
    <div className="app">
      <Navbar name={data?.name} />
      <main>
        <Hero data={data} />
        <div className="divider" />
        <Experience experience={data?.experience} />
        <div className="divider" />
        <Projects projects={data?.projects} />
        <div className="divider" />
        <Skills skills={data?.skills} />
        <div className="divider" />
        <Education education={data?.education} />
        <div className="divider" />
        <Contact data={data} />
      </main>
      <Footer data={data} />
      <ScrollToTop />
    </div>
  )
}
