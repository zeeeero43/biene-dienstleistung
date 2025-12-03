import { Zap, Bell, ShieldCheck, Home, Wifi, Video, Flame, Monitor } from 'lucide-react';
import { ServiceItem, NavItem, ContactInfo } from './types';

export const COMPANY_NAME = "Biene Dienstleistung";
export const TAGLINE = "WIR BRINGEN STROM INS SUMMEN";

export const CONTACT_DETAILS: ContactInfo = {
  owner: "Emre Balci",
  phone: "028419497703",
  phoneDisplay: "02841 / 94 97 703",
  email: "info@biene-dienstleistung.de",
  address: "Cecilienstr. 8 - 47443 Moers"
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#hero" },
  { label: "Leistungen", href: "#services" },
  { label: "Über uns", href: "#about" },
  { label: "Kontakt", href: "#contact" },
];

// Elektrik & Technik
export const SERVICES_TECH: ServiceItem[] = [
  {
    title: "Elektroinstallationen",
    description: "Professionelle Neuinstallationen, Wartung und Reparaturen für Wohn- und Gewerbeobjekte.",
    icon: Zap
  },
  {
    title: "Smart Home",
    description: "Intelligente Gebäudesteuerung für mehr Komfort, Effizienz und Energieersparnis.",
    icon: Home
  },
  {
    title: "Kassensysteme",
    description: "Installation und Einrichtung moderner Kassensysteme für Gastronomie und Einzelhandel.",
    icon: Monitor
  }
];

// Sicherheit
export const SERVICES_SECURITY: ServiceItem[] = [
  {
    title: "Türsprechanlagen",
    description: "Moderne Audio- und Video-Kommunikationssysteme für mehr Sicherheit an der Haustür.",
    icon: Bell
  },
  {
    title: "Alarmanlagen",
    description: "Maßgeschneiderte Sicherheitskonzepte zum Schutz Ihres Eigentums vor Einbruch.",
    icon: ShieldCheck
  },
  {
    title: "Rauch-/Brandwarnanlagen",
    description: "Zertifizierte Installation von Warnmeldern für Ihre Sicherheit und gesetzliche Konformität.",
    icon: Flame
  },
  {
    title: "Überwachungssysteme",
    description: "Hochauflösende Kameratechnik für lückenlose Überwachung und Dokumentation.",
    icon: Video
  }
];
