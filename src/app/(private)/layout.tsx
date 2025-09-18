import ProtectedHOC from "./protected.hoc";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedHOC>{children}</ProtectedHOC>;
}
