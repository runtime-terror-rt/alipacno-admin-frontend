import React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "ghost" | "table";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
};

export default function Button({
  variant = "default",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5",
        variant === "default" &&
          "w-full py-2.5 border border-primary bg-[#F9671A33] hover:bg-[#F9671A99] text-white",
        variant === "ghost" &&
          "bg-transparent px-2.5 py-2  border border-primary text-primary hover:bg-[#F9671A1A]",
        variant === "table" &&
          "px-3 py-1 rounded-lg border border-[#f9671a] text-[#f9671a] text-xs hover:bg-[#f9671a]/10 transition-colors whitespace-nowrap",
        className
      )}
    >
      {children}
    </button>
  );
}