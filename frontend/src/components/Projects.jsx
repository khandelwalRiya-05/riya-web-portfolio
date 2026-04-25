import { ExternalLink, Github, Calendar, ArrowUpRight } from 'lucide-react'
import './Projects.css'

const PROJECT_ICONS = ['🔐', '🧠']

export default function Projects({ projects }) {
  if (!projects?.length) return null

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="section-header">
          <p className="section-label">Work</p>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            Research-grade AI/ML systems built from scratch—spanning adversarial
            security, custom architectures, and full-stack platforms.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((proj, i) => (
            <ProjectCard key={i} proj={proj} icon={PROJECT_ICONS[i] || '⚙️'} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ proj, icon, index }) {
  return (
    <div className="project-card card" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="proj-top">
        <div className="proj-icon">{icon}</div>
        <div className="proj-links">
          {proj.github && (
            <a href={proj.github} target="_blank" rel="noopener noreferrer" className="proj-link-btn" aria-label="GitHub">
              <Github size={16} />
            </a>
          )}
        </div>
      </div>

      <div className="proj-period">
        <Calendar size={12} />
        {proj.period}
      </div>

      <h3 className="proj-name">{proj.name}</h3>
      <p className="proj-desc">{proj.description}</p>

      <ul className="proj-points">
        {proj.points.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>

      <div className="proj-footer">
        <div className="proj-tags">
          {proj.tags.slice(0, 4).map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
          {proj.tags.length > 4 && (
            <span className="tag">+{proj.tags.length - 4}</span>
          )}
        </div>

        {proj.github && (
          <a href={proj.github} target="_blank" rel="noopener noreferrer" className="proj-cta">
            View Code <ArrowUpRight size={14} />
          </a>
        )}
      </div>
    </div>
  )
}
