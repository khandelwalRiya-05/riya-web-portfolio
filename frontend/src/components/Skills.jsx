import './Skills.css'

const CATEGORY_ICONS = {
  'Languages': '{ }',
  'Frameworks & Libraries': '⚙️',
  'Databases & Search': '🗄️',
  'DevOps & Tools': '🛠️',
}

const SKILL_COLORS = [
  '#1d4ed8', '#7c3aed', '#0f766e', '#b45309',
  '#dc2626', '#0284c7', '#16a34a', '#c2410c',
  '#4f46e5', '#0891b2', '#15803d', '#9333ea',
]

function hashColor(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash)
  return SKILL_COLORS[Math.abs(hash) % SKILL_COLORS.length]
}

export default function Skills({ skills }) {
  if (!skills?.length) return null

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <div className="section-header">
          <p className="section-label">Expertise</p>
          <h2 className="section-title">Technical Skills</h2>
          <p className="section-subtitle">
            A versatile stack spanning AI/ML research, backend engineering,
            and cloud-native infrastructure.
          </p>
        </div>

        <div className="skills-grid">
          {skills.map((group, i) => (
            <div key={i} className="skills-card card" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="skills-cat-header">
                <span className="skills-cat-icon">
                  {CATEGORY_ICONS[group.category] || '◆'}
                </span>
                <h3 className="skills-cat-title">{group.category}</h3>
              </div>
              <div className="skills-pills">
                {group.skills.map(skill => (
                  <SkillPill key={skill} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SkillPill({ skill }) {
  const color = hashColor(skill)
  return (
    <span
      className="skill-pill"
      style={{
        '--pill-color': color,
        '--pill-bg': color + '14',
        '--pill-border': color + '30',
      }}
    >
      {skill}
    </span>
  )
}
