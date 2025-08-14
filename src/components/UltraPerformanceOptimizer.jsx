import { useEffect, useCallback } from "react";

// Ultra Performance Optimizer untuk Lighthouse Score 90+
const UltraPerformanceOptimizer = () => {
  // 1. Critical Resource Preloading untuk LCP optimization
  const preloadCriticalResources = useCallback(() => {
    const head = document.head;

    // Preload critical fonts untuk mengurangi render blocking
    const fontPreload = document.createElement("link");
    fontPreload.rel = "preload";
    fontPreload.as = "font";
    fontPreload.type = "font/woff2";
    fontPreload.crossOrigin = "anonymous";
    fontPreload.href = "/fonts/inter-var.woff2"; // Adjust sesuai font yang digunakan
    head.appendChild(fontPreload);

    // DNS prefetch untuk external resources
    const apiPrefetch = document.createElement("link");
    apiPrefetch.rel = "dns-prefetch";
    apiPrefetch.href = "//reqres.in";
    head.appendChild(apiPrefetch);

    // Preconnect untuk faster API calls
    const apiPreconnect = document.createElement("link");
    apiPreconnect.rel = "preconnect";
    apiPreconnect.href = "https://reqres.in";
    head.appendChild(apiPreconnect);
  }, []);

  // 2. Critical CSS inline untuk First Paint optimization
  const injectCriticalCSS = useCallback(() => {
    const criticalCSS = `
      /* Critical above-fold styles untuk Lighthouse 90+ */
      * { box-sizing: border-box; }
      body { margin: 0; font-family: system-ui, -apple-system, sans-serif; }
      
      /* Layout stability untuk CLS 0.1 */
      .hero-section { min-height: 400px; contain: layout style paint; }
      .stats-card { min-height: 180px; contain: layout style paint; }
      .user-grid { contain: layout style; }
      
      /* Performance optimizations */
      img { content-visibility: auto; contain-intrinsic-size: 300px 200px; }
      .user-card { content-visibility: auto; contain-intrinsic-size: 350px 400px; }
      
      /* GPU acceleration untuk smooth animations */
      .transform-gpu { transform: translateZ(0); will-change: transform; }
      
      /* Remove expensive effects */
      .no-backdrop { backdrop-filter: none !important; }
      .simplified-shadow { box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1) !important; }
      
      /* Optimize fonts */
      .font-display { font-display: swap; }
    `;

    const style = document.createElement("style");
    style.textContent = criticalCSS;
    document.head.appendChild(style);
  }, []);

  // 3. Image lazy loading dengan Intersection Observer
  const setupAdvancedImageLoading = useCallback(() => {
    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              // Progressive loading dengan blur effect
              img.style.filter = "blur(5px)";
              img.src = img.dataset.src;
              img.onload = () => {
                img.style.filter = "none";
                img.style.transition = "filter 0.3s ease";
              };
              imageObserver.unobserve(img);
            }
          }
        });
      },
      {
        rootMargin: "100px",
        threshold: 0.1,
      }
    );

    // Observer untuk images yang belum loaded
    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img);
    });

    return () => imageObserver.disconnect();
  }, []);

  // 4. Service Worker registration untuk caching
  const registerServiceWorker = useCallback(async () => {
    if ("serviceWorker" in navigator) {
      try {
        await navigator.serviceWorker.register("/sw-optimized.js");
        console.log("🚀 Service Worker registered for better caching");
      } catch (error) {
        console.log("Service Worker registration failed:", error);
      }
    }
  }, []);

  // 5. Resource hints untuk faster navigation
  const addResourceHints = useCallback(() => {
    const head = document.head;

    // Prefetch next likely pages
    const userDetailPrefetch = document.createElement("link");
    userDetailPrefetch.rel = "prefetch";
    userDetailPrefetch.href = "/user/1";
    head.appendChild(userDetailPrefetch);

    // Preload critical API endpoint
    const apiPrefetch = document.createElement("link");
    apiPrefetch.rel = "prefetch";
    apiPrefetch.href = "https://reqres.in/api/users?page=1";
    head.appendChild(apiPrefetch);
  }, []);

  // 6. Performance monitoring untuk tracking
  const setupPerformanceMonitoring = useCallback(() => {
    // Core Web Vitals monitoring
    const reportMetric = (metric) => {
      console.log(`📊 ${metric.name}:`, metric.value);

      // Alert jika metrics tidak memenuhi target 90+
      if (metric.name === "LCP" && metric.value > 2500) {
        console.warn("⚠️ LCP needs improvement for 90+ score:", metric.value);
      }
      if (metric.name === "FID" && metric.value > 100) {
        console.warn("⚠️ FID needs improvement for 90+ score:", metric.value);
      }
      if (metric.name === "CLS" && metric.value > 0.1) {
        console.warn("⚠️ CLS needs improvement for 90+ score:", metric.value);
      }
    };

    // LCP Observer
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        reportMetric({ name: "LCP", value: entry.startTime });
      }
    }).observe({ entryTypes: ["largest-contentful-paint"] });

    // FID Observer
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const fid = entry.processingStart - entry.startTime;
        reportMetric({ name: "FID", value: fid });
      }
    }).observe({ entryTypes: ["first-input"] });

    // CLS Observer
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          reportMetric({ name: "CLS", value: clsValue });
        }
      }
    }).observe({ entryTypes: ["layout-shift"] });
  }, []);

  // 7. Memory optimization
  const optimizeMemoryUsage = useCallback(() => {
    // Cleanup unused objects
    if (window.gc && typeof window.gc === "function") {
      setTimeout(() => window.gc(), 3000);
    }

    // Monitor memory usage
    if (performance.memory) {
      const memInfo = performance.memory;
      const usedMB = Math.round(memInfo.usedJSHeapSize / 1024 / 1024);

      if (usedMB > 30) {
        // Target untuk 90+ score
        console.warn("⚠️ Memory usage high for 90+ score:", usedMB + "MB");
      }
    }
  }, []);

  useEffect(() => {
    const cleanup = [];

    // Execute all optimizations
    preloadCriticalResources();
    injectCriticalCSS();
    cleanup.push(setupAdvancedImageLoading());
    registerServiceWorker();
    addResourceHints();
    setupPerformanceMonitoring();
    optimizeMemoryUsage();

    // Performance summary untuk debugging
    setTimeout(() => {
      const perfData = performance.getEntriesByType("navigation")[0];
      if (perfData) {
        console.group("🎯 Performance Summary for 90+ Score");
        console.log(
          "✅ DOM Content Loaded:",
          Math.round(
            perfData.domContentLoadedEventEnd -
              perfData.domContentLoadedEventStart
          ) + "ms"
        );
        console.log(
          "✅ Load Event:",
          Math.round(perfData.loadEventEnd - perfData.loadEventStart) + "ms"
        );
        console.log(
          "✅ Total Page Load:",
          Math.round(perfData.loadEventEnd - perfData.navigationStart) + "ms"
        );
        console.groupEnd();
      }
    }, 2000);

    // Cleanup function
    return () => {
      cleanup.forEach((fn) => fn && fn());
    };
  }, [
    preloadCriticalResources,
    injectCriticalCSS,
    setupAdvancedImageLoading,
    registerServiceWorker,
    addResourceHints,
    setupPerformanceMonitoring,
    optimizeMemoryUsage,
  ]);

  return null;
};

export default UltraPerformanceOptimizer;
