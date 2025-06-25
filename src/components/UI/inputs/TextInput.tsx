import React, { forwardRef } from "react";
export const variants = {
  default: {
    default:
      "border border-foreground rounded-[16px] bg-secondary hover:bg-primary focus:outline-primary focus:outline-2 placeholder:text-primary-foreground",
    error:
      "border-2 border-red-500 rounded-[16px] bg-secondary hover:bg-primary opacity-75 focus:outline-red-500 focus:outline-2 placeholder:text-red-400",
    disabled:
      "border border-foreground rounded-[16px] bg-muted text-muted-foreground cursor-not-allowed placeholder:text-muted-foreground",
  },
  ghost: {
    default:
      "rounded-[16px] hover:bg-secondary focus:outline-primary focus:outline-2 placeholder:text-primary-foreground",
    error:
      "rounded-[16px] hover:bg-red-100 opacity-75 focus:outline-red-500 focus:outline-2 placeholder:text-red-400",
    disabled:
      "rounded-[16px] bg-muted text-muted-foreground cursor-not-allowed placeholder:text-muted-foreground",
  },
  underlined: {
    default:
      "border-b-3 border-primary rounded-[2px] hover:bg-secondary focus:outline-0 placeholder:text-primary-foreground",
    error:
      "border-b-3 border-red-500 rounded-[2px] hover:bg-red-100 opacity-75 focus:outline-0 placeholder:text-red-400",
    disabled:
      "border-b-3 border-gray-300 rounded-[2px] bg-muted text-muted-foreground cursor-not-allowed placeholder:text-muted-foreground",
  },
};

export const sizes = {
  sm: "text-sm px-3 py-1.5",
  md: "text-base px-4 py-2",
  lg: "text-[18px] px-5 py-3",
};

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  error?: boolean;
  errorMessage?: string;
  variant?: keyof typeof variants;
  inputSize?: keyof typeof sizes;
  fullWidth?: boolean;
  value?: string | number | readonly string[];
  defaultValue?: string | number | readonly string[];
  placeholder?: string;
  type?:
    | "text"
    | "password"
    | "email"
    | "number"
    | "search"
    | "url"
    | "date"
    | "time"
    | "datetime-local"
    | "month"
    | "week";
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  id?: string;
  name?: string;
  required?: boolean;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      onChange,
      className = "",
      label,
      icon,
      iconPosition = "left",
      error = false,
      errorMessage,
      disabled = false,
      variant = "default",
      inputSize = "md",
      fullWidth = false,
      type = "text",
      id,
      ...rest
    },
    ref
  ) => {
    const state = disabled ? "disabled" : error ? "error" : "default";
    const variantClass = variants[variant][state];
    const sizeClass = sizes[inputSize];

    const inputPadding =
      icon && iconPosition === "left"
        ? "pl-10"
        : icon && iconPosition === "right"
        ? "pr-10"
        : "";

    const inputClass = `
      ${variantClass}
      ${sizeClass}
      ${inputPadding}
      ${fullWidth ? "w-full" : ""}
      ${className}
    `;

    const labelClass = `
      mb-1.5 font-medium text-[18px]
      ${
        error
          ? "text-red-600"
          : disabled
          ? "text-muted-foreground"
          : "text-foreground"
      }
    `;

    return (
      <div className={`flex flex-col ${fullWidth ? "w-full" : "w-fit"}`}>
        {label && (
          <label htmlFor={id} className={labelClass}>
            {label}
          </label>
        )}
        <div className={`relative ${fullWidth ? "w-full" : "w-fit"}`}>
          {icon && iconPosition === "left" && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              {icon}
            </div>
          )}
          <input
            onChange={onChange}
            type={type}
            ref={ref}
            disabled={disabled}
            className={`transition-all  ${inputClass}`}
            {...rest}
          />
          {icon && iconPosition === "right" && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {icon}
            </div>
          )}
        </div>
        {error && errorMessage && (
          <p className=" text-red-500">{errorMessage}</p>
        )}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
