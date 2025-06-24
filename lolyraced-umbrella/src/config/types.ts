// Business configuration types
export interface BusinessTheme {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  logoUrl: string;
  favicon: string;
}

export interface BusinessSEO {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
}

export interface BusinessContact {
  email: string;
  phone: string;
  address: string;
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export interface BusinessFeatures {
  ecommerce: boolean;
  blog: boolean;
  portfolio: boolean;
  booking: boolean;
  newsletter: boolean;
  reviews: boolean;
  analytics: boolean;
}

export interface BusinessDatabase {
  tenantId: string;
  schema?: string;
}

export interface BusinessConfiguration {
  id: string;
  name: string;
  displayName: string;
  subdomain: string;
  domain: string;
  developmentUrl: string;
  theme: BusinessTheme;
  seo: BusinessSEO;
  contact: BusinessContact;
  features: BusinessFeatures;
  database: BusinessDatabase;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UmbrellaCompany {
  name: string;
  displayName: string;
  description: string;
  logoUrl: string;
  businesses: BusinessConfiguration[];
  contact: BusinessContact;
  seo: BusinessSEO;
}
