import { LucideIcon } from 'lucide-react';

export interface ServiceItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ContactInfo {
  owner: string;
  phone: string;
  phoneDisplay: string;
  email: string;
  address: string;
}