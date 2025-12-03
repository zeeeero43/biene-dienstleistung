import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import contactRouter from './routes/contact.js';
import { globalRateLimiter } from './middleware/rateLimiter.js';

// Umgebungsvariablen laden
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// ========================================
// MIDDLEWARE
// ========================================

// Security Headers mit Helmet
app.use(helmet({
  contentSecurityPolicy: false, // Frontend verwendet eigene CSP
  crossOriginEmbedderPolicy: false,
}));

// CORS-Konfiguration
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000')
  .split(',')
  .map(origin => origin.trim());

app.use(cors({
  origin: (origin, callback) => {
    // Erlaube Anfragen ohne Origin (z.B. mobile Apps, Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`⚠ CORS-Anfrage von nicht erlaubter Origin blockiert: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Body Parser
app.use(express.json({ limit: '10kb' })); // Begrenze Request-Body-Größe
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Globales Rate Limiting
app.use('/api', globalRateLimiter);

// Request-Logging (optional für Development)
if (process.env.NODE_ENV === 'development') {
  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
  });
}

// ========================================
// ROUTES
// ========================================

// Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Backend läuft',
    timestamp: new Date().toISOString(),
  });
});

// Kontakt-Route
app.use('/api', contactRouter);

// 404-Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Route nicht gefunden',
  });
});

// Globaler Error-Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Unerwarteter Fehler:', err);

  // CORS-Fehler
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({
      success: false,
      error: 'CORS-Richtlinie: Anfrage von dieser Origin nicht erlaubt',
    });
  }

  // Generischer Fehler
  res.status(500).json({
    success: false,
    error: 'Ein interner Serverfehler ist aufgetreten',
  });
});

// ========================================
// SERVER STARTEN
// ========================================

app.listen(PORT, () => {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🐝 Biene Dienstleistung - Backend-Server');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`✓ Server läuft auf Port ${PORT}`);
  console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`✓ CORS erlaubt: ${allowedOrigins.join(', ')}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`\n📡 API Endpoints:`);
  console.log(`   GET  http://localhost:${PORT}/api/health`);
  console.log(`   GET  http://localhost:${PORT}/api/contact/health`);
  console.log(`   POST http://localhost:${PORT}/api/contact`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
});

// Graceful Shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM empfangen. Server wird heruntergefahren...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('\nSIGINT empfangen. Server wird heruntergefahren...');
  process.exit(0);
});
