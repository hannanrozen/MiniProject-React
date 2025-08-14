import { useEffect } from "react";

const CriticalCSS = () => {
  useEffect(() => {
    // Inject critical CSS for above-the-fold content
    if (!document.getElementById("critical-css")) {
      const criticalStyles = `
        <style id="critical-css">
          /* Critical CSS for immediate rendering */
          .navbar-critical {
            background: #fff;
            box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 50;
            height: 64px;
          }
          
          .hero-critical {
            padding-top: 80px;
            min-height: 500px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }
          
          .card-skeleton {
            background: #f3f4f6;
            border-radius: 16px;
            padding: 24px;
            margin: 12px;
            min-height: 280px;
            animation: pulse 2s infinite;
          }
          
          .card-skeleton .avatar {
            width: 96px;
            height: 96px;
            border-radius: 50%;
            background: #e5e7eb;
            margin: 0 auto 24px;
          }
          
          .card-skeleton .text-line {
            height: 16px;
            background: #e5e7eb;
            border-radius: 4px;
            margin-bottom: 8px;
          }
          
          .card-skeleton .text-line.short {
            width: 60%;
            margin: 0 auto 16px;
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
          
          /* Prevent layout shift */
          .content-container {
            min-height: 100vh;
            contain: layout style paint;
          }
          
          /* Optimize font loading */
          .font-optimized {
            font-display: swap;
            font-synthesis: none;
          }
        </style>
      `;

      document.head.insertAdjacentHTML("beforeend", criticalStyles);
    }

    // Remove non-critical CSS after load
    const handleLoad = () => {
      // Add non-critical styles after initial paint
      setTimeout(() => {
        const nonCriticalCSS = document.createElement("link");
        nonCriticalCSS.rel = "stylesheet";
        nonCriticalCSS.href = "/src/non-critical.css";
        nonCriticalCSS.media = "print";
        nonCriticalCSS.onload = function () {
          this.media = "all";
        };
        document.head.appendChild(nonCriticalCSS);
      }, 100);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  return null;
};

export default CriticalCSS;
