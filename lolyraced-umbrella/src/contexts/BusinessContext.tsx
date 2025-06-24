"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { BusinessConfiguration } from "@lolyraced/types";
import { getBusinessConfig } from "@lolyraced/config";

interface BusinessContextType {
  business: BusinessConfiguration | null;
  isLoading: boolean;
  error: string | null;
}

const BusinessContext = createContext<BusinessContextType>({
  business: null,
  isLoading: true,
  error: null,
});

export const useBusiness = () => {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error("useBusiness must be used within a BusinessProvider");
  }
  return context;
};

interface BusinessProviderProps {
  children: React.ReactNode;
  initialBusiness?: BusinessConfiguration | null;
}

export const BusinessProvider: React.FC<BusinessProviderProps> = ({
  children,
  initialBusiness,
}) => {
  // Initialize business state synchronously for localhost to prevent flash
  const getInitialBusiness = () => {
    if (initialBusiness) return initialBusiness;

    // For client-side, check hostname immediately
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      const subdomain = getSubdomainFromHostname(hostname);

      if (subdomain) {
        return getBusinessConfig(subdomain) || null;
      } else {
        // Main domain or localhost - umbrella company (no specific business)
        return null;
      }
    }

    return null;
  };

  const [business, setBusiness] = useState<BusinessConfiguration | null>(
    getInitialBusiness()
  );
  const [isLoading, setIsLoading] = useState(false); // Start with false since we determine synchronously
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    // If we already have a business from server-side props or synchronous detection, don't fetch again
    if (initialBusiness || business !== null || typeof window === "undefined") {
      setIsLoading(false);
      return;
    }

    // Only run async fetch if we couldn't determine business synchronously
    const fetchBusinessConfig = async () => {
      try {
        setIsLoading(true);

        // Try to get business info from the current hostname
        const hostname = window.location.hostname;
        const subdomain = getSubdomainFromHostname(hostname);

        if (subdomain) {
          const businessConfig = getBusinessConfig(subdomain);
          if (businessConfig) {
            setBusiness(businessConfig);
          } else {
            setError("Business configuration not found");
          }
        } else {
          // We're on the main domain or localhost - no specific business (umbrella company)
          setBusiness(null);
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load business configuration"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchBusinessConfig();
  }, [initialBusiness, business]);
  const value: BusinessContextType = {
    business,
    isLoading,
    error,
  };

  return (
    <BusinessContext.Provider value={value}>
      {children}
    </BusinessContext.Provider>
  );
};

// Helper function to extract subdomain from hostname
function getSubdomainFromHostname(hostname: string): string | null {
  // Remove port if present
  const cleanHostname = hostname.split(":")[0];

  // Handle localhost development
  if (
    cleanHostname.includes("localhost") ||
    cleanHostname.includes("127.0.0.1")
  ) {
    return null;
  }

  // Split by dots and check if we have a subdomain
  const parts = cleanHostname.split(".");

  // For lolyraced.com, we expect: [subdomain, 'lolyraced', 'com']
  if (parts.length >= 3) {
    return parts[0];
  }

  return null;
}
