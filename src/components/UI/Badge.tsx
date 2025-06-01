import React from "react";

const variants = {
  default: "bg-secondary text-foreground",
  success: "bg-green-100 text-green-800",
  warning: "bg-yellow-100 text-yellow-800",
  error: "bg-red-100 text-red-800",
  info: "bg-primary text-white",
  outline: "border border-gray-300 text-primary-foreground bg-transparent",
};

const sizes = {
  sm: "text-xs px-2 py-0.5",
  md: "text-sm px-3 py-1",
  lg: "text-base px-4 py-1.5",
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  rounded?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
  className?: string;
}

const Badge = ({
  children,
  variant = "default",
  size = "md",
  rounded = true,
  icon,
  iconPosition = "start",
  className = "",
}: BadgeProps) => {
  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap ${
        variants[variant]
      } ${sizes[size]} ${rounded ? "rounded-full" : "rounded-md"} ${className}`}
    >
      {icon && iconPosition === "start" && (
        <span className="inline-flex">{icon}</span>
      )}
      {children}
      {icon && iconPosition === "end" && (
        <span className="inline-flex">{icon}</span>
      )}
    </span>
  );
};

export default Badge;
