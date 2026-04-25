package main

import (
	"bufio"
	"log"
	"net/http"
	"os"
	"strings"

	"portfolio/internal/handler"

	"github.com/rs/cors"
)

func main() {
	// Load .env file from common local run locations.
	// Running from backend/ expects .env, running from backend/cmd expects ../.env.
	loadEnv(".env", "../.env")

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	mux := http.NewServeMux()
	mux.HandleFunc("/api/portfolio", handler.GetPortfolio)
	mux.HandleFunc("/api/contact", handler.SendContact)
	mux.HandleFunc("/health", handler.Health)

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000", "http://localhost:5173", "*"},
		AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	})

	log.Printf("🚀 Portfolio API running on :%s", port)
	log.Printf(
		"📧 Email configured: %v",
		os.Getenv("SENDER_EMAIL") != "" && os.Getenv("APP_PASSWORD") != "" && os.Getenv("RECEIVER_EMAIL") != "",
	)

	if err := http.ListenAndServe(":"+port, c.Handler(mux)); err != nil {
		log.Fatal(err)
	}
}

// loadEnv reads the first available .env file and sets environment variables.
// Lines starting with # are comments. Format: KEY=VALUE
func loadEnv(filenames ...string) {
	for _, filename := range filenames {
		f, err := os.Open(filename)
		if err != nil {
			continue
		}
		defer f.Close()

		scanner := bufio.NewScanner(f)
		for scanner.Scan() {
			line := strings.TrimSpace(scanner.Text())
			if line == "" || strings.HasPrefix(line, "#") {
				continue
			}
			parts := strings.SplitN(line, "=", 2)
			if len(parts) != 2 {
				continue
			}
			key := strings.TrimSpace(parts[0])
			val := strings.TrimSpace(parts[1])
			// Remove surrounding quotes if present.
			val = strings.Trim(val, `"'`)
			if os.Getenv(key) == "" { // do not override existing environment variables
				os.Setenv(key, val)
			}
		}

		return
	}
}