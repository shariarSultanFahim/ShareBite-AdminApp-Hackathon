import { ReactNode } from "react";
import { RedirectType, redirect } from "next/navigation";
import { authSession } from "@/lib/server/session.ssr";

export default async function ProtectedHOC({
  children,
}: {
  children: ReactNode;
}) {
  const session = await authSession();
  if (session) {
    redirect("/dashboard", RedirectType.replace);
  }
  return <>{children}</>;
}
