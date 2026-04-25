import { useState } from 'react'
import { Briefcase, CheckCircle2, Calendar, Tag } from 'lucide-react'
import './Experience.css'

export default function Experience({ experience }) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (!experience?.length) return null

  const active = experience[activeIndex]

  return (
    <section id="experience">
      <div className="container">
        <div className="section-header">
          <p className="section-label">Career</p>
          <h2 className="section-title">Work Experience</h2>
          <p className="section-subtitle">
            Hands-on engineering roles at AI-focused startups, delivering
            production-grade full-stack and backend features.
          </p>
        </div>

        <div className="exp-layout">
          {/* Tabs */}
          <div className="exp-tabs">
            {experience.map((exp, i) => (
              <button
                key={i}
                className={`exp-tab ${activeIndex === i ? 'active' : ''}`}
                onClick={() => setActiveIndex(i)}
              >
                <div className="exp-tab-inner">
                  <div className="exp-tab-company">{exp.company}</div>
                  <div className="exp-tab-role">{exp.role}</div>
                  <div className="exp-tab-period">
                    <Calendar size={11} /> {exp.period}
                  </div>
                </div>
                <div className="exp-tab-indicator" />
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="exp-content card" key={activeIndex}>
            <div className="exp-header">
              <div className="exp-icon">
                <Briefcase size={20} />
              </div>
              <div>
                <h3 className="exp-role">{active.role}</h3>
                <div className="exp-company-row">
                  <span className="exp-company">{active.company}</span>
                  <span className="exp-type-badge">{active.type}</span>
                </div>
                <div className="exp-period">
                  <Calendar size={13} />
                  {active.period}
                </div>
              </div>
            </div>

            <div className="exp-divider" />

            <ul className="exp-points">
              {active.points.map((point, i) => (
                <li key={i} className="exp-point" style={{ animationDelay: `${i * 0.06}s` }}>
                  <CheckCircle2 size={15} className="exp-point-icon" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="exp-tags">
              {active.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
