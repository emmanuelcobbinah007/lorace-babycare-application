"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // How long data stays fresh (won't refetch during this time)
            staleTime: 5 * 60 * 1000, // 5 minutes
            // How long data stays in cache after components unmount
            gcTime: 10 * 60 * 1000, // 10 minutes (was cacheTime in v4)
            // Retry failed requests
            retry: 1,
            // Refetch on window focus
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* DevTools for development - automatically excluded in production */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
