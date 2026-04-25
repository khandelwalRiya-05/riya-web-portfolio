import { Github, Linkedin, Mail, Heart } from 'lucide-react'
import './Footer.css'

export default function Footer({ data }) {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-left">
          <span className="footer-name">{data?.name || 'Portfolio'}</span>
          <span className="footer-sep">·</span>
          <span className="footer-role">AI/ML & Full-Stack Engineer</span>
        </div>

        <div className="footer-right">
          {data?.github && (
            <a href={data.github} target="_blank" rel="noopener noreferrer" className="footer-icon" aria-label="GitHub">
              <Github size={16} />
            </a>
          )}
          {data?.linkedin && (
            <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="footer-icon" aria-label="LinkedIn">
              <Linkedin size={16} />
            </a>
          )}
          {data?.email && (
            <a href={`mailto:${data.email}`} className="footer-icon" aria-label="Email">
              <Mail size={16} />
            </a>
          )}
        </div>
      </div>
      <div className="footer-copy container">
        © {year} {data?.name}. All rights reserved.
      </div>
    </footer>
  )
}
