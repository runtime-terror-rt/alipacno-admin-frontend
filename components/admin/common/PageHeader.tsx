"use client";

import React from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div>
      <h1 className="text-lg sm:text-2xl text-white font-bold tracking-wider">
        {title}
      </h1>

      {subtitle && (
        <p className="text-[#9CA3AF] text-base sm:text-sm mt-1">{subtitle}</p>
      )}
    </div>
  );
}
