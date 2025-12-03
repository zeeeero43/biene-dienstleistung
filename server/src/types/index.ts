export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  honeypot?: string;
}

export interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  from: string;
  fromName: string;
  to: string;
}

export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

export interface RateLimitConfig {
  windowMs: number;
  max: number;
}
