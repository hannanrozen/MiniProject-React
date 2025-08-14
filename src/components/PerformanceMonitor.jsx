import { useEffect } from "react";

const PerformanceMonitor = () => {
  useEffect(() => {
    // Enhanced Core Web Vitals monitoring
    const observePerformance = () => {
      // Largest Contentful Paint (LCP)
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          console.log("LCP:", entry.startTime);
          // Target: < 2.5s (Good), < 4.0s (Needs Improvement)
          if (entry.startTime > 2500) {
            console.warn("LCP needs improvement:", entry.startTime + "ms");
          }
        }
      }).observe({ entryTypes: ["largest-contentful-paint"] });

      // First Input Delay (FID)
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          console.log("FID:", entry.processingStart - entry.startTime);
          // Target: < 100ms (Good), < 300ms (Needs Improvement)
          const fid = entry.processingStart - entry.startTime;
          if (fid > 100) {
            console.warn("FID needs improvement:", fid + "ms");
          }
        }
      }).observe({ entryTypes: ["first-input"] });

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            console.log("CLS:", clsValue);
            // Target: < 0.1 (Good), < 0.25 (Needs Improvement)
            if (clsValue > 0.1) {
              console.warn("CLS needs improvement:", clsValue);
            }
          }
        }
      }).observe({ entryTypes: ["layout-shift"] });

      // Time to First Byte (TTFB)
      const navigationEntry = performance.getEntriesByType("navigation")[0];
      if (navigationEntry) {
        const ttfb =
          navigationEntry.responseStart - navigationEntry.requestStart;
        console.log("TTFB:", ttfb);
        // Target: < 600ms (Good), < 1000ms (Needs Improvement)
        if (ttfb > 600) {
          console.warn("TTFB needs improvement:", ttfb + "ms");
        }
      }

      // Resource loading performance
      const resourceEntries = performance.getEntriesByType("resource");
      const slowResources = resourceEntries.filter(
        (entry) => entry.duration > 1000
      );
      if (slowResources.length > 0) {
        console.warn(
          "Slow resources detected:",
          slowResources.map((r) => ({
            name: r.name,
            duration: r.duration,
          }))
        );
      }

      // Memory usage (if supported)
      if (performance.memory) {
        const memInfo = {
          used: Math.round(performance.memory.usedJSHeapSize / 1048576),
          total: Math.round(performance.memory.totalJSHeapSize / 1048576),
          limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576),
        };
        console.log("Memory usage (MB):", memInfo);

        // Warning if memory usage is high
        if (memInfo.used > 50) {
          console.warn("High memory usage detected:", memInfo.used + "MB");
        }
      }
    };

    // Run performance monitoring after page load
    if (document.readyState === "complete") {
      observePerformance();
    } else {
      window.addEventListener("load", observePerformance);
    }

    // Performance summary after 5 seconds
    setTimeout(() => {
      const perfData = performance.getEntriesByType("navigation")[0];
      const summary = {
        "DOM Content Loaded": Math.round(
          perfData.domContentLoadedEventEnd -
            perfData.domContentLoadedEventStart
        ),
        "Load Event": Math.round(
          perfData.loadEventEnd - perfData.loadEventStart
        ),
        "Total Page Load": Math.round(
          perfData.loadEventEnd - perfData.navigationStart
        ),
        "DNS Lookup": Math.round(
          perfData.domainLookupEnd - perfData.domainLookupStart
        ),
        "TCP Connect": Math.round(perfData.connectEnd - perfData.connectStart),
        "Request/Response": Math.round(
          perfData.responseEnd - perfData.requestStart
        ),
        "DOM Processing": Math.round(
          perfData.domComplete - perfData.domLoading
        ),
      };

      console.group("🚀 Performance Summary");
      Object.entries(summary).forEach(([key, value]) => {
        const status = value < 1000 ? "✅" : value < 2000 ? "⚠️" : "❌";
        console.log(`${status} ${key}: ${value}ms`);
      });
      console.groupEnd();
    }, 5000);

    return () => {
      window.removeEventListener("load", observePerformance);
    };
  }, []);

  return null;
};

export default PerformanceMonitor;
