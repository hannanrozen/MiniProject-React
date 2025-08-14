import React from "react";

const SkipNavigation = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#4F46E5] text-white px-4 py-2 rounded-lg font-medium z-50 transition-all duration-200 hover:bg-[#4F46E5]/90"
      tabIndex={0}
    >
      Skip to main content
    </a>
  );
};

export default SkipNavigation;
