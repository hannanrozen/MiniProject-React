import { useEffect } from "react";

const usePerformanceMonitoring = () => {
  useEffect(() => {
    // Add resource hints for better performance
    const addResourceHints = () => {
      // DNS prefetch for API
      if (
        !document.querySelector(
          'link[rel="dns-prefetch"][href="https://reqres.in"]'
        )
      ) {
        const dnsPrefetch = document.createElement("link");
        dnsPrefetch.rel = "dns-prefetch";
        dnsPrefetch.href = "https://reqres.in";
        document.head.appendChild(dnsPrefetch);
      }

      // Preconnect to API
      if (
        !document.querySelector(
          'link[rel="preconnect"][href="https://reqres.in"]'
        )
      ) {
        const preconnect = document.createElement("link");
        preconnect.rel = "preconnect";
        preconnect.href = "https://reqres.in";
        preconnect.crossOrigin = "anonymous";
        document.head.appendChild(preconnect);
      }

      // Critical CSS preload
      if (!document.querySelector('link[rel="preload"][as="style"]')) {
        const criticalCSS = document.createElement("link");
        criticalCSS.rel = "preload";
        criticalCSS.as = "style";
        criticalCSS.href = "/src/index.css";
        document.head.appendChild(criticalCSS);
      }
    };

    // Monitor Core Web Vitals with optimizations
    const observeWebVitals = () => {
      if ("PerformanceObserver" in window) {
        try {
          // LCP optimization
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            if (lastEntry.startTime > 2500) {
              console.warn("LCP is slow:", lastEntry.startTime, "ms");
            }
          });
          lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });

          // Observe First Input Delay (FID) - replaced with INP
          const fidObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              console.log("FID:", entry.processingStart - entry.startTime);
            }
          });
          fidObserver.observe({ entryTypes: ["first-input"] });

          // Observe Cumulative Layout Shift (CLS)
          const clsObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (!entry.hadRecentInput) {
                console.log("CLS:", entry.value);
              }
            }
          });
          clsObserver.observe({ entryTypes: ["layout-shift"] });
        } catch {
          console.log("Performance Observer not supported");
        }
      }
    };

    // Initialize optimizations
    addResourceHints();

    // Start monitoring after component mount
    setTimeout(observeWebVitals, 1000);

    // Memory management
    return () => {
      // Cleanup if needed
    };
  }, []);

  // Function to manually mark performance milestones
  const markPerformance = (name) => {
    if ("performance" in window && "mark" in performance) {
      performance.mark(name);
    }
  };

  return { markPerformance };
};

export default usePerformanceMonitoring;
