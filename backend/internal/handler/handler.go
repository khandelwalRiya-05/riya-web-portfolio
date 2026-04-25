package handler

import (
	"encoding/json"
	"log"
	"net/http"

	"portfolio/internal/mailer"
	"portfolio/internal/model"
)

func Health(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
}

func GetPortfolio(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	portfolio := model.Portfolio{
		Name:     "Riya Khandelwal",
		Title:    "AI/ML & Full-Stack Software Engineer",
		Summary:  "AI/ML and Full-Stack Software Engineer with hands-on experience in backend services, RESTful API design, and machine learning pipelines. Proficient in Python, Go, and React.js with proven delivery of production-grade features at tech startups. Strong foundation in deep learning, LLM security, and cloud-native tooling.",
		Email:    "khandelwalriya057@gmail.com",
		LinkedIn: "https://www.linkedin.com/in/khandelwal-riya/",
		GitHub:   "https://github.com/khandelwalRiya-05",
		Location: "Jaipur, Rajasthan, India",
		Education: []model.Education{
			{
				Degree:      "Bachelor of Technology - Computer Science Engineering",
				Institution: "JK Lakshmipat University",
				Location:    "Jaipur",
				CGPA:        9.1,
			},
		},
		Skills: []model.SkillGroup{
			{
				Category: "Languages",
				Skills:   []string{"Python", "Go (Golang)", "C"},
			},
			{
				Category: "Frameworks & Libraries",
				Skills:   []string{"React.js", "Django", "PyTorch", "TensorFlow", "LLM Pipelines", "Adversarial ML"},
			},
			{
				Category: "Databases & Search",
				Skills:   []string{"PostgreSQL", "MySQL", "Elasticsearch"},
			},
			{
				Category: "DevOps & Tools",
				Skills:   []string{"Docker", "Kubernetes", "Git", "Grafana", "Keycloak", "Azure AD", "Postman", "Jira", "Figma"},
			},
		},
		Experience: []model.Experience{
			{
				Role:    "Software Development Engineer Intern",
				Company: "Produktiv.ai",
				Period:  "Jun 2025 – Dec 2025",
				Type:    "Full-Stack / Backend",
				Points: []string{
					"Built full-stack features using Go and Python for backend microservices and React.js for the frontend, following hexagonal (clean) architecture pattern.",
					"Designed and integrated RESTful APIs to support end-to-end feature delivery across distributed services.",
					"Implemented authentication and authorization using Keycloak, enabling external-user access and multi-domain SSO via Microsoft Azure AD integration.",
					"Optimized data processing workflows and extended existing functionality in alignment with evolving product requirements.",
					"Managed database operations with PostgreSQL and monitored system health through Grafana dashboards.",
				},
				Tags: []string{"Go", "Python", "React.js", "Keycloak", "PostgreSQL", "Grafana", "Azure AD"},
			},
			{
				Role:    "Associate Software Intern",
				Company: "Brudite Pvt. Ltd.",
				Period:  "May 2024 – Jul 2024",
				Type:    "Backend",
				Points: []string{
					"Developed scalable backend features using Django REST Framework and PostgreSQL, focused on efficient database modeling and API design.",
					"Designed and optimized RESTful endpoints to reliably serve frontend requirements and ensure consistent data flow.",
					"Integrated third-party APIs to expand system capabilities and enhance product functionality.",
					"Collaborated with cross-functional teams to deliver features end-to-end and resolve production issues promptly.",
				},
				Tags: []string{"Django", "PostgreSQL", "REST API", "Python"},
			},
		},
		Projects: []model.Project{
			{
				Name:        "VulnScan - AI/LLM Security Testing Platform",
				Period:      "Nov 2025 - Dec 2025",
				Description: "Full-stack AI security testing platform to identify vulnerabilities in ML models and LLM systems.",
				Points: []string{
					"Implemented 8+ adversarial attack techniques including FGSM, PGD, and DeepFool for image classifiers.",
					"Built jailbreaking and bias detection modules for large language models.",
					"Integrated Gemini API to auto-generate structured security assessment reports, reducing manual reporting effort.",
				},
				Tags:   []string{"Python", "PyTorch", "LLM Security", "Gemini API", "Adversarial ML"},
				GitHub: "https://github.com/yourusername/vulnscan",
			},
			{
				Name:        "Custom Mixture-of-Experts GPT Architecture",
				Period:      "Sep 2025 - Nov 2025",
				Description: "Architected and trained a modified GPT-1 variant with a Mixture of Experts design.",
				Points: []string{
					"Improved parameter efficiency and inference throughput through MoE design.",
					"Re-engineered transformer backbone with Post-Layer Normalization and hybrid BPE/SentencePiece Unigram tokenizer.",
					"Enhanced training stability and vocabulary efficiency through architectural improvements.",
				},
				Tags:   []string{"PyTorch", "Transformers", "MoE", "NLP", "Deep Learning"},
				GitHub: "https://github.com/yourusername/moe-gpt",
			},
		},
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(portfolio); err != nil {
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}
}

func SendContact(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req model.ContactRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if req.Name == "" || req.Email == "" || req.Message == "" {
		http.Error(w, "All fields are required", http.StatusBadRequest)
		return
	}

	emailCfg := mailer.LoadConfig()

	log.Printf("📬 Contact form submission from: %s <%s>", req.Name, req.Email)

	// Send the real email via Gmail SMTP
	if err := mailer.SendContactEmail(emailCfg, req.Name, req.Email, req.Message); err != nil {
		log.Printf("❌ Failed to send email: %v", err)
		http.Error(w, "Unable to send message right now. Please try again later.", http.StatusInternalServerError)
		return
	} else {
		log.Printf("✅ Email delivered to %s", emailCfg.ReceiverEmail)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(model.ContactResponse{
		Success: true,
		Message: "Thank you! Your message has been received. I'll get back to you soon.",
	})
}