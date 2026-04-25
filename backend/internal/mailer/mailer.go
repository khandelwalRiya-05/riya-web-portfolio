package mailer

import (
	"fmt"
	"net/smtp"
	"os"
	"strings"
)

type Config struct {
	SMTPHost     string
	SMTPPort     string
	SenderEmail  string // your Gmail address
	AppPassword  string // Gmail App Password (16 chars)
	ReceiverEmail string // where you want to receive messages (same as sender usually)
}

func LoadConfig() Config {
	return Config{
		SMTPHost:      getEnv("SMTP_HOST", "smtp.gmail.com"),
		SMTPPort:      getEnv("SMTP_PORT", "587"),
		SenderEmail:   getEnv("SENDER_EMAIL", ""),
		AppPassword:   strings.ReplaceAll(getEnv("APP_PASSWORD", ""), " ", ""),
		ReceiverEmail: getEnv("RECEIVER_EMAIL", ""),
	}
}

func getEnv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}

// SendContactEmail sends a nicely formatted HTML email to your inbox
func SendContactEmail(cfg Config, fromName, fromEmail, message string) error {
	if cfg.SenderEmail == "" || cfg.AppPassword == "" || cfg.ReceiverEmail == "" {
		return fmt.Errorf("email config missing: set SENDER_EMAIL, APP_PASSWORD, RECEIVER_EMAIL env vars")
	}

	auth := smtp.PlainAuth("", cfg.SenderEmail, cfg.AppPassword, cfg.SMTPHost)

	subject := fmt.Sprintf("📬 Portfolio Contact from %s", fromName)
	body := buildHTMLEmail(fromName, fromEmail, message)

	// Build raw MIME message
	mime := strings.Join([]string{
		fmt.Sprintf("From: Portfolio Contact <%s>", cfg.SenderEmail),
		fmt.Sprintf("To: %s", cfg.ReceiverEmail),
		fmt.Sprintf("Reply-To: %s <%s>", fromName, fromEmail),
		fmt.Sprintf("Subject: %s", subject),
		"MIME-Version: 1.0",
		`Content-Type: text/html; charset="UTF-8"`,
		"",
		body,
	}, "\r\n")

	addr := cfg.SMTPHost + ":" + cfg.SMTPPort
	return smtp.SendMail(addr, auth, cfg.SenderEmail, []string{cfg.ReceiverEmail}, []byte(mime))
}

func buildHTMLEmail(fromName, fromEmail, message string) string {
	return fmt.Sprintf(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
    .container { max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #1d4ed8, #7c3aed); padding: 32px 36px; }
    .header h1 { color: white; margin: 0; font-size: 22px; font-weight: 600; }
    .header p { color: rgba(255,255,255,0.8); margin: 6px 0 0; font-size: 14px; }
    .body { padding: 32px 36px; }
    .field { margin-bottom: 22px; }
    .label { font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #6b7280; margin-bottom: 6px; }
    .value { font-size: 15px; color: #111827; line-height: 1.6; }
    .message-box { background: #f9fafb; border-left: 3px solid #1d4ed8; border-radius: 6px; padding: 16px 18px; }
		.reply-btn, .reply-btn:visited, .reply-btn:hover, .reply-btn:active { color: #ffffff !important; text-decoration: none !important; }
		.reply-btn { display: inline-block; margin-top: 24px; padding: 12px 24px; background: #1d4ed8; border-radius: 8px; font-size: 14px; font-weight: 600; line-height: 1.2; }
    .footer { padding: 20px 36px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📬 New Portfolio Message</h1>
      <p>Someone reached out through your portfolio contact form</p>
    </div>
    <div class="body">
      <div class="field">
        <div class="label">Name</div>
        <div class="value">%s</div>
      </div>
      <div class="field">
        <div class="label">Email</div>
        <div class="value"><a href="mailto:%s" style="color:#1d4ed8;">%s</a></div>
      </div>
      <div class="field">
        <div class="label">Message</div>
        <div class="value message-box">%s</div>
      </div>
	<a href="mailto:%s" class="reply-btn" style="display:inline-block;margin-top:24px;padding:12px 24px;background:#1d4ed8;color:#ffffff !important;text-decoration:none !important;border-radius:8px;font-size:14px;font-weight:600;line-height:1.2;">Reply to %s</a>
    </div>
    <div class="footer">
      Sent via your portfolio contact form &nbsp;·&nbsp; Reply-To is set to the sender's email
    </div>
  </div>
</body>
</html>`, fromName, fromEmail, fromEmail, message, fromEmail, fromName)
}