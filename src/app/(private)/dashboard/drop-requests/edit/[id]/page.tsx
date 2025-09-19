"use client";
import { useParams } from "next/navigation";

export default function DropRequestsEdit() {
  // Get the id from the params
  // This assumes you are using the new app router (app directory)
  // and this page is at /dashboard/drop-requests/edit/[id]/page.tsx
  // If not, adjust accordingly.
  // You can use useParams from 'next/navigation'
  const params = useParams();
  const id = params?.id;

  return <>edit page for id: {id}</>;
}
