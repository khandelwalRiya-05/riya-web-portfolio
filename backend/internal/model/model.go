package model

type Portfolio struct {
	Name        string       `json:"name"`
	Title       string       `json:"title"`
	Summary     string       `json:"summary"`
	Email       string       `json:"email"`
	LinkedIn    string       `json:"linkedin"`
	GitHub      string       `json:"github"`
	Location    string       `json:"location"`
	Skills      []SkillGroup `json:"skills"`
	Experience  []Experience `json:"experience"`
	Projects    []Project    `json:"projects"`
	Education   []Education  `json:"education"`
}

type SkillGroup struct {
	Category string   `json:"category"`
	Skills   []string `json:"skills"`
}

type Experience struct {
	Role        string   `json:"role"`
	Company     string   `json:"company"`
	Period      string   `json:"period"`
	Type        string   `json:"type"`
	Points      []string `json:"points"`
	Tags        []string `json:"tags"`
}

type Project struct {
	Name        string   `json:"name"`
	Period      string   `json:"period"`
	Description string   `json:"description"`
	Points      []string `json:"points"`
	Tags        []string `json:"tags"`
	GitHub      string   `json:"github"`
}

type Education struct {
	Degree      string  `json:"degree"`
	Institution string  `json:"institution"`
	Location    string  `json:"location"`
	CGPA        float64 `json:"cgpa"`
}

type ContactRequest struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Message string `json:"message"`
}

type ContactResponse struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}
