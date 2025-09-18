"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode, useState } from "react";
import { Session } from "next-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function ClientProvidersLayout({
  children,
  session,
}: {
  children: ReactNode;
  session?: Session | null;
}) {
  // Create QueryClient in the client component to avoid serialization issues
  const [query] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={query}>
      <SessionProvider session={session}>{children}</SessionProvider>
    </QueryClientProvider>
  );
}
