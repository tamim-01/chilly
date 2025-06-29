import { forwardRef } from "react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  rows?: number;
  cols?: number;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string | number | readonly string[];
  defaultValue?: string | number | readonly string[];
  error?: boolean;
  errorMessage?: string;
  resize?: "none" | "both" | "vertical" | "horizontal";
  variant?: keyof typeof variants;
  placeholder?: string;
  size?: keyof typeof sizes;
  label?: string;
  description?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
  fullWidth?: boolean;
}

const variants = {
  default:
    "rounded-lg bg-secondary text-foreground placeholder:text-gray-400 hover:bg-primary focus-visible:bg-primary  focus-visible:outline-none focus-visible:ring-foreground focus-visible:ring-offset-2",
  underlined:
    "rounded-none bg-secondary text-gray-900 placeholder:text-gray-400 hover:bg-primary focus-visible:bg-primary  focus-visible:outline-none focus-visible:ring-0",
};
const sizes = {
  sm: "text-sm px-3 py-1.5",
  md: "text-base px-4 py-2",
  lg: "text-lg px-5 py-3",
};
const resizeVariants = {
  none: "resize-none",
  both: "resize",
  vertical: "resize-y",
  horizontal: "resize-x",
};
const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      error,
      errorMessage,
      fullWidth = false,
      rows = 5,
      cols = 40,
      resize = "both",
      defaultValue,
      value,
      onChange,
      variant = "default",
      placeholder,
      size = "md",
      label,
      description,
      id,
      disabled = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const textareaProps =
      value !== undefined && value !== null
        ? { value, onChange }
        : { defaultValue, onChange };
    return (
      <div className={`flex flex-col gap-2 ${fullWidth ? "w-full" : ""}`}>
        {label && (
          <label
            htmlFor={id}
            className={`text-lg font-semibold   ${
              error ? "text-red-500" : "text-foreground"
            }`}
          >
            {label}
          </label>
        )}

        {description && <p className="text-sm mb-2">{description}</p>}
        <textarea
          ref={ref}
          id={id}
          {...props}
          {...textareaProps}
          {...{ rows, cols, placeholder, disabled }}
          className={`  transition-all  ${sizes[size]}  ${
            disabled
              ? "bg-muted text-muted-foreground placeholder:text-muted-foreground cursor-not-allowed"
              : variants[variant]
          }  ${resizeVariants[resize]} ${className} border-1 ${
            error ? "border-red-500 " : "border-foreground"
          }`}
        />
        {error && errorMessage && (
          <p className="text-[18px] text-red-500 mt-1">{errorMessage}</p>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export default Textarea;
