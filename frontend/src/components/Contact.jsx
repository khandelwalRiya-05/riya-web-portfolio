import { useState } from 'react'
import { Mail, Github, Linkedin, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react'
import axios from 'axios'
import { apiPath } from '../lib/api'
import './Contact.css'

export default function Contact({ data }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null) // null | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('')

  if (!data) return null

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (status === 'error') setStatus(null)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return

    setStatus('loading')
    try {
      const res = await axios.post(apiPath('/api/contact'), form)
      if (res.data.success) {
        setStatus('success')
        setErrorMsg('')
        setForm({ name: '', email: '', message: '' })
      } else {
        throw new Error('Server error')
      }
    } catch (err) {
      setStatus('error')
      const apiMessage = err?.response?.data
      setErrorMsg(
        typeof apiMessage === 'string' && apiMessage.trim().length > 0
          ? apiMessage
          : 'Unable to send message right now. Please try again.'
      )
    }
  }

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="contact-grid">
          {/* Left info */}
          <div className="contact-info">
            <p className="section-label">Let's Talk</p>
            <h2 className="section-title">Get In Touch</h2>
            <p className="contact-desc">
              I'm actively looking for SWE and AI/ML roles. Whether you have a question,
              a project, or just want to connect — my inbox is always open.
            </p>

            <div className="contact-links">
              <a href={`mailto:${data.email}`} className="contact-link-item">
                <div className="contact-link-icon">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="contact-link-label">Email</div>
                  <div className="contact-link-value">{data.email}</div>
                </div>
              </a>

              <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="contact-link-item">
                <div className="contact-link-icon" style={{ background: 'rgba(10, 102, 194, 0.1)', color: '#0a66c2', borderColor: 'rgba(10, 102, 194, 0.2)' }}>
                  <Linkedin size={18} />
                </div>
                <div>
                  <div className="contact-link-label">LinkedIn</div>
                  <div className="contact-link-value">Connect with me</div>
                </div>
              </a>

              <a href={data.github} target="_blank" rel="noopener noreferrer" className="contact-link-item">
                <div className="contact-link-icon" style={{ background: 'rgba(36, 41, 47, 0.08)', color: '#24292f', borderColor: 'rgba(36, 41, 47, 0.15)' }}>
                  <Github size={18} />
                </div>
                <div>
                  <div className="contact-link-label">GitHub</div>
                  <div className="contact-link-value">View my code</div>
                </div>
              </a>

              <div className="contact-link-item no-hover">
                <div className="contact-link-icon" style={{ background: 'rgba(15, 118, 110, 0.1)', color: 'var(--accent-2)', borderColor: 'rgba(15, 118, 110, 0.2)' }}>
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="contact-link-label">Location</div>
                  <div className="contact-link-value">{data.location}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="contact-form-wrap card">
            {status === 'success' ? (
              <div className="contact-success">
                <CheckCircle2 size={48} className="success-icon" />
                <h3>Message Sent!</h3>
                <p>Thanks for reaching out. I'll get back to you as soon as possible.</p>
                <button className="btn btn-primary" onClick={() => setStatus(null)}>
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <h3 className="form-title">Send a Message</h3>

                <div className="form-group">
                  <label className="form-label">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@company.com"
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about the role or project..."
                    className="form-input form-textarea"
                    rows={5}
                    required
                  />
                </div>

                {status === 'error' && (
                  <div className="form-error">
                    <AlertCircle size={14} />
                    {errorMsg || 'Something went wrong. Please try again.'}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary form-submit"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <>
                      <span className="spinner" /> Sending...
                    </>
                  ) : (
                    <>
                      Send Message <Send size={15} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
