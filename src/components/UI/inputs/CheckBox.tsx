import React, { forwardRef, useId } from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: boolean;
  label?: string;
  required?: boolean;
  inputSize?: "sm" | "md" | "lg";
  variant?: "default" | "ghost" | "underlined";
  readOnly?: boolean;
  className?: string;
  id?: string;
  name?: string;
  errorMessage?: string;
}

const checkboxVariants = {
  default: {
    default:
      "border-2 border-primary text-primary focus:ring-primary cursor-pointer",
    error: "border-2 border-red-500 text-red-500 focus:ring-red-500",
    disabled:
      "border-2 border-gray-300 text-muted-foreground cursor-not-allowed",
  },
  ghost: {
    default: "border-2 border-primary text-primary focus:ring-primary",
    error: "border-2 border-red-500 text-red-500 focus:ring-red-500",
    disabled:
      "border-2 border-gray-300 text-muted-foreground cursor-not-allowed",
  },
  underlined: {
    default: "border-2 border-primary text-primary focus:ring-primary",
    error: "border-2 border-red-500 text-red-500 focus:ring-red-500",
    disabled:
      "border-2 border-gray-300 text-muted-foreground cursor-not-allowed",
  },
};

const checkboxSizes = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      onChange,
      disabled,
      error,
      label,
      inputSize = "md",
      variant = "default",
      className = "",
      id,
      name,
      errorMessage,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || name || generatedId;
    const state = disabled ? "disabled" : error ? "error" : "default";
    const sizeClass = checkboxSizes[inputSize];
    const variantClass = checkboxVariants[variant][state];

    return (
      <div className="flex flex-col">
        <div className={`flex items-center gap-2 ${className}`}>
          <input
            type="checkbox"
            id={inputId}
            name={name}
            disabled={disabled}
            onChange={onChange}
            ref={ref}
            className={`${variantClass} ${sizeClass} `}
            {...rest}
          />
          {label && (
            <label
              htmlFor={inputId}
              className={` ${
                disabled ? "text-muted-foreground" : "text-primary-foreground"
              }`}
            >
              {label}
            </label>
          )}
        </div>
        {error && errorMessage && (
          <p className="mt-1 text-red-500 text-sm">{errorMessage}</p>
        )}
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export default Checkbox;
