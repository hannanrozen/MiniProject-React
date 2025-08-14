import React from "react";

const LoadingSpinner = ({ size = "default", text = "Loading..." }) => {
  const sizeClasses = {
    small: "h-8 w-8",
    default: "h-16 w-16",
    large: "h-24 w-24",
  };

  return (
    <div
      className="flex flex-col items-center justify-center gap-4"
      role="status"
      aria-live="polite"
    >
      <div className="relative">
        <div
          className={`animate-spin rounded-full border-4 border-[#4F46E5]/20 ${sizeClasses[size]}`}
        ></div>
        <div
          className={`animate-spin rounded-full border-4 border-[#4F46E5] border-t-transparent absolute top-0 left-0 ${sizeClasses[size]}`}
        ></div>
      </div>
      <div className="text-gray-600 font-medium" aria-label={text}>
        {text}
      </div>
    </div>
  );
};

export default LoadingSpinner;
