"use client";
import GoBack from "@/app/_components/go-back/index.button";
import React from "react";

interface HubProps {
  children: React.ReactNode;
}

export default function DropRequestEdit({ children }: HubProps) {
  return (
    <div className="p-6 space-y-6">
      <GoBack />
      {children}
    </div>
  );
}
