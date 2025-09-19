"use client";
import React from "react";

interface HubProps {
  children: React.ReactNode;
}

export default function Drop({ children }: HubProps) {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Drop Requests</h1>
      {children}
    </div>
  );
}
