"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to umbrella page
    router.replace("/umbrella");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Lolyraced Ventures</h1>
        <p>Redirecting to umbrella company page...</p>
      </div>
    </div>
  );
}
