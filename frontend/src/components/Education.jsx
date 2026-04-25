import { GraduationCap, Star, MapPin } from 'lucide-react'
import './Education.css'

export default function Education({ education }) {
  if (!education?.length) return null

  return (
    <section id="education" className="education-section">
      <div className="container">
        <div className="section-header">
          <p className="section-label">Academic</p>
          <h2 className="section-title">Education</h2>
        </div>

        <div className="edu-grid">
          {education.map((edu, i) => (
            <div key={i} className="edu-card card">
              <div className="edu-icon-wrap">
                <GraduationCap size={24} />
              </div>
              <div className="edu-body">
                <h3 className="edu-degree">{edu.degree}</h3>
                <div className="edu-inst">{edu.institution}</div>
                <div className="edu-meta">
                  <span className="edu-meta-item">
                    <MapPin size={13} /> {edu.location}
                  </span>
                  <span className="edu-cgpa">
                    <Star size={13} />
                    CGPA: <strong>{edu.cgpa}</strong> / 10
                  </span>
                </div>
              </div>
              <div className="edu-badge">
                <div className="edu-badge-value">{edu.cgpa}</div>
                <div className="edu-badge-label">CGPA</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
