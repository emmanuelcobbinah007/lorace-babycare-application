import { BusinessConfiguration, UmbrellaCompany } from './types';

// Umbrella company configuration
export const umbrellaCompany: UmbrellaCompany = {
  name: 'lolyraced-ventures',
  displayName: 'Lolyraced Ventures',
  description: 'A multi-business umbrella company providing diverse services and products across various industries.',
  logoUrl: '/images/lolyraced-logo.png',
  contact: {
    email: 'info@lolyraced.com',
    phone: '+233-XXX-XXXX',
    address: 'Accra, Ghana',
    socialMedia: {
      facebook: 'https://facebook.com/lolyraced',
      instagram: 'https://instagram.com/lolyraced',
      twitter: 'https://twitter.com/lolyraced',
      linkedin: 'https://linkedin.com/company/lolyraced'
    }
  },
  seo: {
    title: 'Lolyraced Ventures - Your Business Partner',
    description: 'Discover our diverse portfolio of businesses offering quality products and services.',
    keywords: ['business', 'ventures', 'ghana', 'services', 'products'],
    ogImage: '/images/lolyraced-og.jpg'
  },
  businesses: []
};

// Individual business configurations
export const businessConfigs: Record<string, BusinessConfiguration> = {
  'loracebabycare': {
    id: 'loracebabycare',
    name: 'lorace-babycare',
    displayName: 'Lorace Babycare',
    subdomain: 'loracebabycare',
    domain: 'loracebabycare.lolyraced.com',
    developmentUrl: 'http://localhost:3000',
    theme: {
      primaryColor: '#dcaed0',
      secondaryColor: '#b970a0',
      accentColor: '#ff6b9d',
      backgroundColor: '#ffffff',
      textColor: '#333333',
      logoUrl: '/images/loraceLogo.png',
      favicon: '/favicon.ico'
    },
    seo: {
      title: 'Lorace Babycare - Premium Baby Products',
      description: 'Quality baby products for your little ones. From clothing to accessories, we have everything you need.',
      keywords: ['baby products', 'baby clothes', 'baby accessories', 'ghana', 'children'],
      ogImage: '/images/lorace-og.jpg'
    },
    contact: {
      email: 'loracebabycare@gmail.com',
      phone: '+233-XXX-XXXX',
      address: 'Accra, Ghana',
      socialMedia: {
        facebook: 'https://facebook.com/loracebabycare',
        instagram: 'https://instagram.com/loracebabycare'
      }
    },
    features: {
      ecommerce: true,
      blog: false,
      portfolio: false,
      booking: false,
      newsletter: true,
      reviews: true,
      analytics: true
    },
    database: {
      tenantId: 'lorace_babycare'
    },
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  
  'shopssentials': {
    id: 'shopssentials',
    name: 'shopssentials',
    displayName: 'Shopssentials',
    subdomain: 'shopssentials',
    domain: 'shopssentials.lolyraced.com',
    developmentUrl: 'http://localhost:3001',
    theme: {
      primaryColor: '#2563eb',
      secondaryColor: '#1d4ed8',
      accentColor: '#3b82f6',
      backgroundColor: '#ffffff',
      textColor: '#333333',
      logoUrl: '/images/shopssentials-logo.png',
      favicon: '/favicon.ico'
    },
    seo: {
      title: 'Shopssentials - Essential Shopping Made Easy',
      description: 'Your one-stop shop for essential products and everyday needs.',
      keywords: ['shopping', 'essentials', 'products', 'ghana'],
      ogImage: '/images/shopssentials-og.jpg'
    },
    contact: {
      email: 'info@shopssentials.com',
      phone: '+233-XXX-XXXX',
      address: 'Accra, Ghana',
      socialMedia: {}
    },
    features: {
      ecommerce: true,
      blog: true,
      portfolio: false,
      booking: false,
      newsletter: true,
      reviews: true,
      analytics: true
    },
    database: {
      tenantId: 'shopssentials'
    },
    isActive: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  
  "lylashomes": {
    id: 'lylashomes',
    name: "LyLa's Homes",
    displayName: "LyLa's Homes",
    subdomain: 'lylashomes',
    domain: 'lylashomes.lolyraced.com',
    developmentUrl: 'http://localhost:3002',
    theme: {
      primaryColor: '#059669',
      secondaryColor: '#047857',
      accentColor: '#10b981',
      backgroundColor: '#ffffff',
      textColor: '#333333',
      logoUrl: '/images/lylashomes-logo.png',
      favicon: '/favicon.ico'
    },
    seo: {
      title: "LyLa's Homes - Premium Real Estate",
      description: 'Find your dream home with our premium real estate services.',
      keywords: ['real estate', 'homes', 'property', 'ghana'],
      ogImage: '/images/lylashomes-og.jpg'
    },
    contact: {
      email: 'info@lylashomes.com',
      phone: '+233-XXX-XXXX',
      address: 'Accra, Ghana',
      socialMedia: {}
    },
    features: {
      ecommerce: false,
      blog: true,
      portfolio: true,
      booking: true,
      newsletter: true,
      reviews: true,
      analytics: true
    },
    database: {
      tenantId: 'lylashomes'
    },
    isActive: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
};

// Utility functions
export const getBusinessConfig = (subdomain: string): BusinessConfiguration | null => {
  return businessConfigs[subdomain] || null;
};

export const getActiveBusinesses = (): BusinessConfiguration[] => {
  return Object.values(businessConfigs).filter(config => config.isActive);
};

export const getAllBusinesses = (): BusinessConfiguration[] => {
  return Object.values(businessConfigs);
};

export const isValidSubdomain = (subdomain: string): boolean => {
  return subdomain in businessConfigs;
};

export const getBusinessBySubdomain = (subdomain: string): BusinessConfiguration | null => {
  return businessConfigs[subdomain] || null;
};

// Environment-based URL generation
export const getBusinessUrl = (business: BusinessConfiguration): string => {
  const environment = process.env.NEXT_PUBLIC_ENVIRONMENT || 'production';
  
  if (environment === 'development') {
    return business.developmentUrl;
  }
  
  return `https://${business.domain}`;
};

// Default export
export default {
  umbrellaCompany,
  businessConfigs,
  getBusinessConfig,
  getActiveBusinesses,
  getAllBusinesses,
  isValidSubdomain,
  getBusinessUrl
};
