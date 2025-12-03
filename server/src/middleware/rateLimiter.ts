import rateLimit from 'express-rate-limit';

/**
 * Rate Limiter für Kontaktformular
 * Verhindert Spam und Missbrauch durch Begrenzung der Anfragen pro IP
 */
export const contactRateLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MINUTES || '1') * 60 * 1000, // Standard: 1 Minute
  max: parseInt(process.env.RATE_LIMIT_MAX || '5'), // Standard: 5 Anfragen
  message: {
    success: false,
    error: 'Zu viele Anfragen. Bitte versuchen Sie es in einer Minute erneut.',
  },
  standardHeaders: true, // Rate-Limit-Info in `RateLimit-*` Headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
  handler: (req, res) => {
    console.warn(`⚠ Rate limit exceeded für IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      error: 'Zu viele Anfragen. Bitte versuchen Sie es in einer Minute erneut.',
    });
  },
  skip: (req) => {
    // Optional: Whitelist für bestimmte IPs (z.B. Testing)
    const whitelistedIPs = process.env.RATE_LIMIT_WHITELIST?.split(',') || [];
    return whitelistedIPs.includes(req.ip || '');
  },
});

/**
 * Globaler Rate Limiter für alle API-Routen
 * Schützt vor allgemeinem API-Missbrauch
 */
export const globalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 Minuten
  max: 100, // 100 Anfragen pro 15 Minuten
  message: {
    success: false,
    error: 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
