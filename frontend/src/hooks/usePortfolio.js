import { useState, useEffect } from 'react'
import axios from 'axios'
import { apiPath } from '../lib/api'

const FALLBACK_DATA = {
  name: "Riya Khandelwal",
  title: "AI/ML & Full-Stack Software Engineer",
  summary: "AI/ML and Full-Stack Software Engineer with hands-on experience in backend services, RESTful API design, and machine learning pipelines. Proficient in Python, Go, and React.js with proven delivery of production-grade features at tech startups.",
  email: "khandelwalriya057@gmail.com",
  linkedin: "https://www.linkedin.com/in/khandelwal-riya/",
  github: "https://github.com/khandelwalRiya-05",
  location: "Jaipur, Rajasthan, India",
  education: [
    {
      degree: "Bachelor of Technology – Computer Science Engineering",
      institution: "JK Lakshmipat University",
      location: "Jaipur",
      cgpa: 9.1,
    }
  ],
  skills: [
    { category: "Languages", skills: ["Python", "Go (Golang)", "C"] },
    { category: "Frameworks & Libraries", skills: ["React.js", "Django", "PyTorch", "TensorFlow", "LLM Pipelines", "Adversarial ML"] },
    { category: "Databases & Search", skills: ["PostgreSQL", "MySQL", "Elasticsearch"] },
    { category: "DevOps & Tools", skills: ["Docker", "Kubernetes", "Git", "Grafana", "Keycloak", "Azure AD", "Postman", "Jira", "Figma"] },
  ],
  experience: [
    {
      role: "Software Development Engineer Intern",
      company: "Produktiv.ai",
      period: "Jun 2025 – Dec 2025",
      type: "Full-Stack / Backend",
      points: [
        "Built full-stack features using Go and Python for backend microservices and React.js for the frontend, following hexagonal (clean) architecture pattern.",
        "Implemented authentication using Keycloak, enabling multi-domain SSO via Microsoft Azure AD integration.",
        "Managed database operations with PostgreSQL and monitored system health through Grafana dashboards.",
        "Designed and integrated RESTful APIs to support end-to-end feature delivery across distributed services.",
        "Debugged cross-stack issues and improved application reliability and performance.",
      ],
      tags: ["Go", "Python", "React.js", "Keycloak", "PostgreSQL", "Grafana", "Azure AD"],
    },
    {
      role: "Associate Software Intern",
      company: "Brudite Pvt. Ltd.",
      period: "May 2024 – Jul 2024",
      type: "Backend",
      points: [
        "Developed scalable backend features using Django REST Framework and PostgreSQL.",
        "Designed and optimized RESTful endpoints to reliably serve frontend requirements.",
        "Integrated third-party APIs to expand system capabilities and enhance product functionality.",
        "Collaborated with cross-functional teams to deliver features and resolve production issues.",
      ],
      tags: ["Django", "PostgreSQL", "REST API", "Python"],
    },
  ],
  projects: [
    {
      name: "VulnScan – AI/LLM Security Testing Platform",
      period: "Nov 2025 – Dec 2025",
      description: "Full-stack AI security testing platform to identify vulnerabilities in ML models and LLM systems.",
      points: [
        "Implemented 8+ adversarial attack techniques including FGSM, PGD, and DeepFool for image classifiers.",
        "Built jailbreaking and bias detection modules for large language models.",
        "Integrated Gemini API to auto-generate structured security assessment reports.",
      ],
      tags: ["Python", "PyTorch", "LLM Security", "Gemini API", "Adversarial ML"],
      github: "https://github.com/yourusername/vulnscan",
    },
    {
      name: "Custom Mixture-of-Experts GPT Architecture",
      period: "Sep 2025 – Nov 2025",
      description: "Architected and trained a modified GPT-1 variant with a Mixture of Experts design.",
      points: [
        "Improved parameter efficiency and inference throughput through MoE design.",
        "Re-engineered transformer backbone with Post-Layer Normalization and hybrid tokenizer.",
        "Enhanced training stability and vocabulary efficiency through architectural improvements.",
      ],
      tags: ["PyTorch", "Transformers", "MoE", "NLP", "Deep Learning"],
      github: "https://github.com/yourusername/moe-gpt",
    },
  ],
}

export function usePortfolio() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(apiPath('/api/portfolio'), { timeout: 3000 })
        setData(res.data)
      } catch (err) {
        console.warn('Backend not reachable, using fallback data:', err.message)
        setData(FALLBACK_DATA)
        setError('Using local data')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return { data, loading, error }
}
