import { BusinessConfiguration, UmbrellaCompany } from '@lolyraced/types';

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
  businesses: [] // Will be populated with individual business configs
};

// Individual business configurations
export const businessConfigs: Record<string, BusinessConfiguration> = {
  'loracebabycare': {
    id: 'loracebabycare',
    name: 'lorace-babycare',
    displayName: 'Lorace Babycare',
    subdomain: 'loracebabycare',
    domain: 'loracebabycare.lolyraced.com',
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
      email: 'info@loracebabycare.com',
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
  
  'company2': {
    id: 'company2',
    name: 'company2',
    displayName: 'Company 2',
    subdomain: 'company2',
    domain: 'company2.lolyraced.com',
    theme: {
      primaryColor: '#2563eb',
      secondaryColor: '#1d4ed8',
      accentColor: '#3b82f6',
      backgroundColor: '#ffffff',
      textColor: '#333333',
      logoUrl: '/images/company2-logo.png',
      favicon: '/favicon.ico'
    },
    seo: {
      title: 'Company 2 - Professional Services',
      description: 'Professional services and solutions for your business needs.',
      keywords: ['services', 'professional', 'business', 'ghana'],
      ogImage: '/images/company2-og.jpg'
    },
    contact: {
      email: 'info@company2.com',
      phone: '+233-XXX-XXXX',
      address: 'Accra, Ghana',
      socialMedia: {}
    },
    features: {
      ecommerce: false,
      blog: true,
      portfolio: true,
      booking: true,
      newsletter: false,
      reviews: false,
      analytics: true
    },
    database: {
      tenantId: 'company2'
    },
    isActive: false, // Not yet active
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  
  'company3': {
    id: 'company3',
    name: 'company3',
    displayName: 'Company 3',
    subdomain: 'company3',
    domain: 'company3.lolyraced.com',
    theme: {
      primaryColor: '#059669',
      secondaryColor: '#047857',
      accentColor: '#10b981',
      backgroundColor: '#ffffff',
      textColor: '#333333',
      logoUrl: '/images/company3-logo.png',
      favicon: '/favicon.ico'
    },
    seo: {
      title: 'Company 3 - Innovative Solutions',
      description: 'Innovative solutions and products for modern challenges.',
      keywords: ['innovation', 'solutions', 'technology', 'ghana'],
      ogImage: '/images/company3-og.jpg'
    },
    contact: {
      email: 'info@company3.com',
      phone: '+233-XXX-XXXX',
      address: 'Accra, Ghana',
      socialMedia: {}
    },
    features: {
      ecommerce: true,
      blog: false,
      portfolio: true,
      booking: false,
      newsletter: true,
      reviews: true,
      analytics: true
    },
    database: {
      tenantId: 'company3'
    },
    isActive: false, // Not yet active
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

// Default export
export default {
  umbrellaCompany,
  businessConfigs,
  getBusinessConfig,
  getActiveBusinesses,
  getAllBusinesses,
  isValidSubdomain
};
