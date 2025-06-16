import React from "react";
import LoadingSpinner from "./Spinner";

const variants = {
  primary: " bg-primary hover:brightness-120 border-none  text-white",
  secondary:
    "  border-foreground bg-secondary hover:bg-primary text-foreground border-[1px]",
  disabled:
    " border-muted  opacity-50 cursor-not-allowed text-muted-foreground ",
  ghost: "  border-none  hover:bg-secondary  text-foreground",
  destructive: " bg-red-600 hover:brightness-140 border-none text-white ",
  danger:
    "  border-red-600 hover:bg-red-100 text-red-600 dark:hover:bg-red-900",
  warning:
    "  border-yellow-600 hover:bg-yellow-100 text-yellow-600 dark:hover:bg-yellow-900",
  info: " bg-secondary hover:brightness-120 border-none  text-primary",
};
const sizes = {
  sm: "text-sm px-3 py-1.5",
  md: "text-base px-4 py-2",
  lg: "text-lg px-5 py-3",
};

interface ButtonProps {
  variant?: keyof typeof variants;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
  className?: string;
  children: React.ReactNode;
  size?: keyof typeof sizes;
  type?: "submit" | "button";
  disabled?: boolean;
}

const Button = ({
  disabled,
  variant = disabled ? "disabled" : "primary",
  type = "button",
  children,
  loading,
  className,
  onClick,
  size = "md",
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`relative flex min-h-10 justify-center items-center transition-all gap-2 cursor-pointer ${
        variants[variant]
      } ${sizes[size]} ${className} ${
        disabled || loading ? " " : "active:scale-[0.85]  duration-200"
      } `}
    >
      {loading && (
        <div className="absolute self-center ">
          <LoadingSpinner />
        </div>
      )}
      <div className={`${loading && "invisible"}`}> {children}</div>
    </button>
  );
};
export default Button;
