"use client";

import { forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: "sm" | "md";
  loading?: boolean;
};

const variants: Record<ButtonVariant, string> = {
  primary: "border-app-primary bg-app-primary text-white hover:bg-app-primaryHover hover:border-app-primaryHover",
  secondary: "border-app-border bg-white text-app-text hover:bg-app-subtle",
  ghost: "border-transparent bg-transparent text-app-secondary hover:bg-app-subtle hover:text-app-text",
  danger: "border-app-critical bg-app-critical text-white hover:bg-red-700 hover:border-red-700"
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "secondary", size = "md", loading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg border font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-55",
          size === "sm" ? "h-8 px-3 text-[13px]" : "h-10 px-4 text-sm",
          variants[variant],
          className
        )}
        {...props}
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
