"use client";
import React, { useState, useRef, useEffect, ReactElement } from "react";

interface Option {
  label: string;
  value: string;
  image?: ReactElement;
}

interface SelectProps {
  searchable?: boolean;
  label?: string;
  placeholder?: string;
  options: Option[];
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (value: string | string[]) => void;
  multiple?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  variant?: "default" | "ghost";
  className?: string;
  id?: string;
  description?: string;
  error?: boolean;
  errorMessage?: string;
}

const Select = ({
  label,
  searchable = false,
  placeholder = "Select an option",
  options,
  value,
  defaultValue,
  onChange,
  multiple = false,
  disabled = false,
  fullWidth = false,
  variant = "default",
  className = "",
  id,
  description,
  error,
  errorMessage,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectOptions, setSelectOptions] = useState<Option[]>(options);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [internalValue, setInternalValue] = useState<string | string[]>(
    defaultValue ?? (multiple ? [] : "")
  );
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const selectRef = useRef<HTMLDivElement>(null);
  const selectInputRef = useRef<HTMLInputElement>(null);
  const handleSearch = (query: string) => {
    if (query === "") {
      setSelectOptions(options);
      return;
    }
    const filtered = options.filter((op) => {
      if (
        op.label
          .toLocaleLowerCase()
          .trim()
          .includes(query.toLocaleLowerCase().trim()) ||
        op.value
          .toLocaleLowerCase()
          .trim()
          .includes(query.toLocaleLowerCase().trim())
      ) {
        return op;
      }
    });
    setSelectOptions(filtered);
  };
  const handleSelect = (option: Option) => {
    if (multiple) {
      const newValues = Array.isArray(currentValue)
        ? currentValue.includes(option.value)
          ? currentValue.filter((v) => v !== option.value)
          : [...currentValue, option.value]
        : [option.value];

      if (onChange) onChange(newValues);
      setInternalValue(newValues);
    } else {
      if (onChange) onChange(option.value);
      setInternalValue(option.value);
      setSelectOptions(options);
      if (selectInputRef.current !== null) {
        selectInputRef.current.value = option.label;
      }

      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        setIsOpen(true);
        setFocusedIndex(0);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex((prev) =>
          prev === null || prev === selectOptions.length - 1 ? 0 : prev + 1
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex((prev) =>
          prev === null || prev === 0 ? selectOptions.length - 1 : prev - 1
        );
        break;
      case "Enter":
        if (focusedIndex !== null) {
          handleSelect(selectOptions[focusedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (!selectRef.current?.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const containerStyles = `
    relative cursor-pointer text-left transition-all active:scale-[0.98] duration-200 ${
      fullWidth ? "w-full" : "w-fit"
    } ${className}
  `;

  const triggerStyles = `
    border rounded-[16px] md:px-6 px-3 py-3 transition flex flex-row justify-between gap-6 items-center 
    ${disabled ? "bg-muted text-muted-foreground cursor-not-allowed" : ""}
    ${
      variant === "ghost"
        ? "bg-transparent border-transparent"
        : "bg-secondary border-input"
    }
    ${error ? "border-red-500" : ""}
  `;

  const optionStyles = (isFocused: boolean) => `
    cursor-pointer px-3 py-3  transition flex justify-between items-center
    ${isFocused ? "bg-secondary " : "bg-primary"}
   
  `;

  const renderSelected = () => {
    if (multiple && Array.isArray(currentValue)) {
      if (currentValue.length === 0 && !searchable) {
        return <span className="text-muted-foreground">{placeholder}</span>;
      }
      return (
        <>
          {currentValue.map((val) => {
            const option = options.find((o) => o.value === val);
            return (
              <span key={val} className="flex items-center gap-1">
                {option?.image ?? null}
                {option?.label ?? val}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (option) {
                      handleSelect(option);
                    }
                  }}
                  className="ml-1  text-white text-xl hover:text-red-300 focus:outline-none"
                >
                  x
                </button>
              </span>
            );
          })}
          {searchable && (
            <input
              placeholder={placeholder}
              onChange={(e) => {
                setIsOpen(true);
                handleSearch(e.target.value);
              }}
              className=" outline-0   placeholder:text-muted-foreground"
            />
          )}
        </>
      );
    } else {
      const selectedOption = options.find((o) => o.value === currentValue);
      return (
        <>
          {searchable ? (
            <input
              placeholder={placeholder}
              ref={selectInputRef}
              onChange={(e) => {
                setIsOpen(true);
                setInternalValue(e.target.value);
                handleSearch(e.target.value);
              }}
              className=" outline-0 w-full "
            />
          ) : selectedOption?.label ? (
            <>
              {selectedOption?.image ?? null}
              <span className="leading-normal">{selectedOption?.label}</span>
            </>
          ) : (
            <span className="">{placeholder}</span>
          )}
        </>
      );
    }
  };

  const isSelected = (val: string) => {
    return multiple && Array.isArray(currentValue)
      ? currentValue.includes(val.toLowerCase().trim())
      : currentValue === val.toLowerCase().trim();
  };

  return (
    <div className={containerStyles} ref={selectRef}>
      {label && (
        <label htmlFor={id} className="block font-medium mb-1.5">
          {label}
        </label>
      )}

      <div
        tabIndex={0}
        className={triggerStyles}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
      >
        {renderSelected()}
      </div>

      {isOpen && (
        <ul className="absolute z-50 mt-1 w-full bg-secondary border border-input rounded-[16px] shadow-md max-h-60 overflow-auto">
          {selectOptions.length > 0 ? (
            selectOptions.map((option, i) => {
              const selected = isSelected(option.value);
              return (
                <li
                  key={option.value}
                  className={optionStyles(i === focusedIndex)}
                  onClick={() => handleSelect(option)}
                  onMouseEnter={() => setFocusedIndex(i)}
                >
                  {option?.image ?? null}
                  <span>
                    {option.label}
                    {selected && <span className="text-xs">✔</span>}
                  </span>
                </li>
              );
            })
          ) : (
            <li className="px-3 py-4  ">No options</li>
          )}
        </ul>
      )}

      {description && !error && <p className="text-xs  mt-1">{description}</p>}

      {error && errorMessage && (
        <p className="text-xs text-red-500 mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default Select;
