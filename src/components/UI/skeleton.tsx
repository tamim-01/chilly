"use client";

import { FC } from "react";

interface SkeletonProps {
  width?: string;
  height?: string;
  count?: number;
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
}

const Skeleton: FC<SkeletonProps> = ({
  width = "100%",
  height = "1rem",
  count = 1,
  rounded = "md",
  className = "",
}) => {
  const roundedClass = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  }[rounded];

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`bg-secondary opacity-80 animate-pulse ${roundedClass} ${className}`}
          style={{ width, height, marginBottom: count > 1 ? "0.5rem" : "0" }}
        />
      ))}
    </>
  );
};

export default Skeleton;
